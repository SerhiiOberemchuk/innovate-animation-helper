
import { Button } from '@/components/ui/button';
import { ArrowDown, Code, Server, Database, Layout, Flag, Heart, MapPin } from 'lucide-react';
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
      
      {/* Ukrainian flag colors blur effect */}
      <div className="absolute top-[30%] left-[5%] w-32 h-32 bg-blue-500/30 rounded-full blur-2xl -z-10"></div>
      <div className="absolute top-[40%] left-[10%] w-32 h-32 bg-yellow-400/30 rounded-full blur-2xl -z-10"></div>
      
      {/* Italian flag colors blur effect */}
      <div className="absolute bottom-[30%] right-[5%] w-32 h-32 bg-green-500/20 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-[40%] right-[10%] w-32 h-32 bg-red-500/20 rounded-full blur-2xl -z-10"></div>
      
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
      
      {/* Ukrainian flag floating element */}
      <div className="hidden lg:block absolute top-[15%] right-[35%] animate-float" style={{ animationDelay: '1.7s' }}>
        <div className="relative glassmorphism rounded-lg p-3 shadow-md">
          <div className="flex flex-col">
            <div className="h-2 w-8 bg-blue-500 rounded-t-sm"></div>
            <div className="h-2 w-8 bg-yellow-400 rounded-b-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Italian flag floating element */}
      <div className="hidden lg:block absolute bottom-[15%] left-[35%] animate-float" style={{ animationDelay: '2s' }}>
        <div className="relative glassmorphism rounded-lg p-3 shadow-md">
          <div className="flex">
            <div className="h-4 w-2 bg-green-500 rounded-l-sm"></div>
            <div className="h-4 w-2 bg-white"></div>
            <div className="h-4 w-2 bg-red-500 rounded-r-sm"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="inline-block mb-4 animate-slide-down">
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <span className="mr-2">🇺🇦</span>
            Full Stack Developer
            <span className="ml-2">🇮🇹</span>
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Oberemchuk <span className="text-gradient">Serhii</span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          I create modern web applications, focusing on clean code, performance, and user experience. 
          From responsive frontends to scalable backends, I build complete solutions.
        </p>
        
        <div className="flex justify-center items-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-1">
            <Flag size={16} className="text-blue-500" />
            <span className="text-sm font-medium">Ukrainian Developer</span>
          </div>
          <div className="h-4 w-px bg-foreground/20"></div>
          <div className="flex items-center gap-1">
            <MapPin size={16} className="text-red-500" />
            <span className="text-sm font-medium">Based in Italy</span>
          </div>
        </div>
        
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
