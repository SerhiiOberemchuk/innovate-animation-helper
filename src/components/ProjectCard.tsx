
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Github, Eye } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`overflow-hidden card-hover transition-all duration-500 h-full ${project.featured ? 'border-primary/20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {project.featured && (
          <Badge className="absolute top-3 right-3 bg-primary">Featured</Badge>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="skill-pill">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          {project.repoUrl && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} className="mr-1" /> Code
              </a>
            </Button>
          )}
          
          {project.demoUrl && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Eye size={16} className="mr-1" /> Demo
              </a>
            </Button>
          )}
        </div>
        
        <Button size="icon" variant="ghost" className="rounded-full" asChild>
          <a href={`/projects/${project.id}`}>
            <ArrowUpRight size={18} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
