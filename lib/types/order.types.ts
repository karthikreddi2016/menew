import type { OrderStatus, ServiceType } from './database.types'

export type { OrderStatus, ServiceType }

export const SERVICE_CONFIG: Record<ServiceType, {
  label: string
  description: string
  deliveryTag: string
  image: string
  slug: ServiceType
}> = {
  graphic_design: {
    label: 'Graphic Design',
    description: 'Social posts, banners, brand assets',
    deliveryTag: 'Same Day Delivery',
    image: '/images/graphic-design.jpg',
    slug: 'graphic_design',
  },
  video_editing: {
    label: 'Video Editing',
    description: 'Reels, ads, YouTube, short-form',
    deliveryTag: '12–24 hours',
    image: '/images/video-editing.jpg',
    slug: 'video_editing',
  },
  '3d_motion': {
    label: '3D / Motion Design',
    description: 'Product visuals, animations, explainers',
    deliveryTag: '48–72 hours',
    image: '/images/3d-motion.jpg',
    slug: '3d_motion',
  },
  branding_kit: {
    label: 'Branding Kit',
    description: 'Logos, brand guidelines',
    deliveryTag: '48 hours',
    image: '/images/branding-kit.jpg',
    slug: 'branding_kit',
  },
  thumbnail: {
    label: 'Thumbnail',
    description: 'YouTube & social media',
    deliveryTag: '12 hours',
    image: '/images/thumbnail.jpg',
    slug: 'thumbnail',
  },
  ppt_design: {
    label: 'PPT Design',
    description: 'Investor ready pitch decks, presentation slides',
    deliveryTag: '24 hours',
    image: '/images/ppt-design.jpg',
    slug: 'ppt_design',
  },
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending Review',
  in_progress: 'In Progress',
  revision: 'Revision Requested',
  delivered: 'Delivered',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  in_progress: 'bg-blue-100 text-blue-800',
  revision: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
  completed: 'bg-teal-100 text-teal-800',
  cancelled: 'bg-gray-100 text-gray-600',
}

// Quick-create tiles mapping (CreateTodaySection)
export const QUICK_SERVICE_MAP: Record<string, ServiceType> = {
  'Poster Design': 'graphic_design',
  'PPT Design': 'ppt_design',
  'Video Editing': 'video_editing',
  'Banner Design': 'graphic_design',
  'Branding Kit': 'branding_kit',
  'Brochure Design': 'graphic_design',
  'Ads/Flex Design': 'graphic_design',
  'Social Media Post Design': 'graphic_design',
  'Business Card Design': 'graphic_design',
}
