
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Plus, X, Upload, Loader2 } from 'lucide-react';

interface Tag {
  id: string;
  text: string;
}

interface AddProjectProps {
  projectId?: string;
}

const AddProject = ({ projectId }: AddProjectProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    demoUrl: '',
    repoUrl: '',
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (tagInput.trim() && tags.length < 10) {
      const newTag = {
        id: Date.now().toString(),
        text: tagInput.trim()
      };
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImagePreview = () => {
    setPreviewImage(null);
    // Reset the file input
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || tags.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields and add at least one tag.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate project creation or update based on whether projectId is provided
    setTimeout(() => {
      toast({
        title: projectId ? "Project updated!" : "Project added!",
        description: projectId 
          ? "Your project has been updated successfully." 
          : "Your new project has been added successfully.",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        demoUrl: '',
        repoUrl: '',
      });
      setTags([]);
      setPreviewImage(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="animate-scale-up">
          <CardHeader>
            <CardTitle>{projectId ? "Edit Project" : "Add New Project"}</CardTitle>
            <CardDescription>
              {projectId 
                ? "Update your project information below."
                : "Showcase your latest work by adding it to your portfolio."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="add-project-form" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Project Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., E-Commerce Platform"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project, its features, and technologies used..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Project Image
                  </label>
                  <div className="border rounded-md p-4">
                    {previewImage ? (
                      <div className="relative">
                        <img 
                          src={previewImage} 
                          alt="Project preview" 
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2 rounded-full h-7 w-7"
                          onClick={clearImagePreview}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 bg-muted/50 rounded-md border-2 border-dashed">
                        <Upload size={30} className="text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Drag & drop or click to upload</p>
                        <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                          Select Image
                        </Button>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="tags" className="text-sm font-medium flex justify-between">
                    <span>Tags <span className="text-destructive">*</span></span>
                    <span className="text-muted-foreground text-xs">{tags.length}/10</span>
                  </label>
                  <div className="flex items-center">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagKeyDown}
                      placeholder="e.g., React, Node.js (press Enter to add)"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      size="icon" 
                      className="ml-2" 
                      onClick={addTag}
                      disabled={!tagInput.trim() || tags.length >= 10}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <span key={tag.id} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary/10 text-secondary">
                          {tag.text}
                          <button
                            type="button"
                            className="ml-1 rounded-full hover:bg-secondary/20 p-0.5"
                            onClick={() => removeTag(tag.id)}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="demoUrl" className="text-sm font-medium">
                      Demo URL
                    </label>
                    <Input
                      id="demoUrl"
                      name="demoUrl"
                      type="url"
                      value={formData.demoUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="repoUrl" className="text-sm font-medium">
                      Repository URL
                    </label>
                    <Input
                      id="repoUrl"
                      name="repoUrl"
                      type="url"
                      value={formData.repoUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              type="submit" 
              form="add-project-form" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" /> {projectId ? "Updating..." : "Saving Project..."}
                </>
              ) : (
                <>
                  {projectId ? (
                    <>Update Project</>
                  ) : (
                    <>
                      <Plus size={16} className="mr-2" /> Add Project
                    </>
                  )}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default AddProject;
