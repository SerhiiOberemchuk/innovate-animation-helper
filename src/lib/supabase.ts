
import { createClient } from "@supabase/supabase-js";

// Default values to prevent development errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Log if environment variables are not set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL or Anon Key missing! Create a .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables."
  );
}

// Function to create Supabase client with configuration check
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "Supabase connection failed! Please check your environment variables in .env.local file."
    );

    // Return a dummy client to prevent app crashes
    return createClient("https://example.supabase.co", "dummy-key");
  }
  
  console.log("Connecting to Supabase...");
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

// Data types for the database
export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  demo_url?: string;
  repo_url?: string;
  tags: string[];
  featured: boolean;
  created_at: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  skills: string[];
  location: string;
};

export type Profile = {
  id: string;
  email: string;
  role: "admin" | "user";
  created_at: string;
};
