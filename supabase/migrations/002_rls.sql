alter table public.tenants       enable row level security;
alter table public.services      enable row level security;
alter table public.schedules     enable row level security;
alter table public.blocked_slots enable row level security;
alter table public.clients       enable row level security;
alter table public.bookings      enable row level security;
alter table public.payments      enable row level security;

-- Público: puede leer servicios y horarios activos (para el widget de reserva de la web)
create policy "services_public_read" on public.services
  for select using (active = true);
create policy "schedules_public_read" on public.schedules
  for select using (active = true);

-- Público: puede crear reservas y clientes (formulario web)
create policy "bookings_public_insert" on public.bookings
  for insert with check (true);
create policy "clients_public_insert" on public.clients
  for insert with check (true);

-- Admin: acceso total a todo (solo usuarios autenticados via Supabase Auth)
create policy "admin_bookings"      on public.bookings      for all using (auth.role() = 'authenticated');
create policy "admin_clients"       on public.clients       for all using (auth.role() = 'authenticated');
create policy "admin_payments"      on public.payments      for all using (auth.role() = 'authenticated');
create policy "admin_blocked"       on public.blocked_slots for all using (auth.role() = 'authenticated');
create policy "admin_schedules"     on public.schedules     for all using (auth.role() = 'authenticated');
create policy "admin_services_all"  on public.services      for all using (auth.role() = 'authenticated');
create policy "admin_tenants"       on public.tenants       for select using (auth.role() = 'authenticated');
