create extension if not exists "uuid-ossp";

-- TENANTS (arquitectura multi-tenant desde el día 1)
create table public.tenants (
  id         uuid primary key default uuid_generate_v4(),
  slug       text unique not null,
  name       text not null,
  created_at timestamptz default now()
);
insert into public.tenants (slug, name) values ('centrevit', 'Centrevit');

-- SERVICIOS (configurables por el admin)
create table public.services (
  id              uuid primary key default uuid_generate_v4(),
  tenant_id       uuid not null references public.tenants(id) on delete cascade,
  slug            text not null,
  name            text not null,
  duration        int not null default 60,
  price           numeric(10,2),
  description     text,
  -- Protocolo de seguimiento post-tratamiento (configurable)
  followup_days   int default null,         -- días tras la sesión para hacer seguimiento
  followup_notes  text default null,        -- instrucciones internas para el seguimiento
  active          boolean default true,
  created_at      timestamptz default now(),
  unique(tenant_id, slug)
);

insert into public.services (tenant_id, slug, name, duration, followup_days, followup_notes) values
  ((select id from tenants where slug='centrevit'), 'par-biomagnetico',       'Par Biomagnético',       60, 7,  'Preguntar al cliente cómo han evolucionado la inflamación y la energía'),
  ((select id from tenants where slug='centrevit'), 'reflexologia-podal',     'Reflexología Podal',     60, 5,  'Verificar calidad del sueño y nivel de estrés post-sesión'),
  ((select id from tenants where slug='centrevit'), 'quiromasaje-integrador', 'Quiromasaje Integrador', 60, 3,  'Comprobar si persiste la tensión o hay mejoría en movilidad'),
  ((select id from tenants where slug='centrevit'), 'presoterapia-ballancer', 'Presoterapia Ballancer', 45, 4,  'Consultar sensación de ligereza en piernas y retención de líquidos'),
  ((select id from tenants where slug='centrevit'), 'manta-fhos-led',         'Manta FHOS LED',         30, 3,  'Valorar recuperación y nivel de energía post-sesión');

-- HORARIOS SEMANALES
create table public.schedules (
  id           uuid primary key default uuid_generate_v4(),
  tenant_id    uuid not null references public.tenants(id) on delete cascade,
  day_of_week  int not null check (day_of_week between 0 and 6), -- 0=Lunes
  start_time   time not null,
  end_time     time not null,
  active       boolean default true
);

insert into public.schedules (tenant_id, day_of_week, start_time, end_time)
select t.id, d.day, s.start_t::time, s.end_t::time
from public.tenants t,
  (values (0),(1),(2),(3),(4)) as d(day),
  (values ('09:00','14:00'),('16:00','20:00')) as s(start_t, end_t)
where t.slug = 'centrevit';

-- SLOTS BLOQUEADOS (festivos, vacaciones, ausencias)
create table public.blocked_slots (
  id          uuid primary key default uuid_generate_v4(),
  tenant_id   uuid not null references public.tenants(id) on delete cascade,
  blocked_at  timestamptz not null,
  reason      text,
  created_at  timestamptz default now()
);

-- CLIENTES
create table public.clients (
  id              uuid primary key default uuid_generate_v4(),
  tenant_id       uuid not null references public.tenants(id) on delete cascade,
  name            text not null,
  email           text not null,
  phone           text,
  birth_date      date,
  -- Ficha técnica
  allergies       text,           -- alergias o contraindicaciones
  medical_notes   text,           -- notas médicas relevantes
  general_notes   text,           -- notas generales del terapeuta
  source          text,           -- cómo llegó al centro (Instagram, recomendación...)
  active          boolean default true,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  unique(tenant_id, email)
);

-- RESERVAS
create table public.bookings (
  id            uuid primary key default uuid_generate_v4(),
  tenant_id     uuid not null references public.tenants(id) on delete cascade,
  client_id     uuid not null references public.clients(id) on delete cascade,
  service_id    uuid not null references public.services(id) on delete restrict,
  starts_at     timestamptz not null,
  ends_at       timestamptz not null,
  status        text not null default 'pending'
                check (status in ('pending','confirmed','cancelled','done')),
  price_charged numeric(10,2),    -- precio cobrado (puede diferir del precio base)
  payment_status text default 'unpaid'
                check (payment_status in ('unpaid','paid','partial')),
  internal_notes text,
  -- Seguimiento
  followup_done  boolean default false,
  followup_date  timestamptz,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- INGRESOS (caja)
create table public.payments (
  id          uuid primary key default uuid_generate_v4(),
  tenant_id   uuid not null references public.tenants(id) on delete cascade,
  booking_id  uuid references public.bookings(id) on delete set null,
  client_id   uuid references public.clients(id) on delete set null,
  amount      numeric(10,2) not null,
  method      text not null default 'cash'
              check (method in ('cash','card','transfer')),
  notes       text,
  paid_at     timestamptz default now(),
  created_at  timestamptz default now()
);

-- TRIGGERS updated_at
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function update_updated_at();

create trigger clients_updated_at
  before update on public.clients
  for each row execute function update_updated_at();

-- ÍNDICES
create index on public.bookings(tenant_id, starts_at);
create index on public.bookings(tenant_id, status);
create index on public.bookings(tenant_id, followup_done, followup_date);
create index on public.clients(tenant_id, email);
create index on public.payments(tenant_id, paid_at);
