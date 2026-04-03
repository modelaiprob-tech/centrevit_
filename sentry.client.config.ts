import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Porcentaje de transacciones capturadas (1.0 = 100% en dev, reducir en prod)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Replays solo en prod
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.0,

  integrations: [],

  // No capturar errores en desarrollo para no saturar el DSN
  enabled: process.env.NODE_ENV === 'production',
})
