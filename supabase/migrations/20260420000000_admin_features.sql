-- Migration: Add payment fields, creative showcase flag, and expand profile role check constraint

-- 1. Add amount, payment_status, and creative_showcase to public.orders if not present
alter table public.orders
  add column if not exists amount numeric default 0,
  add column if not exists payment_status text default 'paid' check (payment_status in ('unpaid', 'paid', 'refunded')),
  add column if not exists creative_showcase boolean default false;

-- 2. Update role check constraint on public.profiles to allow 'editor' for fulfillment team members
alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check check (role in ('customer', 'editor', 'admin'));
