import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Redirecting...',
}

export default function PaymentPendingPage() {
  redirect('/dashboard')
}
