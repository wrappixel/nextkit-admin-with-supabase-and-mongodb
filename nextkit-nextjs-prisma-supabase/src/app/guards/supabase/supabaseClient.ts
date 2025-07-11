import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string | any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey: string | any = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
