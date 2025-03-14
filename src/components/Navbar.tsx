
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, Moon, Sun, Github, Linkedin, Mail, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { user, signOut, isAdmin } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (localStorage.getItem('darkMode') === null) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    } else {
      setIsDarkMode(savedDarkMode);
      document.documentElement.classList.toggle('dark', savedDarkMode);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!isDarkMode).toString());
    
    toast({
      title: isDarkMode ? "Light mode activated" : "Dark mode activated",
      duration: 1500
    });
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 glassmorphism' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold highlight-gradient">FSdev</Link>
        
        {!isMobile ? (
          <nav className="flex items-center gap-8">
            <ul className="flex gap-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className={`relative px-1 py-2 text-base font-medium transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full focus-ring rounded-sm ${location.pathname === item.path ? 'text-primary after:w-full' : 'text-foreground/80 hover:text-foreground'}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-3">
              <Button size="icon" variant="ghost" className="rounded-full" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Github size={20} />
                </Button>
              </a>
              
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Linkedin size={20} />
                </Button>
              </a>
              
              {user ? (
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger>
                            <LayoutDashboard className="mr-1" size={16} /> Admin Panel
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-1 p-2">
                              <li>
                                <NavigationMenuLink asChild>
                                  <Link to="/admin/projects" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                                    Projects Management
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                              <li>
                                <NavigationMenuLink asChild>
                                  <Link to="/admin/experiences" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                                    Experience Management
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut size={18} className="mr-1" /> Logout
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">
                    <LogIn size={18} className="mr-1" /> Login
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        ) : (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="rounded-full" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        )}
      </div>

      {isMobile && (
        <div className={`fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full pt-20 px-6">
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-xl font-medium py-3 border-b border-border animate-slide-up ${location.pathname === item.path ? 'text-primary' : 'text-foreground/80'}`}
                  style={{ animationDelay: `${navItems.indexOf(item) * 0.1}s` }}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <div className="flex flex-col gap-3 mt-4">
                  {isAdmin && (
                    <>
                      <h3 className="text-sm font-semibold mt-4 text-muted-foreground">Admin Panel</h3>
                      <Link
                        to="/admin/projects"
                        className="text-lg font-medium py-2 pl-2 border-l-2 border-primary animate-slide-up"
                      >
                        Projects Management
                      </Link>
                      <Link
                        to="/admin/experiences"
                        className="text-lg font-medium py-2 pl-2 border-l-2 border-primary animate-slide-up"
                      >
                        Experience Management
                      </Link>
                    </>
                  )}
                  <Button variant="ghost" className="w-full justify-start mt-4" onClick={handleSignOut}>
                    <LogOut size={18} className="mr-2" /> Logout
                  </Button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-xl font-medium py-3 border-b border-border animate-slide-up flex items-center"
                  style={{ animationDelay: `${navItems.length * 0.1}s` }}
                >
                  <LogIn size={20} className="mr-2" /> Login
                </Link>
              )}
            </nav>
            
            <div className="mt-auto mb-8 flex justify-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
                  <Github size={22} />
                </Button>
              </a>
              
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
                  <Linkedin size={22} />
                </Button>
              </a>
              
              <a href="mailto:contact@example.com">
                <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
                  <Mail size={22} />
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
