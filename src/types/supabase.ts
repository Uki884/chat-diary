export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      Account: {
        Row: {
          created_at: string
          id: string
          provider: Database["public"]["Enums"]["auth_provider"]
          provider_account_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          provider: Database["public"]["Enums"]["auth_provider"]
          provider_account_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          provider?: Database["public"]["Enums"]["auth_provider"]
          provider_account_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Account_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Diary: {
        Row: {
          created_at: string
          date: string
          id: string
          locked_at: string | null
          mood_icon: Database["public"]["Enums"]["mood_icon"] | null
          status: Database["public"]["Enums"]["diary_status"]
          summary: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          locked_at?: string | null
          mood_icon?: Database["public"]["Enums"]["mood_icon"] | null
          status?: Database["public"]["Enums"]["diary_status"]
          summary?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          locked_at?: string | null
          mood_icon?: Database["public"]["Enums"]["mood_icon"] | null
          status?: Database["public"]["Enums"]["diary_status"]
          summary?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Diary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      DiaryComment: {
        Row: {
          content: string
          created_at: string
          diary_id: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          diary_id: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          diary_id?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "DiaryComment_diary_id_fkey"
            columns: ["diary_id"]
            isOneToOne: false
            referencedRelation: "Diary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "DiaryComment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      DiaryRoom: {
        Row: {
          created_at: string
          diary_id: string
          status: Database["public"]["Enums"]["diary_room_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          diary_id: string
          status?: Database["public"]["Enums"]["diary_room_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          diary_id?: string
          status?: Database["public"]["Enums"]["diary_room_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "DiaryRoom_diary_id_fkey"
            columns: ["diary_id"]
            isOneToOne: true
            referencedRelation: "Diary"
            referencedColumns: ["id"]
          },
        ]
      }
      DiaryRoomAiMessage: {
        Row: {
          content: string
          created_at: string
          diary_room_id: string
          id: string
          timestamps: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          diary_room_id: string
          id?: string
          timestamps?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          diary_room_id?: string
          id?: string
          timestamps?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "DiaryRoomAiMessage_diary_room_id_fkey"
            columns: ["diary_room_id"]
            isOneToOne: false
            referencedRelation: "DiaryRoom"
            referencedColumns: ["diary_id"]
          },
        ]
      }
      DiaryRoomUserMessage: {
        Row: {
          content: string
          created_at: string
          diary_room_id: string
          id: string
          timestamps: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          diary_room_id: string
          id?: string
          timestamps?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          diary_room_id?: string
          id?: string
          timestamps?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "DiaryRoomUserMessage_diary_room_id_fkey"
            columns: ["diary_room_id"]
            isOneToOne: false
            referencedRelation: "DiaryRoom"
            referencedColumns: ["diary_id"]
          },
          {
            foreignKeyName: "DiaryRoomUserMessage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      auth_provider: "google"
      diary_room_status: "active" | "inactive"
      diary_status: "init" | "writting" | "completed"
      mood_icon: "happy"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

