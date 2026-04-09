-- Migration: Create order_files table
-- Stores both reference files (uploaded by customer) and deliverables (uploaded by admin).
-- Actual files live in the 'order-files' Supabase Storage bucket.
-- Path convention:
--   references:   orders/{order_id}/references/{timestamp}-{filename}
--   deliverables: orders/{order_id}/deliverables/{timestamp}-{filename}

create table public.order_files (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references public.orders(id) on delete cascade,
  uploader_id  uuid not null references public.profiles(id),
  file_name    text not null,
  storage_path text not null,
  file_size    bigint,
  mime_type    text,
  file_role    text not null check (file_role in ('reference', 'deliverable')),
  created_at   timestamptz not null default now()
);
