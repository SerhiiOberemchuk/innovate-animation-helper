
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Типи даних для бази
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
