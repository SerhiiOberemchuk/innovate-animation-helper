
import { useState, useEffect, createContext, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  // Helper function to check if user is admin
  const checkAdminStatus = async (userId: string) => {
    try {
      console.log("Checking admin status for user:", userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile for admin check:", error);
        return false;
      } 
      
      if (data) {
        console.log("User role data:", data);
        return data.role === "admin";
      }
      
      return false;
    } catch (err) {
      console.error("Unexpected error checking admin status:", err);
      return false;
    }
  };

  useEffect(() => {
    async function getInitialSession() {
      try {
        setLoading(true);
        console.log("Getting initial auth session...");

        // Test database connection
        const { data: testData, error: testError } = await supabase
          .from("projects")
          .select("id")
          .limit(1);
          
        if (testError) {
          console.error("Database connection test failed:", testError);
          toast({
            title: "Database connection error",
            description: "Could not connect to database. Please check your configuration.",
            variant: "destructive",
          });
        } else {
          console.log("Database connection successful:", testData);
        }

        // Get session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error);
          toast({
            title: "Session error",
            description: "Could not retrieve user session.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        console.log("Initial session loaded:", session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user?.id) {
          const isUserAdmin = await checkAdminStatus(session.user.id);
          console.log("Is user admin:", isUserAdmin);
          setIsAdmin(isUserAdmin);
        }
      } catch (e) {
        console.error("Unexpected auth error:", e);
      } finally {
        setLoading(false);
      }
    }

    getInitialSession();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      console.log("Auth state changed:", _event, newSession?.user?.id);
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(true);

      if (newSession?.user?.id) {
        const isUserAdmin = await checkAdminStatus(newSession.user.id);
        console.log("Is user admin (on auth change):", isUserAdmin);
        setIsAdmin(isUserAdmin);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Signing in user:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Sign in successful:", data.user?.id);
      
      if (data.user) {
        const isUserAdmin = await checkAdminStatus(data.user.id);
        setIsAdmin(isUserAdmin);
        console.log("User admin status after login:", isUserAdmin);
      }

      toast({
        title: "Login successful",
        description: "You have successfully logged in.",
      });
    } catch (error: any) {
      toast({
        title: "Login error",
        description: error.message || "Could not log in.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log("Signing out user");
      
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      // Clear local state
      setUser(null);
      setSession(null);
      setIsAdmin(false);

      toast({
        title: "Logged out",
        description: "You have successfully logged out.",
      });
      
      // Force redirect to home page after logout
      window.location.href = "/";
    } catch (error: any) {
      toast({
        title: "Logout error",
        description: "Could not log out.",
        variant: "destructive",
      });
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, user, signIn, signOut, loading, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
