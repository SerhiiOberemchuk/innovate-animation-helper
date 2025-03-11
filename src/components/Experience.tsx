
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
}

const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    period: 'Jan 2021 - Present',
    description: 'Led the development of a SaaS platform that increased client retention by 35%. Architected and implemented microservices infrastructure, reducing deployment time by 40%. Mentored junior developers and established coding standards.',
    skills: ['React', 'Node.js', 'AWS', 'Docker', 'MongoDB'],
  },
  {
    id: 'exp-2',
    role: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    location: 'New York, NY',
    period: 'Jun 2018 - Dec 2020',
    description: 'Developed and maintained web applications for clients across various industries. Implemented responsive designs and integrated payment gateways. Collaborated with cross-functional teams to deliver projects on schedule.',
    skills: ['JavaScript', 'React', 'Express', 'PostgreSQL', 'Git'],
  },
  {
    id: 'exp-3',
    role: 'Frontend Developer',
    company: 'WebCraft Agency',
    location: 'Boston, MA',
    period: 'Sep 2016 - May 2018',
    description: 'Created interactive user interfaces for client websites using modern JavaScript frameworks. Worked closely with designers to implement pixel-perfect layouts. Optimized website performance and improved loading times.',
    skills: ['HTML/CSS', 'JavaScript', 'Vue.js', 'Sass', 'Webpack'],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            My professional journey and the companies I've had the privilege to work with.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-12 relative">
            {experienceData.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-4 md:gap-8 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot and line */}
                <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-primary -translate-x-1/2 hidden md:block" style={{ top: `${index * 200 + 24}px` }}></div>
                
                {/* Date card for larger screens */}
                <div className="hidden md:block md:w-5/12"></div>
                
                {/* Content card */}
                <Card className="w-full md:w-5/12 card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{item.role}</CardTitle>
                        <CardDescription className="text-base font-medium">{item.company}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar size={12} /> {item.period}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin size={14} className="mr-1" /> {item.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map(skill => (
                        <span key={skill} className="skill-pill">{skill}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
