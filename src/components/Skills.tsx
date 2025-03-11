
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Code, Database, Server, Globe, Palette, Library } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Code size={24} />,
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Next.js', level: 80 },
        { name: 'CSS/SCSS', level: 85 },
        { name: 'Tailwind CSS', level: 90 },
      ],
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Backend',
      icon: <Server size={24} />,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'NestJS', level: 75 },
        { name: 'Python', level: 70 },
        { name: 'GraphQL', level: 75 },
      ],
      color: 'from-emerald-500 to-green-500',
    },
    {
      title: 'Database',
      icon: <Database size={24} />,
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'Redis', level: 70 },
        { name: 'Firebase', level: 75 },
        { name: 'Prisma', level: 80 },
      ],
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'DevOps',
      icon: <Globe size={24} />,
      skills: [
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'CI/CD', level: 65 },
        { name: 'Kubernetes', level: 60 },
        { name: 'Linux', level: 80 },
      ],
      color: 'from-rose-500 to-red-500',
    },
    {
      title: 'Design',
      icon: <Palette size={24} />,
      skills: [
        { name: 'Figma', level: 70 },
        { name: 'UI/UX', level: 75 },
        { name: 'Responsive Design', level: 85 },
        { name: 'Wireframing', level: 80 },
        { name: 'Photoshop', level: 65 },
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Tools & Libraries',
      icon: <Library size={24} />,
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Redux', level: 80 },
        { name: 'Jest', level: 75 },
        { name: 'Webpack', level: 70 },
        { name: 'Material UI', level: 85 },
      ],
      color: 'from-sky-500 to-blue-500',
    },
  ];

  return (
    <section id="skills" className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            My technical skills and proficiency in various technologies and tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={category.title} className="overflow-hidden animate-scale-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">{category.icon}</div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 0.1 + skillIndex * 0.1}s` }}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
