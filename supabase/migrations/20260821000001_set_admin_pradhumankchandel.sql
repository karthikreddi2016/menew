-- Promote pradhumankchandel@gmail.com to admin role
update public.profiles
set role = 'admin'
where email = 'pradhumankchandel@gmail.com';
