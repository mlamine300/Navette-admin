import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const token=localStorage.getItem("token");
export const supabaseAdmin = createClient(supabaseUrl, supabaseKey,{global: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },});
export default supabase;