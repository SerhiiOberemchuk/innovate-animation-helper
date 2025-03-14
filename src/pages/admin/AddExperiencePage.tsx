
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Briefcase, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const AddExperiencePage = () => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [current, setCurrent] = useState(false);
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!company || !position || !description || !startDate || !location) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }
    
    if (!current && !endDate) {
      toast({
        title: 'End date required',
        description: 'Please provide an end date or mark as current position',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setLoading(true);
      
      const skillsArray = skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);
      
      const { error } = await supabase.from('experiences').insert({
        company,
        position,
        description,
        start_date: startDate,
        end_date: current ? null : endDate,
        current,
        skills: skillsArray,
        location
      });
      
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Experience added successfully',
      });
      
      navigate('/admin/experiences');
    } catch (error: any) {
      console.error('Error adding experience:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add experience',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-24">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center mb-2">
              <Briefcase className="mr-2 text-blue-500" />
              <CardTitle>Add Experience</CardTitle>
            </div>
            <CardDescription>
              Add a new professional experience to your portfolio
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    placeholder="Job title"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    placeholder="MM/YYYY"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date {current ? '(Current)' : '*'}</Label>
                  <Input
                    id="endDate"
                    placeholder="MM/YYYY"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={current}
                    required={!current}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="current"
                  checked={current}
                  onCheckedChange={setCurrent}
                />
                <Label htmlFor="current">Current Position</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  placeholder="JavaScript, React, Node.js"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your responsibilities and achievements"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate('/admin/experiences')}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  'Save Experience'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AddExperiencePage;
