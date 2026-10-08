export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      amenities: {
        Row: {
          icon: string | null
          id: string
          label: string
          slug: string
        }
        Insert: {
          icon?: string | null
          id?: string
          label: string
          slug: string
        }
        Update: {
          icon?: string | null
          id?: string
          label?: string
          slug?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          created_at: string
          id: string
          is_demo: boolean
          listing_id: string
          message: string
          preferred_move_in: string | null
          status: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_demo?: boolean
          listing_id: string
          message: string
          preferred_move_in?: string | null
          status?: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_demo?: boolean
          listing_id?: string
          message?: string
          preferred_move_in?: string | null
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          id: string
          name: string
          province: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          name: string
          province?: string | null
          sort_order?: number
        }
        Update: {
          id?: string
          name?: string
          province?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      investor_leads: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          organisation: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          organisation?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          organisation?: string | null
        }
        Relationships: []
      }
      landlords: {
        Row: {
          business_name: string
          contact_email: string | null
          created_at: string
          id: string
          phone: string | null
          user_id: string
          verification: string
          whatsapp: string | null
        }
        Insert: {
          business_name: string
          contact_email?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          user_id: string
          verification?: string
          whatsapp?: string | null
        }
        Update: {
          business_name?: string
          contact_email?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          user_id?: string
          verification?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      listing_amenities: {
        Row: {
          amenity_id: string
          listing_id: string
        }
        Insert: {
          amenity_id: string
          listing_id: string
        }
        Update: {
          amenity_id?: string
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_amenities_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_images: {
        Row: {
          alt_text: string
          id: string
          listing_id: string
          sort_order: number
          storage_path: string
        }
        Insert: {
          alt_text?: string
          id?: string
          listing_id: string
          sort_order?: number
          storage_path: string
        }
        Update: {
          alt_text?: string
          id?: string
          listing_id?: string
          sort_order?: number
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_images_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          accessible: boolean
          amenities: string[]
          available_from: string | null
          beds: number
          city: string | null
          created_at: string
          deposit_zar: number | null
          description: string
          distance_km: number | null
          id: string
          image_urls: string[]
          institution: string | null
          is_demo: boolean
          landlord_id: string | null
          lat: number | null
          lgbtq_friendly: boolean
          lng: number | null
          location: string
          monthly_rent: number
          nsfas_accredited: boolean
          owner_id: string
          pet_friendly: boolean
          province: string
          published_at: string | null
          room_type: Database["public"]["Enums"]["room_type"] | null
          status: string
          suburb: string | null
          title: string
        }
        Insert: {
          accessible?: boolean
          amenities?: string[]
          available_from?: string | null
          beds?: number
          city?: string | null
          created_at?: string
          deposit_zar?: number | null
          description: string
          distance_km?: number | null
          id?: string
          image_urls?: string[]
          institution?: string | null
          is_demo?: boolean
          landlord_id?: string | null
          lat?: number | null
          lgbtq_friendly?: boolean
          lng?: number | null
          location: string
          monthly_rent: number
          nsfas_accredited?: boolean
          owner_id?: string
          pet_friendly?: boolean
          province: string
          published_at?: string | null
          room_type?: Database["public"]["Enums"]["room_type"] | null
          status?: string
          suburb?: string | null
          title: string
        }
        Update: {
          accessible?: boolean
          amenities?: string[]
          available_from?: string | null
          beds?: number
          city?: string | null
          created_at?: string
          deposit_zar?: number | null
          description?: string
          distance_km?: number | null
          id?: string
          image_urls?: string[]
          institution?: string | null
          is_demo?: boolean
          landlord_id?: string | null
          lat?: number | null
          lgbtq_friendly?: boolean
          lng?: number | null
          location?: string
          monthly_rent?: number
          nsfas_accredited?: boolean
          owner_id?: string
          pet_friendly?: boolean
          province?: string
          published_at?: string | null
          room_type?: Database["public"]["Enums"]["room_type"] | null
          status?: string
          suburb?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_landlord_id_fkey"
            columns: ["landlord_id"]
            isOneToOne: false
            referencedRelation: "landlords"
            referencedColumns: ["id"]
          },
        ]
      }
      notify_requests: {
        Row: {
          consent_popia: boolean
          created_at: string
          email: string
          id: string
          max_rent_zar: number | null
          province: string | null
        }
        Insert: {
          consent_popia?: boolean
          created_at?: string
          email: string
          id?: string
          max_rent_zar?: number | null
          province?: string | null
        }
        Update: {
          consent_popia?: boolean
          created_at?: string
          email?: string
          id?: string
          max_rent_zar?: number | null
          province?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          budget_zar: number | null
          created_at: string
          full_name: string | null
          id: string
          lifestyle: string | null
          pets: boolean | null
          phone: string | null
          student_verified: boolean
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          budget_zar?: number | null
          created_at?: string
          full_name?: string | null
          id: string
          lifestyle?: string | null
          pets?: boolean | null
          phone?: string | null
          student_verified?: boolean
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          budget_zar?: number | null
          created_at?: string
          full_name?: string | null
          id?: string
          lifestyle?: string | null
          pets?: boolean | null
          phone?: string | null
          student_verified?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          listing_id: string
          rating: number
          reviewer_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          listing_id: string
          rating: number
          reviewer_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          listing_id?: string
          rating?: number
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_listings: {
        Row: {
          created_at: string
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_listings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      verification_documents: {
        Row: {
          created_at: string
          doc_type: string
          id: string
          landlord_id: string
          storage_path: string
        }
        Insert: {
          created_at?: string
          doc_type: string
          id?: string
          landlord_id: string
          storage_path: string
        }
        Update: {
          created_at?: string
          doc_type?: string
          id?: string
          landlord_id?: string
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_landlord_id_fkey"
            columns: ["landlord_id"]
            isOneToOne: false
            referencedRelation: "landlords"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      become_landlord: { Args: { _business_name: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      search_listings: {
        Args: {
          _accessible?: boolean
          _institution?: string
          _lgbtq?: boolean
          _limit?: number
          _max_distance?: number
          _max_rent?: number
          _move_in?: string
          _nsfas?: boolean
          _offset?: number
          _pet?: boolean
          _province?: string
          _room_type?: Database["public"]["Enums"]["room_type"]
          _sort?: string
        }
        Returns: {
          accessible: boolean
          amenities: string[]
          available_from: string | null
          beds: number
          city: string | null
          created_at: string
          deposit_zar: number | null
          description: string
          distance_km: number | null
          id: string
          image_urls: string[]
          institution: string | null
          is_demo: boolean
          landlord_id: string | null
          lat: number | null
          lgbtq_friendly: boolean
          lng: number | null
          location: string
          monthly_rent: number
          nsfas_accredited: boolean
          owner_id: string
          pet_friendly: boolean
          province: string
          published_at: string | null
          room_type: Database["public"]["Enums"]["room_type"] | null
          status: string
          suburb: string | null
          title: string
        }[]
        SetofOptions: {
          from: "*"
          to: "listings"
          isOneToOne: false
          isSetofReturn: true
        }
      }
    }
    Enums: {
      app_role:
        | "student"
        | "landlord"
        | "admin"
        | "auditor"
        | "reviewer"
        | "safety_manager"
        | "institution_partner"
      room_type: "single" | "sharing" | "studio" | "bachelor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "student",
        "landlord",
        "admin",
        "auditor",
        "reviewer",
        "safety_manager",
        "institution_partner",
      ],
      room_type: ["single", "sharing", "studio", "bachelor"],
    },
  },
} as const
