'use client'

export interface CartItem {
  id: string
  serviceType: string
  serviceSlug: string
  title: string
  orderId: string
  expectedDelivery: string
  price: number
  quantity: number
}

const DEFAULT_ITEMS: CartItem[] = [
  {
    id: 'req-1',
    serviceType: 'Video Editing',
    serviceSlug: 'video_editing',
    title: 'Promotional campaign reel for the New Customers to post on our brand page on...',
    orderId: '23456789',
    expectedDelivery: '15 Jan 2026',
    price: 500,
    quantity: 3,
  },
]

export const COUPON_DISCOUNTS: Record<string, number> = {
  PILOT10: 0.10,
  FIRST20: 0.20,
  MENEW15: 0.15,
}

const STORAGE_KEY = 'menew_cart_items'
const COUPON_KEY = 'menew_applied_coupon'

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return DEFAULT_ITEMS
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return DEFAULT_ITEMS
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ITEMS
  } catch {
    return DEFAULT_ITEMS
  }
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function addCartItem(item: Omit<CartItem, 'id' | 'orderId' | 'expectedDelivery'>): CartItem {
  const items = getCartItems()
  const randomId = Math.floor(10000000 + Math.random() * 90000000).toString()
  const futureDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const newItem: CartItem = {
    ...item,
    id: `req-${Date.now()}`,
    orderId: randomId,
    expectedDelivery: futureDate,
  }

  const updated = [...items, newItem]
  saveCartItems(updated)
  return newItem
}

export function removeCartItem(id: string) {
  const items = getCartItems().filter((item) => item.id !== id)
  saveCartItems(items)
  return items
}

export function getAppliedCoupon(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(COUPON_KEY)
}

export function setAppliedCoupon(code: string | null) {
  if (typeof window === 'undefined') return
  if (code) {
    localStorage.setItem(COUPON_KEY, code.toUpperCase())
  } else {
    localStorage.removeItem(COUPON_KEY)
  }
}
