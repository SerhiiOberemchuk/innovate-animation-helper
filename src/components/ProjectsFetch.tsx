
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard from './ProjectCard';
import { supabase, Project } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const ProjectsFetch = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [activeCategory, setActiveCategory] = useState('all');
  const { toast } = useToast();
  
  const categories = ['all', 'frontend', 'backend', 'fullstack', 'mobile'];

  useEffect(() => {
    fetchProjects();
  }, []);

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
      setError(null);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      setError('Не вдалося завантажити проекти');
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити проекти',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Фільтруємо проекти за вибраною категорією
  // Для демо просто фільтруємо за тегами, які містять назву категорії
  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.tags.some(tag => 
      tag.toLowerCase().includes(activeCategory.toLowerCase())
    );
  });

  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };

  if (loading) {
    return (
      <section id="projects" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Мої проекти</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Ось деякі з проектів, над якими я працював. Кожен з них представляє різні виклики та досвід навчання.
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Мої проекти</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Сталася помилка при завантаженні проектів. Спробуйте оновити сторінку.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Мої проекти</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Ось деякі з проектів, над якими я працював. Кожен з них представляє різні виклики та досвід навчання.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full mb-10">
          <div className="flex justify-center">
            <TabsList>
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setVisibleProjects(4);
                  }}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={activeCategory} className="mt-8">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  Проектів у цій категорії поки що немає.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                  <div 
                    key={project.id} 
                    className="animate-scale-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProjectCard 
                      project={{
                        id: project.id,
                        title: project.title,
                        description: project.description,
                        image: project.image_url,
                        tags: project.tags,
                        demoUrl: project.demo_url || undefined,
                        repoUrl: project.repo_url || undefined,
                        featured: project.featured
                      }} 
                    />
                  </div>
                ))}
              </div>
            )}
            
            {visibleProjects < filteredProjects.length && (
              <div className="flex justify-center mt-10">
                <Button onClick={loadMore} variant="outline" size="lg">
                  Завантажити більше проектів
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProjectsFetch;
