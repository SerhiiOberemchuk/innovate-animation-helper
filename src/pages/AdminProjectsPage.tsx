
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Pencil, Trash2, Star, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, Project } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const AdminProjectsPage = () => {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProjects(data || []);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити проекти',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ featured: !currentValue })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Оновлюємо локальний стан
      setProjects(projects.map(project => 
        project.id === id ? { ...project, featured: !currentValue } : project
      ));

      toast({
        title: 'Успіх',
        description: !currentValue 
          ? 'Проект позначено як рекомендований' 
          : 'Проект більше не є рекомендованим',
      });
    } catch (error: any) {
      console.error('Error updating project:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося оновити проект',
        variant: 'destructive',
      });
    }
  };

  const deleteProject = async () => {
    if (!projectToDelete) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectToDelete);

      if (error) {
        throw error;
      }

      // Оновлюємо локальний стан
      setProjects(projects.filter(project => project.id !== projectToDelete));
      setProjectToDelete(null);

      toast({
        title: 'Успіх',
        description: 'Проект видалено успішно',
      });
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося видалити проект',
        variant: 'destructive',
      });
    }
  };

  // Якщо авторизація все ще завантажується, показуємо індикатор завантаження
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  // Якщо користувач не авторизований, перенаправляємо на сторінку входу
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Якщо користувач не є адміністратором, показуємо повідомлення про відсутність доступу
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Доступ заборонено</CardTitle>
              <CardDescription>
                У вас немає прав доступу до цієї сторінки
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link to="/">На головну</Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-8 px-4 container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Flag className="mr-2 text-blue-500" /> Управління проектами
            </h1>
            <p className="text-muted-foreground">
              Адмін-панель для управління проектами портфоліо
            </p>
          </div>
          <Button asChild>
            <Link to="/add-project">
              <Plus className="mr-2 h-4 w-4" /> Додати проект
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Проекти</CardTitle>
            <CardDescription>
              Тут ви можете переглядати, редагувати та видаляти проекти у вашому портфоліо
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">Проектів поки немає</p>
                <Button asChild>
                  <Link to="/add-project">
                    <Plus className="mr-2 h-4 w-4" /> Додати перший проект
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Назва</TableHead>
                      <TableHead className="hidden md:table-cell">Теги</TableHead>
                      <TableHead className="hidden lg:table-cell">Створено</TableHead>
                      <TableHead className="hidden lg:table-cell">Статус</TableHead>
                      <TableHead className="text-right">Дії</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            {project.title}
                            {project.featured && (
                              <Badge variant="outline" className="mt-1 hidden sm:inline-flex w-fit">
                                <Star className="h-3 w-3 text-yellow-500 mr-1" /> Рекомендований
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {project.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {new Date(project.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFeatured(project.id, project.featured)}
                          >
                            {project.featured ? (
                              <span className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" /> 
                                Рекомендований
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <Star className="h-4 w-4 mr-1" /> 
                                Звичайний
                              </span>
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" asChild>
                              <Link to={`/edit-project/${project.id}`}>
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="destructive" 
                                  size="icon"
                                  onClick={() => setProjectToDelete(project.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Ця дія не може бути скасована. Проект буде безповоротно видалено.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setProjectToDelete(null)}>
                                    Скасувати
                                  </AlertDialogCancel>
                                  <AlertDialogAction onClick={deleteProject}>
                                    Видалити
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminProjectsPage;
