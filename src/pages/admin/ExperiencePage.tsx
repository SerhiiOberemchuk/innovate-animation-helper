
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { Loader2, Plus, Pencil, Trash2, Briefcase } from 'lucide-react';
import { supabase, Experience } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [experienceToDelete, setExperienceToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) {
        throw error;
      }

      setExperiences(data || []);
    } catch (error: any) {
      console.error('Error fetching experiences:', error);
      toast({
        title: 'Error',
        description: 'Could not load experiences',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteExperience = async () => {
    if (!experienceToDelete) return;
    
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', experienceToDelete);

      if (error) {
        throw error;
      }

      // Update local state
      setExperiences(experiences.filter(exp => exp.id !== experienceToDelete));
      setExperienceToDelete(null);

      toast({
        title: 'Success',
        description: 'Experience deleted successfully',
      });
    } catch (error: any) {
      console.error('Error deleting experience:', error);
      toast({
        title: 'Error',
        description: 'Could not delete experience',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-8 px-4 container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Briefcase className="mr-2 text-blue-500" /> Experience Management
            </h1>
            <p className="text-muted-foreground">
              Manage your professional experiences and skills
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/add-experience">
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Professional Experiences</CardTitle>
            <CardDescription>
              View, edit and delete your professional experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : experiences.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">No experiences added yet</p>
                <Button asChild>
                  <Link to="/admin/add-experience">
                    <Plus className="mr-2 h-4 w-4" /> Add First Experience
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead className="hidden md:table-cell">Duration</TableHead>
                      <TableHead className="hidden lg:table-cell">Skills</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {experiences.map((experience) => (
                      <TableRow key={experience.id}>
                        <TableCell className="font-medium">
                          {experience.company}
                          {experience.current && (
                            <Badge variant="outline" className="ml-2">Current</Badge>
                          )}
                        </TableCell>
                        <TableCell>{experience.position}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {experience.start_date} - {experience.current ? 'Present' : experience.end_date}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {experience.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {experience.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{experience.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" asChild>
                              <Link to={`/admin/edit-experience/${experience.id}`}>
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="destructive" 
                                  size="icon"
                                  onClick={() => setExperienceToDelete(experience.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This experience will be permanently deleted.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setExperienceToDelete(null)}>
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction onClick={deleteExperience}>
                                    Delete
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

export default ExperiencePage;
