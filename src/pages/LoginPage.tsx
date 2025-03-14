
import { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Flag, Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if we already have a user and they're an admin, redirect to admin panel
    if (user && isAdmin) {
      navigate('/admin/projects');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    await signIn(email, password);
  };

  // If already logged in and admin, redirect to admin panel
  if (user && isAdmin) {
    return <Navigate to="/admin/projects" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-24">
        <Card className="w-full max-w-md animate-scale-up">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-2 bg-blue-500 rounded-t-lg"></div>
                <div className="w-12 h-2 bg-yellow-400 rounded-b-lg"></div>
                <Flag className="text-blue-500 mt-2" size={24} />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Вхід в систему</CardTitle>
            <CardDescription className="text-center">
              Увійдіть, щоб отримати доступ до адмін-панелі
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Пароль
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" /> Вхід...
                  </>
                ) : (
                  'Увійти'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-sm text-center text-muted-foreground">
              Немає облікового запису?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Зареєструватися <ArrowRight size={14} className="inline ml-1" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Особистий кабінет розробника
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
