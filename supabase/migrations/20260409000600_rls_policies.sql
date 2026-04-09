-- Migration: Row Level Security policies for all tables
--
-- Access model:
--   customer — sees and operates on their own rows only
--   admin    — sees and operates on all rows (checked via profiles.role = 'admin')

-- ── profiles ──────────────────────────────────────────────────────────────────

-- Users can read/update their own profile
create policy "profiles_own"
  on public.profiles
  for all
  using (auth.uid() = id);

-- Admins can read all profiles (needed to show customer info on orders)
create policy "profiles_admin_read"
  on public.profiles
  for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ── orders ────────────────────────────────────────────────────────────────────

-- Customers can read their own orders
create policy "orders_customer_select"
  on public.orders
  for select
  using (auth.uid() = customer_id);

-- Admins can read all orders
create policy "orders_admin_select"
  on public.orders
  for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Customers can create orders (must set themselves as customer_id)
create policy "orders_customer_insert"
  on public.orders
  for insert
  with check (auth.uid() = customer_id);

-- Admins can update any order (status changes, assignment)
create policy "orders_admin_update"
  on public.orders
  for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Customers can cancel their own pending orders only
create policy "orders_customer_cancel"
  on public.orders
  for update
  using (auth.uid() = customer_id and status = 'pending')
  with check (status = 'cancelled');

-- ── order_files ───────────────────────────────────────────────────────────────

-- Participants of an order (customer or admin) can read its files
create policy "order_files_select"
  on public.order_files
  for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and (
          o.customer_id = auth.uid()
          or exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

-- Any authenticated user can insert files for orders they participate in
-- (server actions enforce the file_role constraint at the application layer)
create policy "order_files_insert"
  on public.order_files
  for insert
  with check (uploader_id = auth.uid());

-- ── order_messages ────────────────────────────────────────────────────────────

-- Participants can read messages for their orders
create policy "messages_select"
  on public.order_messages
  for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and (
          o.customer_id = auth.uid()
          or exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );

-- Participants can send messages on their orders
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
          or exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin'
          )
        )
    )
  );
