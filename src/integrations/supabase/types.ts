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
      alerts: {
        Row: {
          channel: string
          created_at: string
          dedupe_key: string | null
          delivery_status: string
          event_type: string
          id: string
          listing_id: string | null
          payload: Json
          read_at: string | null
          recipient_user_id: string
          sent_at: string | null
          severity: string
        }
        Insert: {
          channel?: string
          created_at?: string
          dedupe_key?: string | null
          delivery_status?: string
          event_type: string
          id?: string
          listing_id?: string | null
          payload?: Json
          read_at?: string | null
          recipient_user_id: string
          sent_at?: string | null
          severity?: string
        }
        Update: {
          channel?: string
          created_at?: string
          dedupe_key?: string | null
          delivery_status?: string
          event_type?: string
          id?: string
          listing_id?: string | null
          payload?: Json
          read_at?: string | null
          recipient_user_id?: string
          sent_at?: string | null
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
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
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          after_data: Json | null
          before_data: Json | null
          created_at: string
          id: number
          resource_id: string | null
          resource_type: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          id?: number
          resource_id?: string | null
          resource_type: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          id?: number
          resource_id?: string | null
          resource_type?: string
        }
        Relationships: []
      }
      audit_responses: {
        Row: {
          audit_id: string
          created_at: string
          created_by: string
          evidence_ids: string[]
          id: string
          notes: string | null
          observed_at: string | null
          result: string
          review_status: string
          severity: string | null
          template_item_id: string
        }
        Insert: {
          audit_id: string
          created_at?: string
          created_by?: string
          evidence_ids?: string[]
          id?: string
          notes?: string | null
          observed_at?: string | null
          result: string
          review_status?: string
          severity?: string | null
          template_item_id: string
        }
        Update: {
          audit_id?: string
          created_at?: string
          created_by?: string
          evidence_ids?: string[]
          id?: string
          notes?: string | null
          observed_at?: string | null
          result?: string
          review_status?: string
          severity?: string | null
          template_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_responses_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_responses_template_item_id_fkey"
            columns: ["template_item_id"]
            isOneToOne: false
            referencedRelation: "audit_template_items"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_template_items: {
        Row: {
          critical_gate: boolean
          guidance: string | null
          id: string
          item_code: string
          label: string
          required_evidence_types: string[]
          section: string
          severity_if_failed: string
          sort_order: number
          template_id: string
          weight: number
        }
        Insert: {
          critical_gate?: boolean
          guidance?: string | null
          id?: string
          item_code: string
          label: string
          required_evidence_types?: string[]
          section: string
          severity_if_failed?: string
          sort_order?: number
          template_id: string
          weight?: number
        }
        Update: {
          critical_gate?: boolean
          guidance?: string | null
          id?: string
          item_code?: string
          label?: string
          required_evidence_types?: string[]
          section?: string
          severity_if_failed?: string
          sort_order?: number
          template_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "audit_template_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "audit_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_templates: {
        Row: {
          created_at: string
          effective_from: string | null
          effective_to: string | null
          id: string
          jurisdiction_scope: string | null
          name: string
          property_type: string | null
          published_at: string | null
          published_by: string | null
          source_refs: string[]
          version: number
        }
        Insert: {
          created_at?: string
          effective_from?: string | null
          effective_to?: string | null
          id?: string
          jurisdiction_scope?: string | null
          name: string
          property_type?: string | null
          published_at?: string | null
          published_by?: string | null
          source_refs?: string[]
          version?: number
        }
        Update: {
          created_at?: string
          effective_from?: string | null
          effective_to?: string | null
          id?: string
          jurisdiction_scope?: string | null
          name?: string
          property_type?: string | null
          published_at?: string | null
          published_by?: string | null
          source_refs?: string[]
          version?: number
        }
        Relationships: []
      }
      audits: {
        Row: {
          audit_type: string
          auditor_id: string | null
          created_at: string
          decision: string | null
          decision_reason: string | null
          device_captured_at: string | null
          id: string
          listing_id: string
          location_accuracy_m: number | null
          next_due_at: string | null
          reviewer_id: string | null
          scheduled_at: string | null
          server_received_at: string | null
          started_at: string | null
          status: string
          submitted_at: string | null
          template_id: string
          template_version: number
          updated_at: string
        }
        Insert: {
          audit_type: string
          auditor_id?: string | null
          created_at?: string
          decision?: string | null
          decision_reason?: string | null
          device_captured_at?: string | null
          id?: string
          listing_id: string
          location_accuracy_m?: number | null
          next_due_at?: string | null
          reviewer_id?: string | null
          scheduled_at?: string | null
          server_received_at?: string | null
          started_at?: string | null
          status?: string
          submitted_at?: string | null
          template_id: string
          template_version: number
          updated_at?: string
        }
        Update: {
          audit_type?: string
          auditor_id?: string | null
          created_at?: string
          decision?: string | null
          decision_reason?: string | null
          device_captured_at?: string | null
          id?: string
          listing_id?: string
          location_accuracy_m?: number | null
          next_due_at?: string | null
          reviewer_id?: string | null
          scheduled_at?: string | null
          server_received_at?: string | null
          started_at?: string | null
          status?: string
          submitted_at?: string | null
          template_id?: string
          template_version?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audits_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audits_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "audit_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      consents: {
        Row: {
          granted_at: string
          id: string
          notice_version: string
          purpose_code: string
          user_id: string
          withdrawn_at: string | null
        }
        Insert: {
          granted_at?: string
          id?: string
          notice_version: string
          purpose_code: string
          user_id?: string
          withdrawn_at?: string | null
        }
        Update: {
          granted_at?: string
          id?: string
          notice_version?: string
          purpose_code?: string
          user_id?: string
          withdrawn_at?: string | null
        }
        Relationships: []
      }
      corrective_action_events: {
        Row: {
          action_id: string
          actor_id: string
          created_at: string
          event_type: string
          evidence_ids: string[]
          id: string
          note: string
        }
        Insert: {
          action_id: string
          actor_id?: string
          created_at?: string
          event_type: string
          evidence_ids?: string[]
          id?: string
          note: string
        }
        Update: {
          action_id?: string
          actor_id?: string
          created_at?: string
          event_type?: string
          evidence_ids?: string[]
          id?: string
          note?: string
        }
        Relationships: [
          {
            foreignKeyName: "corrective_action_events_action_id_fkey"
            columns: ["action_id"]
            isOneToOne: false
            referencedRelation: "corrective_actions"
            referencedColumns: ["id"]
          },
        ]
      }
      corrective_actions: {
        Row: {
          audit_id: string | null
          audit_response_id: string | null
          closure_reviewer_id: string | null
          created_at: string
          due_at: string | null
          id: string
          listing_id: string
          owner_user_id: string | null
          provider_response: string | null
          public_disclosure_level: string
          reopen_count: number
          severity: string
          status: string
          submitted_resolution_at: string | null
          title: string
          updated_at: string
          verified_closed_at: string | null
        }
        Insert: {
          audit_id?: string | null
          audit_response_id?: string | null
          closure_reviewer_id?: string | null
          created_at?: string
          due_at?: string | null
          id?: string
          listing_id: string
          owner_user_id?: string | null
          provider_response?: string | null
          public_disclosure_level?: string
          reopen_count?: number
          severity: string
          status?: string
          submitted_resolution_at?: string | null
          title: string
          updated_at?: string
          verified_closed_at?: string | null
        }
        Update: {
          audit_id?: string | null
          audit_response_id?: string | null
          closure_reviewer_id?: string | null
          created_at?: string
          due_at?: string | null
          id?: string
          listing_id?: string
          owner_user_id?: string | null
          provider_response?: string | null
          public_disclosure_level?: string
          reopen_count?: number
          severity?: string
          status?: string
          submitted_resolution_at?: string | null
          title?: string
          updated_at?: string
          verified_closed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "corrective_actions_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corrective_actions_audit_response_id_fkey"
            columns: ["audit_response_id"]
            isOneToOne: false
            referencedRelation: "audit_responses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "corrective_actions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
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
      evidence_documents: {
        Row: {
          access_class: string
          created_at: string
          document_type: string
          expires_at: string | null
          id: string
          issued_at: string | null
          issuer: string | null
          listing_id: string
          reference_masked: string | null
          retention_until: string | null
          review_status: string
          reviewed_at: string | null
          reviewer_id: string | null
          scan_status: string
          sha256: string | null
          storage_key: string
          uploaded_by: string
          verification_id: string | null
        }
        Insert: {
          access_class?: string
          created_at?: string
          document_type: string
          expires_at?: string | null
          id?: string
          issued_at?: string | null
          issuer?: string | null
          listing_id: string
          reference_masked?: string | null
          retention_until?: string | null
          review_status?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          scan_status?: string
          sha256?: string | null
          storage_key: string
          uploaded_by?: string
          verification_id?: string | null
        }
        Update: {
          access_class?: string
          created_at?: string
          document_type?: string
          expires_at?: string | null
          id?: string
          issued_at?: string | null
          issuer?: string | null
          listing_id?: string
          reference_masked?: string | null
          retention_until?: string | null
          review_status?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          scan_status?: string
          sha256?: string | null
          storage_key?: string
          uploaded_by?: string
          verification_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evidence_documents_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_documents_verification_id_fkey"
            columns: ["verification_id"]
            isOneToOne: false
            referencedRelation: "provider_verifications"
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
          assurance_state: string
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
          last_audited_at: string | null
          lat: number | null
          lgbtq_friendly: boolean
          lng: number | null
          location: string
          monthly_rent: number
          next_review_at: string | null
          nsfas_accredited: boolean
          organization_id: string | null
          owner_id: string
          pet_friendly: boolean
          province: string
          published_at: string | null
          readiness_data: Json
          readiness_status: string
          readiness_submitted_at: string | null
          room_type: Database["public"]["Enums"]["room_type"] | null
          status: string
          suburb: string | null
          title: string
        }
        Insert: {
          accessible?: boolean
          amenities?: string[]
          assurance_state?: string
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
          last_audited_at?: string | null
          lat?: number | null
          lgbtq_friendly?: boolean
          lng?: number | null
          location: string
          monthly_rent: number
          next_review_at?: string | null
          nsfas_accredited?: boolean
          organization_id?: string | null
          owner_id?: string
          pet_friendly?: boolean
          province: string
          published_at?: string | null
          readiness_data?: Json
          readiness_status?: string
          readiness_submitted_at?: string | null
          room_type?: Database["public"]["Enums"]["room_type"] | null
          status?: string
          suburb?: string | null
          title: string
        }
        Update: {
          accessible?: boolean
          amenities?: string[]
          assurance_state?: string
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
          last_audited_at?: string | null
          lat?: number | null
          lgbtq_friendly?: boolean
          lng?: number | null
          location?: string
          monthly_rent?: number
          next_review_at?: string | null
          nsfas_accredited?: boolean
          organization_id?: string | null
          owner_id?: string
          pet_friendly?: boolean
          province?: string
          published_at?: string | null
          readiness_data?: Json
          readiness_status?: string
          readiness_submitted_at?: string | null
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
          {
            foreignKeyName: "listings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
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
      organization_memberships: {
        Row: {
          accepted_at: string | null
          created_at: string
          id: string
          invited_by: string | null
          member_role: string
          organization_id: string
          status: string
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          id?: string
          invited_by?: string | null
          member_role?: string
          organization_id: string
          status?: string
          user_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          id?: string
          invited_by?: string | null
          member_role?: string
          organization_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_memberships_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          org_type: string
          registration_number: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          org_type: string
          registration_number?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          org_type?: string
          registration_number?: string | null
          status?: string
          updated_at?: string
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
      provider_verifications: {
        Row: {
          checked_at: string | null
          checked_by: string | null
          created_at: string
          expires_at: string | null
          id: string
          listing_id: string | null
          method: string | null
          notes_restricted: string | null
          organization_id: string | null
          reference_last4: string | null
          source_authority: string
          status: string
          subject_name: string | null
          updated_at: string
          valid_from: string | null
          verification_type: string
        }
        Insert: {
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          listing_id?: string | null
          method?: string | null
          notes_restricted?: string | null
          organization_id?: string | null
          reference_last4?: string | null
          source_authority: string
          status?: string
          subject_name?: string | null
          updated_at?: string
          valid_from?: string | null
          verification_type: string
        }
        Update: {
          checked_at?: string | null
          checked_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          listing_id?: string | null
          method?: string | null
          notes_restricted?: string | null
          organization_id?: string | null
          reference_last4?: string | null
          source_authority?: string
          status?: string
          subject_name?: string | null
          updated_at?: string
          valid_from?: string | null
          verification_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_verifications_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_verifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      report_events: {
        Row: {
          actor_id: string
          created_at: string
          event_type: string
          id: string
          note: string | null
          safety_report_id: string
          visibility: string
        }
        Insert: {
          actor_id?: string
          created_at?: string
          event_type: string
          id?: string
          note?: string | null
          safety_report_id: string
          visibility?: string
        }
        Update: {
          actor_id?: string
          created_at?: string
          event_type?: string
          id?: string
          note?: string | null
          safety_report_id?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_events_safety_report_id_fkey"
            columns: ["safety_report_id"]
            isOneToOne: false
            referencedRelation: "safety_reports"
            referencedColumns: ["id"]
          },
        ]
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
      safety_reports: {
        Row: {
          acknowledged_at: string | null
          anonymous_to_landlord: boolean
          assigned_to: string | null
          category: string
          closed_at: string | null
          description: string
          id: string
          listing_id: string | null
          occurred_at: string | null
          reported_at: string
          reporter_user_id: string | null
          retention_until: string | null
          status: string
          urgency: string
        }
        Insert: {
          acknowledged_at?: string | null
          anonymous_to_landlord?: boolean
          assigned_to?: string | null
          category: string
          closed_at?: string | null
          description: string
          id?: string
          listing_id?: string | null
          occurred_at?: string | null
          reported_at?: string
          reporter_user_id?: string | null
          retention_until?: string | null
          status?: string
          urgency?: string
        }
        Update: {
          acknowledged_at?: string | null
          anonymous_to_landlord?: boolean
          assigned_to?: string | null
          category?: string
          closed_at?: string | null
          description?: string
          id?: string
          listing_id?: string | null
          occurred_at?: string | null
          reported_at?: string
          reporter_user_id?: string | null
          retention_until?: string | null
          status?: string
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "safety_reports_listing_id_fkey"
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
      utility_events: {
        Row: {
          confidence: string
          created_at: string
          created_by: string | null
          ended_at: string | null
          id: string
          listing_id: string
          public_summary: string | null
          source: string
          started_at: string
          utility_type: string
        }
        Insert: {
          confidence?: string
          created_at?: string
          created_by?: string | null
          ended_at?: string | null
          id?: string
          listing_id: string
          public_summary?: string | null
          source: string
          started_at: string
          utility_type: string
        }
        Update: {
          confidence?: string
          created_at?: string
          created_by?: string | null
          ended_at?: string | null
          id?: string
          listing_id?: string
          public_summary?: string | null
          source?: string
          started_at?: string
          utility_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "utility_events_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
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
      evidence_path_listing: { Args: { _name: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_assurance_staff: { Args: { _uid: string }; Returns: boolean }
      listing_assurance: {
        Args: { _listing: string }
        Returns: {
          assurance_state: string
          last_audited_at: string
          next_review_at: string
          open_public_actions: number
          verifications: Json
        }[]
      }
      owns_listing: {
        Args: { _listing: string; _uid: string }
        Returns: boolean
      }
      respond_corrective_action: {
        Args: {
          _action: string
          _appeal: boolean
          _evidence?: string[]
          _note: string
        }
        Returns: undefined
      }
      review_readiness: {
        Args: { _approve: boolean; _listing: string; _reason: string }
        Returns: undefined
      }
      save_readiness: {
        Args: { _data: Json; _listing: string; _submit?: boolean }
        Returns: undefined
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
          assurance_state: string
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
          last_audited_at: string | null
          lat: number | null
          lgbtq_friendly: boolean
          lng: number | null
          location: string
          monthly_rent: number
          next_review_at: string | null
          nsfas_accredited: boolean
          organization_id: string | null
          owner_id: string
          pet_friendly: boolean
          province: string
          published_at: string | null
          readiness_data: Json
          readiness_status: string
          readiness_submitted_at: string | null
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
