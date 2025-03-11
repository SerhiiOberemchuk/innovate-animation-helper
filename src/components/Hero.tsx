
import { Button } from '@/components/ui/button';
import { ArrowDown, Code, Server, Database, Layout } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 pb-16">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 grid-pattern"></div>
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-[10%] w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
      
      {/* Floating icons */}
      <div className="hidden lg:block absolute top-1/4 left-[15%] animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="relative glassmorphism rounded-lg p-3 shadow-md">
          <Code className="text-primary" size={24} />
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-1/4 right-[15%] animate-float" style={{ animationDelay: '1.2s' }}>
        <div className="relative glassmorphism rounded-lg p-3 shadow-md">
          <Server className="text-secondary" size={24} />
        </div>
      </div>
      <div className="hidden lg:block absolute top-[60%] left-[25%] animate-float" style={{ animationDelay: '0.8s' }}>
        <div className="relative glassmorphism rounded-lg p-3 shadow-md">
          <Database className="text-primary" size={24} />
        </div>
      </div>
      <div className="hidden lg:block absolute top-[30%] right-[25%] animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="relative glassmorphism rounded-lg p-3 shadow-md">
          <Layout className="text-secondary" size={24} />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="inline-block mb-4 animate-slide-down">
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">Full Stack Developer</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Building <span className="text-gradient">digital experiences</span> that matter
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          I create modern web applications, focusing on clean code, performance, and user experience. 
          From responsive frontends to scalable backends, I build complete solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button size="lg" className="text-base" onClick={scrollToProjects}>
            View My Projects
          </Button>
          <Button size="lg" variant="outline" className="text-base" asChild>
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      {showArrow && (
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow cursor-pointer"
          onClick={scrollToProjects}
        >
          <ArrowDown className="text-foreground/60" />
        </div>
      )}
    </section>
  );
};

export default Hero;
