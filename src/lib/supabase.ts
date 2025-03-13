import { createClient } from "@supabase/supabase-js";

// Значення за замовчуванням для запобігання помилок під час розробки
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Функція для створення клієнта Supabase з перевіркою на наявність конфігурації
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "Supabase URL або Anon Key відсутні! Переконайтеся, що ви налаштували змінні середовища VITE_SUPABASE_URL та VITE_SUPABASE_ANON_KEY."
    );

    // Повертаємо клієнт з dummy URL для уникнення помилок ініціалізації
    // В реальному сценарії він не буде працювати без дійсних облікових даних
    return createClient("https://example.supabase.co", "dummy-key");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

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

export type Profile = {
  id: string;
  email: string;
  role: "admin" | "user";
  created_at: string;
};
