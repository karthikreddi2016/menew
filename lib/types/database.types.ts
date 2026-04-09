export type OrderStatus = 'pending' | 'in_progress' | 'revision' | 'delivered' | 'completed' | 'cancelled'
export type ServiceType = 'graphic_design' | 'video_editing' | '3d_motion' | 'branding_kit' | 'thumbnail' | 'ppt_design'
export type FileRole = 'reference' | 'deliverable'
export type UserRole = 'customer' | 'admin'

export interface Profile {
  id: string
  full_name: string
  email: string
  phone: string | null
  role: UserRole
  created_at: string
}

export interface Order {
  id: string
  customer_id: string
  service_type: ServiceType
  title: string
  brief: string
  deadline_pref: string | null
  status: OrderStatus
  assigned_admin: string | null
  created_at: string
  updated_at: string
}

export interface OrderFile {
  id: string
  order_id: string
  uploader_id: string
  file_name: string
  storage_path: string
  file_size: number | null
  mime_type: string | null
  file_role: FileRole
  created_at: string
}

export interface OrderMessage {
  id: string
  order_id: string
  sender_id: string
  body: string
  created_at: string
}

// Supabase Database type (minimal, for typed client)
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Order, 'id' | 'created_at'>>
      }
      order_files: {
        Row: OrderFile
        Insert: Omit<OrderFile, 'id' | 'created_at'>
        Update: Partial<Omit<OrderFile, 'id' | 'created_at'>>
      }
      order_messages: {
        Row: OrderMessage
        Insert: Omit<OrderMessage, 'id' | 'created_at'>
        Update: Partial<Omit<OrderMessage, 'id' | 'created_at'>>
      }
    }
  }
}
