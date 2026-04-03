import { Pool } from 'pg'

declare global {
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined
}

const pool = global.pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  allowExitOnIdle: true,
})

if (process.env.NODE_ENV !== 'production') {
  global.pgPool = pool
}

export default pool
