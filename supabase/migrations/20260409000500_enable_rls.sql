-- Migration: Enable Row Level Security on all application tables

alter table public.profiles      enable row level security;
alter table public.orders        enable row level security;
alter table public.order_files   enable row level security;
alter table public.order_messages enable row level security;
