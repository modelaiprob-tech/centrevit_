-- 003_settings.sql
-- Añade columnas de configuración al tenant y ajusta la tabla schedules

-- 1. Columnas nuevas en tenants
ALTER TABLE public.tenants
  ADD COLUMN IF NOT EXISTS phone   TEXT,
  ADD COLUMN IF NOT EXISTS email   TEXT,
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS settings JSONB NOT NULL DEFAULT '{}';

-- 2. Deduplica schedules: la migración inicial insertó 2 filas por día (mañana + tarde).
--    Necesitamos una sola fila por (tenant_id, day_of_week) para poder añadir UNIQUE.
--    Conservamos la fila con el UUID menor (la primera insertada) y actualizamos
--    sus horarios para que reflejen el horario principal del día.
DELETE FROM public.schedules s1
USING public.schedules s2
WHERE s1.tenant_id = s2.tenant_id
  AND s1.day_of_week = s2.day_of_week
  AND s1.id > s2.id;

-- Ahora que no hay duplicados podemos añadir la restricción UNIQUE
ALTER TABLE public.schedules
  DROP CONSTRAINT IF EXISTS schedules_tenant_day_unique;

ALTER TABLE public.schedules
  ADD CONSTRAINT schedules_tenant_day_unique
  UNIQUE (tenant_id, day_of_week);

-- 3. Asegura que el sábado y domingo existen en schedules (las inserciones iniciales
--    solo cubrían días 0-4 = Lunes a Viernes)
INSERT INTO public.schedules (tenant_id, day_of_week, start_time, end_time, active)
SELECT t.id, 5, '10:00'::time, '14:00'::time, false
FROM public.tenants t
WHERE t.slug = 'centrevit'
ON CONFLICT (tenant_id, day_of_week) DO NOTHING;

INSERT INTO public.schedules (tenant_id, day_of_week, start_time, end_time, active)
SELECT t.id, 6, '10:00'::time, '14:00'::time, false
FROM public.tenants t
WHERE t.slug = 'centrevit'
ON CONFLICT (tenant_id, day_of_week) DO NOTHING;
