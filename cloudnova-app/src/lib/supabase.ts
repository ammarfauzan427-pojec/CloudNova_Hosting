import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Order {
  id: string;
  order_number: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  plan: string;
  domain: string;
  duration_months: number;
  total_amount: number;
  payment_method: string;
  payment_status: "pending" | "paid" | "failed";
  snap_token?: string;
  created_at?: string;
}

export interface Service {
  id: string;
  order_id?: string;
  domain: string;
  plan: string;
  username: string;
  status: "active" | "suspended" | "pending";
  disk_limit_gb: number;
  disk_used_mb: number;
  bandwidth_limit_gb: number;
  bandwidth_used_mb: number;
  created_at?: string;
  expires_at?: string;
}
