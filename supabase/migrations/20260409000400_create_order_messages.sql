-- Migration: Create order_messages table
-- Enables a simple threaded conversation between the customer and admin per order.

create table public.order_messages (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.orders(id) on delete cascade,
  sender_id  uuid not null references public.profiles(id),
  body       text not null,
  created_at timestamptz not null default now()
);
