import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Upstash Redis — funciona en multi-instancia (Vercel serverless)
// Fallback a Map en memoria si no hay credenciales (desarrollo local sin Redis)
function createRatelimiter() {
  const url   = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (url && token) {
    const redis = new Redis({ url, token })
    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '10 m'),
      analytics: false,
      prefix: 'centrevit:rl',
    })
  }

  // Fallback en memoria para dev local sin Redis
  return null
}

const ratelimiter = createRatelimiter()

// Fallback en memoria (sólo dev, instancia única)
const inMemory = new Map<string, { count: number; resetAt: number }>()
function pruneExpired(now: number) {
  for (const [k, v] of inMemory) if (now > v.resetAt) inMemory.delete(k)
}

export async function rateLimit(
  identifier: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): Promise<{ success: boolean; remaining: number }> {
  if (ratelimiter) {
    const { success, remaining } = await ratelimiter.limit(identifier)
    return { success, remaining: remaining ?? 0 }
  }

  // Fallback en memoria
  const now = Date.now()
  pruneExpired(now)
  const entry = inMemory.get(identifier)
  if (!entry || now > entry.resetAt) {
    inMemory.set(identifier, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: limit - 1 }
  }
  if (entry.count >= limit) return { success: false, remaining: 0 }
  entry.count++
  return { success: true, remaining: limit - entry.count }
}
