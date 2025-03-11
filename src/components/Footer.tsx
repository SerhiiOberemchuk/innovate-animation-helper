
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold highlight-gradient">FSdev</Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Building innovative web solutions with modern technologies. Let's create something amazing together.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-16">
            <div>
              <h3 className="text-sm font-semibold mb-3">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/skills" className="text-muted-foreground hover:text-foreground transition-colors">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link to="/experience" className="text-muted-foreground hover:text-foreground transition-colors">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-3">Social</h3>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github size={16} />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={16} />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter size={16} />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full h-8 w-8" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram size={16} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} FSdev. All rights reserved.
          </p>
          
          <Button 
            size="icon" 
            variant="outline" 
            className="mt-4 md:mt-0 rounded-full" 
            onClick={scrollToTop}
          >
            <ArrowUp size={16} />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
