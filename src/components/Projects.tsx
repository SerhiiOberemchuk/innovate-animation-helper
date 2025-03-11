
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard, { Project } from './ProjectCard';

// Sample projects data
const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team functionality.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['TypeScript', 'React', 'Express', 'PostgreSQL'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com'
  },
  {
    id: 'project-3',
    title: 'Fitness Tracker',
    description: 'A fitness tracking application that allows users to track workouts, set goals, and monitor progress.',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['React Native', 'Firebase', 'Redux'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com'
  },
  {
    id: 'project-4',
    title: 'Weather Dashboard',
    description: 'A weather dashboard that provides current and forecasted weather data for locations worldwide.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['JavaScript', 'OpenWeather API', 'Chart.js'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com'
  },
  {
    id: 'project-5',
    title: 'Recipe Sharing Platform',
    description: 'A platform for food enthusiasts to share, discover, and save recipes from around the world.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Vue.js', 'Node.js', 'MongoDB'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'project-6',
    title: 'Portfolio Website',
    description: 'A responsive portfolio website to showcase projects and professional experience.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com'
  }
];

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = ['all', 'frontend', 'backend', 'fullstack', 'mobile'];
  
  // Filter projects based on selected category
  // For demo purposes, just filtering randomly based on index
  const filteredProjects = projectsData.filter((project, index) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'frontend') return index % 3 === 0;
    if (activeCategory === 'backend') return index % 3 === 1;
    if (activeCategory === 'fullstack') return index % 2 === 0;
    if (activeCategory === 'mobile') return index % 4 === 3;
    return true;
  });

  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents different challenges and learning experiences.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                <div 
                  key={project.id} 
                  className="animate-scale-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            
            {visibleProjects < filteredProjects.length && (
              <div className="flex justify-center mt-10">
                <Button onClick={loadMore} variant="outline" size="lg">
                  Load More Projects
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Projects;
