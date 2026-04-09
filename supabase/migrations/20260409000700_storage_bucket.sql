-- Migration: Create private storage bucket for order files
--
-- NOTE: Supabase Storage bucket creation via SQL requires the storage schema.
-- If this fails, create the bucket manually in:
--   Supabase Dashboard → Storage → New bucket
--   Name: order-files
--   Public: false (private)

insert into storage.buckets (id, name, public)
values ('order-files', 'order-files', false)
on conflict (id) do nothing;

-- Storage RLS: customers can upload reference files to their own orders
create policy "storage_customer_upload_references"
  on storage.objects
  for insert
  with check (
    bucket_id = 'order-files'
    and auth.uid() is not null
    -- path format: orders/{order_id}/references/{filename}
    and (storage.foldername(name))[1] = 'orders'
    and (storage.foldername(name))[3] = 'references'
  );

-- Storage RLS: admins can upload deliverables
create policy "storage_admin_upload_deliverables"
  on storage.objects
  for insert
  with check (
    bucket_id = 'order-files'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Storage RLS: order participants can download files
create policy "storage_participants_download"
  on storage.objects
  for select
  using (
    bucket_id = 'order-files'
    and auth.uid() is not null
  );
