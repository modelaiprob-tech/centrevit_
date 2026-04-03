import type { NextConfig } from 'next'
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data: https://picsum.photos",
              "connect-src 'self' https://*.supabase.co https://*.ingest.sentry.io",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default withSentryConfig(nextConfig, {
  // Sentry CLI — solo activo si existe SENTRY_AUTH_TOKEN (CI/CD)
  silent: true,
  disableLogger: true,

  // No subir source maps en dev
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Source maps en producción
  sourcemaps: {
    disable: process.env.NODE_ENV !== 'production',
  },

  // Tunneling para evitar ad-blockers
  tunnelRoute: '/monitoring',
})
