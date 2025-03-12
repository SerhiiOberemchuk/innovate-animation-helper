
import { useState, useEffect, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

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
      setLoading(true);
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        toast({
          title: 'Помилка сесії',
          description: 'Не вдалося отримати сесію користувача.',
          variant: 'destructive',
        });
      }

      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Отримуємо роль користувача
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (!error && data) {
          setIsAdmin(data.role === 'admin');
        }
      }
      
      setLoading(false);
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Успішний вхід',
        description: 'Ви успішно увійшли в систему.',
      });
    } catch (error: any) {
      toast({
        title: 'Помилка входу',
        description: error.message || 'Не вдалося увійти в систему.',
        variant: 'destructive',
      });
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast({
        title: 'Вихід',
        description: 'Ви успішно вийшли з системи.',
      });
    } catch (error: any) {
      toast({
        title: 'Помилка виходу',
        description: 'Не вдалося вийти з системи.',
        variant: 'destructive',
      });
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, signIn, signOut, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
