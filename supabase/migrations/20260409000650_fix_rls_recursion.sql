-- Fix: infinite recursion in profiles RLS policies
-- The admin-check policies query public.profiles from within a policy on
-- public.profiles, causing infinite recursion.  Replace inline subqueries
-- with a SECURITY DEFINER function that bypasses RLS.

-- 1. Helper function — runs with table-owner privileges, skipping RLS
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- 2. Drop the recursive profiles policy and recreate it
drop policy if exists "profiles_admin_read" on public.profiles;

create policy "profiles_admin_read"
  on public.profiles
  for select
  using ( public.is_admin() );

-- 3. Update orders policies that also had the inline subquery
drop policy if exists "orders_admin_select" on public.orders;
create policy "orders_admin_select"
  on public.orders
  for select
  using ( public.is_admin() );

drop policy if exists "orders_admin_update" on public.orders;
create policy "orders_admin_update"
  on public.orders
  for update
  using ( public.is_admin() );

-- 4. Update order_files select policy
drop policy if exists "order_files_select" on public.order_files;
create policy "order_files_select"
  on public.order_files
  for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and (
          o.customer_id = auth.uid()
          or public.is_admin()
        )
    )
  );

-- 5. Update order_messages policies (read the rest of the original migration)
drop policy if exists "messages_select" on public.order_messages;
create policy "messages_select"
  on public.order_messages
  for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and (
          o.customer_id = auth.uid()
          or public.is_admin()
        )
    )
  );

drop policy if exists "messages_insert" on public.order_messages;
create policy "messages_insert"
  on public.order_messages
  for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.orders o
      where o.id = order_id
        and (
          o.customer_id = auth.uid()
          or public.is_admin()
        )
    )
  );
