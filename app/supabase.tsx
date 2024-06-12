import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vaxjykeihsernxqxeyiy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZheGp5a2VpaHNlcm54cXhleWl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0NDAzMTksImV4cCI6MjAzMzAxNjMxOX0.PbKiCmDG-U_1H0gkelN3_ze8_VE8lqIsc3pi5IH2bBA"
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
