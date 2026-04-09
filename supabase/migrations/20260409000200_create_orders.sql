-- Migration: Create orders table with updated_at trigger

create table public.orders (
  id             uuid primary key default gen_random_uuid(),
  customer_id    uuid not null references public.profiles(id) on delete cascade,
  service_type   text not null check (service_type in (
                   'graphic_design',
                   'video_editing',
                   '3d_motion',
                   'branding_kit',
                   'thumbnail',
                   'ppt_design'
                 )),
  title          text not null,
  brief          text not null,
  deadline_pref  text,
  status         text not null default 'pending' check (status in (
                   'pending',
                   'in_progress',
                   'revision',
                   'delivered',
                   'completed',
                   'cancelled'
                 )),
  assigned_admin uuid references public.profiles(id),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Keep updated_at current on every row change
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger orders_updated_at
  before update on public.orders
  for each row execute procedure public.handle_updated_at();
