export type OrderStatus = 'pending' | 'in_progress' | 'revision' | 'delivered' | 'completed' | 'cancelled'
export type ServiceType = 'graphic_design' | 'video_editing' | '3d_motion' | 'branding_kit' | 'thumbnail' | 'ppt_design'
export type FileRole = 'reference' | 'deliverable'
export type UserRole = 'customer' | 'admin'

export type Profile = {
  id: string
  full_name: string
  email: string
  phone: string | null
  role: UserRole
  created_at: string
}

export type Order = {
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

export type OrderFile = {
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

export type OrderMessage = {
  id: string
  order_id: string
  sender_id: string
  body: string
  created_at: string
}

// Supabase Database type — must satisfy the full shape expected by @supabase/supabase-js v2
// generic machinery. Missing Relationships, Views, Functions, Enums, or CompositeTypes
// causes select() return types to collapse to `never`.
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: {
          id: string
          full_name: string
          email: string
          phone: string | null
          role: UserRole
        }
        Update: {
          full_name?: string
          email?: string
          phone?: string | null
          role?: UserRole
        }
        Relationships: []
      }
      orders: {
        Row: Order
        Insert: {
          customer_id: string
          service_type: ServiceType
          title: string
          brief: string
          deadline_pref?: string | null
          status?: OrderStatus
          assigned_admin?: string | null
        }
        Update: {
          customer_id?: string
          service_type?: ServiceType
          title?: string
          brief?: string
          deadline_pref?: string | null
          status?: OrderStatus
          assigned_admin?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'orders_customer_id_fkey'
            columns: ['customer_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'orders_assigned_admin_fkey'
            columns: ['assigned_admin']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      order_files: {
        Row: OrderFile
        Insert: {
          order_id: string
          uploader_id: string
          file_name: string
          storage_path: string
          file_size: number | null
          mime_type: string | null
          file_role: FileRole
        }
        Update: {
          order_id?: string
          uploader_id?: string
          file_name?: string
          storage_path?: string
          file_size?: number | null
          mime_type?: string | null
          file_role?: FileRole
        }
        Relationships: []
      }
      order_messages: {
        Row: OrderMessage
        Insert: {
          order_id: string
          sender_id: string
          body: string
        }
        Update: {
          order_id?: string
          sender_id?: string
          body?: string
        }
        Relationships: [
          {
            foreignKeyName: 'order_messages_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'order_messages_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
