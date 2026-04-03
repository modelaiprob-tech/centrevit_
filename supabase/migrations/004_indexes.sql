-- 004_indexes.sql
-- Índices adicionales no cubiertos en 001_init.sql

-- bookings.client_id (necesario para el historial de sesiones por cliente)
CREATE INDEX IF NOT EXISTS idx_bookings_client_id
  ON public.bookings(client_id);

-- bookings.starts_at sin tenant_id (para el cron de recordatorios que filtra globalmente)
CREATE INDEX IF NOT EXISTS idx_bookings_starts_at_status
  ON public.bookings(starts_at, status);

-- clients.active (para consultas de clientes activos)
CREATE INDEX IF NOT EXISTS idx_clients_active
  ON public.clients(tenant_id, active);

-- payments.client_id (para búsquedas de pagos por cliente)
CREATE INDEX IF NOT EXISTS idx_payments_client_id
  ON public.payments(client_id);
