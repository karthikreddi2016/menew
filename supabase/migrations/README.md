# Migrations

Run these files in the Supabase SQL Editor **in order**. Each file is numbered and idempotent where possible.

| File | What it does |
|------|-------------|
| `001_create_profiles.sql` | `profiles` table + auto-create trigger on signup |
| `002_create_orders.sql` | `orders` table + `updated_at` trigger |
| `003_create_order_files.sql` | `order_files` table (references + deliverables) |
| `004_create_order_messages.sql` | `order_messages` table |
| `005_enable_rls.sql` | Enable RLS on all tables |
| `006_rls_policies.sql` | All Row Level Security policies |
| `007_storage_bucket.sql` | `order-files` private storage bucket + storage policies |

## How to apply

1. Open your Supabase project → **SQL Editor**
2. Paste and run each file in order (001 → 007)
3. After running 007, verify the bucket exists in **Storage**

## After first deploy

To make yourself an admin, run:

```sql
update public.profiles
set role = 'admin'
where email = 'your@email.com';
```

## Adding future migrations

Name new files with the next sequence number and today's date:

```
20260410_008_add_order_notes.sql
```

This makes it easy to see what changed and when.
