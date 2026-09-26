-- Migration: Add Razorpay payment tracking columns to public.orders
alter table public.orders
  add column if not exists payment_id text,
  add column if not exists gateway_order_id text,
  add column if not exists paid_at timestamptz;
