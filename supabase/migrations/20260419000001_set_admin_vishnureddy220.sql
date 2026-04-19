-- Promote vishnureddy220@gmail.com to admin role
update public.profiles
set role = 'admin'
where email = 'vishnureddy220@gmail.com';
