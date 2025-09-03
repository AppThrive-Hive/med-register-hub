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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_case: string
          appointment_date: string
          appointment_time: string
          created_at: string
          id: string
          notes: string | null
          patient_id: string
          provider_name: string | null
          status: Database["public"]["Enums"]["appointment_status_type"] | null
          updated_at: string
        }
        Insert: {
          appointment_case: string
          appointment_date: string
          appointment_time: string
          created_at?: string
          id?: string
          notes?: string | null
          patient_id: string
          provider_name?: string | null
          status?: Database["public"]["Enums"]["appointment_status_type"] | null
          updated_at?: string
        }
        Update: {
          appointment_case?: string
          appointment_date?: string
          appointment_time?: string
          created_at?: string
          id?: string
          notes?: string | null
          patient_id?: string
          provider_name?: string | null
          status?: Database["public"]["Enums"]["appointment_status_type"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_contacts: {
        Row: {
          city: string | null
          contact_name: string
          country: string | null
          created_at: string
          email: string | null
          id: string
          patient_id: string
          phone_number: string
          relationship: string
          state_province: string | null
          street_address: string | null
          zip_postal_code: string | null
        }
        Insert: {
          city?: string | null
          contact_name: string
          country?: string | null
          created_at?: string
          email?: string | null
          id?: string
          patient_id: string
          phone_number: string
          relationship: string
          state_province?: string | null
          street_address?: string | null
          zip_postal_code?: string | null
        }
        Update: {
          city?: string | null
          contact_name?: string
          country?: string | null
          created_at?: string
          email?: string | null
          id?: string
          patient_id?: string
          phone_number?: string
          relationship?: string
          state_province?: string | null
          street_address?: string | null
          zip_postal_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contacts_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      family_medical_history: {
        Row: {
          age_of_onset: number | null
          condition: string
          created_at: string
          id: string
          notes: string | null
          patient_id: string
          relationship: string
        }
        Insert: {
          age_of_onset?: number | null
          condition: string
          created_at?: string
          id?: string
          notes?: string | null
          patient_id: string
          relationship: string
        }
        Update: {
          age_of_onset?: number | null
          condition?: string
          created_at?: string
          id?: string
          notes?: string | null
          patient_id?: string
          relationship?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_medical_history_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_records: {
        Row: {
          appointment_id: string | null
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          patient_id: string
          provider_name: string | null
          record_date: string
          record_type: Database["public"]["Enums"]["record_type"]
          title: string
          updated_at: string
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          patient_id: string
          provider_name?: string | null
          record_date?: string
          record_type: Database["public"]["Enums"]["record_type"]
          title: string
          updated_at?: string
        }
        Update: {
          appointment_id?: string | null
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          patient_id?: string
          provider_name?: string | null
          record_date?: string
          record_type?: Database["public"]["Enums"]["record_type"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_addresses: {
        Row: {
          city: string
          country: string
          created_at: string
          id: string
          patient_id: string
          state_province: string
          street_address: string
          zip_postal_code: string
        }
        Insert: {
          city: string
          country?: string
          created_at?: string
          id?: string
          patient_id: string
          state_province: string
          street_address: string
          zip_postal_code: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          id?: string
          patient_id?: string
          state_province?: string
          street_address?: string
          zip_postal_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_addresses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_allergies: {
        Row: {
          allergen: string
          allergy_type: string
          created_at: string
          id: string
          patient_id: string
          reaction: string | null
          severity: string | null
        }
        Insert: {
          allergen: string
          allergy_type: string
          created_at?: string
          id?: string
          patient_id: string
          reaction?: string | null
          severity?: string | null
        }
        Update: {
          allergen?: string
          allergy_type?: string
          created_at?: string
          id?: string
          patient_id?: string
          reaction?: string | null
          severity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_allergies_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_chronic_conditions: {
        Row: {
          condition_name: string
          created_at: string
          diagnosed_date: string | null
          id: string
          notes: string | null
          patient_id: string
          status: string | null
        }
        Insert: {
          condition_name: string
          created_at?: string
          diagnosed_date?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          status?: string | null
        }
        Update: {
          condition_name?: string
          created_at?: string
          diagnosed_date?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_chronic_conditions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_lifestyle: {
        Row: {
          alcohol_consumption:
            | Database["public"]["Enums"]["alcohol_consumption_type"]
            | null
          created_at: string
          dietary_restrictions: string | null
          exercise_habits:
            | Database["public"]["Enums"]["exercise_frequency_type"]
            | null
          id: string
          occupation: string | null
          patient_id: string
          smoking_status:
            | Database["public"]["Enums"]["smoking_status_type"]
            | null
          updated_at: string
        }
        Insert: {
          alcohol_consumption?:
            | Database["public"]["Enums"]["alcohol_consumption_type"]
            | null
          created_at?: string
          dietary_restrictions?: string | null
          exercise_habits?:
            | Database["public"]["Enums"]["exercise_frequency_type"]
            | null
          id?: string
          occupation?: string | null
          patient_id: string
          smoking_status?:
            | Database["public"]["Enums"]["smoking_status_type"]
            | null
          updated_at?: string
        }
        Update: {
          alcohol_consumption?:
            | Database["public"]["Enums"]["alcohol_consumption_type"]
            | null
          created_at?: string
          dietary_restrictions?: string | null
          exercise_habits?:
            | Database["public"]["Enums"]["exercise_frequency_type"]
            | null
          id?: string
          occupation?: string | null
          patient_id?: string
          smoking_status?:
            | Database["public"]["Enums"]["smoking_status_type"]
            | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_lifestyle_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_medications: {
        Row: {
          created_at: string
          dosage: string
          end_date: string | null
          frequency: string
          id: string
          is_active: boolean | null
          medication_name: string
          patient_id: string
          prescribed_by: string | null
          start_date: string | null
        }
        Insert: {
          created_at?: string
          dosage: string
          end_date?: string | null
          frequency: string
          id?: string
          is_active?: boolean | null
          medication_name: string
          patient_id: string
          prescribed_by?: string | null
          start_date?: string | null
        }
        Update: {
          created_at?: string
          dosage?: string
          end_date?: string | null
          frequency?: string
          id?: string
          is_active?: boolean | null
          medication_name?: string
          patient_id?: string
          prescribed_by?: string | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_medications_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_surgeries: {
        Row: {
          created_at: string
          hospital: string | null
          id: string
          notes: string | null
          patient_id: string
          procedure_name: string
          surgeon: string | null
          surgery_date: string
        }
        Insert: {
          created_at?: string
          hospital?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          procedure_name: string
          surgeon?: string | null
          surgery_date: string
        }
        Update: {
          created_at?: string
          hospital?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          procedure_name?: string
          surgeon?: string | null
          surgery_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_surgeries_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          created_at: string
          date_of_birth: string
          email: string | null
          first_name: string
          gender: Database["public"]["Enums"]["gender_type"]
          id: string
          last_name: string
          marital_status:
            | Database["public"]["Enums"]["marital_status_type"]
            | null
          middle_name: string | null
          national_id: string | null
          patient_id: string
          preferred_language: string | null
          primary_phone: string
          secondary_phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_of_birth: string
          email?: string | null
          first_name: string
          gender: Database["public"]["Enums"]["gender_type"]
          id?: string
          last_name: string
          marital_status?:
            | Database["public"]["Enums"]["marital_status_type"]
            | null
          middle_name?: string | null
          national_id?: string | null
          patient_id: string
          preferred_language?: string | null
          primary_phone: string
          secondary_phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string
          email?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["gender_type"]
          id?: string
          last_name?: string
          marital_status?:
            | Database["public"]["Enums"]["marital_status_type"]
            | null
          middle_name?: string | null
          national_id?: string | null
          patient_id?: string
          preferred_language?: string | null
          primary_phone?: string
          secondary_phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      previous_healthcare_providers: {
        Row: {
          contact_info: string | null
          created_at: string
          id: string
          last_visit_date: string | null
          patient_id: string
          provider_name: string
          provider_type: string | null
        }
        Insert: {
          contact_info?: string | null
          created_at?: string
          id?: string
          last_visit_date?: string | null
          patient_id: string
          provider_name: string
          provider_type?: string | null
        }
        Update: {
          contact_info?: string | null
          created_at?: string
          id?: string
          last_visit_date?: string | null
          patient_id?: string
          provider_name?: string
          provider_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "previous_healthcare_providers_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          generated_at: string
          generated_by: string | null
          id: string
          report_data: Json | null
          report_name: string
          report_type: string
        }
        Insert: {
          generated_at?: string
          generated_by?: string | null
          id?: string
          report_data?: Json | null
          report_name: string
          report_type: string
        }
        Update: {
          generated_at?: string
          generated_by?: string | null
          id?: string
          report_data?: Json | null
          report_name?: string
          report_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_patient_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      alcohol_consumption_type:
        | "Never"
        | "Occasionally"
        | "Regularly"
        | "Heavily"
      appointment_status_type:
        | "Scheduled"
        | "Confirmed"
        | "In Progress"
        | "Completed"
        | "Cancelled"
        | "No Show"
      exercise_frequency_type: "Never" | "Rarely" | "Weekly" | "Daily"
      gender_type: "Male" | "Female" | "Other"
      marital_status_type:
        | "Single"
        | "Married"
        | "Divorced"
        | "Widowed"
        | "Separated"
      record_type:
        | "Consultation"
        | "Lab Result"
        | "Imaging"
        | "Treatment"
        | "Prescription"
        | "Referral"
      smoking_status_type: "Never" | "Former" | "Current"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      alcohol_consumption_type: [
        "Never",
        "Occasionally",
        "Regularly",
        "Heavily",
      ],
      appointment_status_type: [
        "Scheduled",
        "Confirmed",
        "In Progress",
        "Completed",
        "Cancelled",
        "No Show",
      ],
      exercise_frequency_type: ["Never", "Rarely", "Weekly", "Daily"],
      gender_type: ["Male", "Female", "Other"],
      marital_status_type: [
        "Single",
        "Married",
        "Divorced",
        "Widowed",
        "Separated",
      ],
      record_type: [
        "Consultation",
        "Lab Result",
        "Imaging",
        "Treatment",
        "Prescription",
        "Referral",
      ],
      smoking_status_type: ["Never", "Former", "Current"],
    },
  },
} as const
