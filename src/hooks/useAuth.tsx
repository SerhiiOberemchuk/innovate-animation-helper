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

  useEffect(() => {
    async function getInitialSession() {
      try {
        setLoading(true);

        const { data, error: proferr } = await supabase
          .from("projects")
          .select("*")
          .limit(1);
        console.log("data:", data, "proferr:", proferr);

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        console.log("session:", session);

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
        console.log(session);

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Check if user has admin role
          const { data, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("Error fetching profile:", profileError);
          } else if (data) {
            console.log("User role:", data.role);
            setIsAdmin(data.role === "admin");
          }
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
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      // console.log("Auth state changed:", _event, session?.user?.id, session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(true);

      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (error) {
            console.error("Error fetching profile on auth change:", error);
          } else if (data) {
            console.log("User role on auth change:", data.role);
            setIsAdmin(data.role === "admin");
          }
        } catch (err) {
          console.error("Error updating admin status:", err);
        }
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
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
      console.log("Click signout - перед викликом signOut()");
      const { error: userError, data } = await supabase.auth.getUser();
      console.log("userError:", userError);
      console.log("data:", data);

      const responseSignOut = await supabase.auth.signOut();
      console.log("response отримано:", responseSignOut);

      const { error } = responseSignOut;
      console.log(error);

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
    } catch (error: any) {
      toast({
        title: "Logout error",
        description: "Could not log out.",
        variant: "destructive",
      });
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
      console.log("finally");
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
