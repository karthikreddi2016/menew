import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function seedAdmin() {
  const email = 'vkarthikreddy005@gmail.com'
  const password = 'KarthiK@2016'
  const fullName = 'Karthik Reddy'

  console.log(`Creating/updating admin user: ${email}...`)

  const { data: userList } = await supabase.auth.admin.listUsers()
  let userId = userList?.users?.find((u) => u.email === email)?.id

  if (!userId) {
    const { data: createdUser, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    })

    if (createErr) {
      console.error('Error creating auth user:', createErr.message)
      return
    }
    userId = createdUser.user.id
    console.log('Created Auth user successfully:', userId)
  } else {
    const { error: updateErr } = await supabase.auth.admin.updateUserById(userId, {
      password,
      user_metadata: { full_name: fullName },
    })
    if (updateErr) {
      console.error('Error updating password:', updateErr.message)
    } else {
      console.log('Updated Auth user password successfully!')
    }
  }

  const { error: profileErr } = await supabase.from('profiles').upsert({
    id: userId,
    full_name: fullName,
    email: email,
    role: 'admin',
  })

  if (profileErr) {
    console.error('Error updating profile role:', profileErr.message)
  } else {
    console.log('Successfully assigned ADMIN role to profile!')
  }
}

seedAdmin()
