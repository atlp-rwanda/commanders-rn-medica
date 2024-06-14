import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://kaaozvvwzghnuejbtnhd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthYW96dnZ3emdobnVlamJ0bmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1MzI1OTcsImV4cCI6MjAzMzEwODU5N30.o2Sx70Vrxn-X4HAydL37TVl6QuL4IK587P7tTx49weg"
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
