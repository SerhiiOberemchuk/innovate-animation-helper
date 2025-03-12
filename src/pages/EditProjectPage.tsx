
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Upload, Loader2, Flag } from 'lucide-react';
import { supabase, Project } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/hooks/useAuth';

interface Tag {
  id: string;
  text: string;
}

const EditProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    demoUrl: '',
    repoUrl: '',
    featured: false
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing && id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;
      
      if (data) {
        setFormData({
          title: data.title,
          description: data.description,
          demoUrl: data.demo_url || '',
          repoUrl: data.repo_url || '',
          featured: data.featured
        });
        
        setTags(data.tags.map((tag: string) => ({
          id: uuidv4(),
          text: tag
        })));
        
        if (data.image_url) {
          setPreviewImage(data.image_url);
        }
      }
    } catch (error: any) {
      console.error('Error fetching project:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити проект',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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
        id: uuidv4(),
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
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImagePreview = () => {
    setPreviewImage(null);
    setImageFile(null);
    // Reset file input
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile && !previewImage) {
      return null;
    }
    
    // If editing and no new image uploaded, return existing URL
    if (isEditing && previewImage && !imageFile) {
      return previewImage;
    }
    
    if (!imageFile) {
      return null;
    }
    
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `projects/${fileName}`;
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, imageFile);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити зображення',
        variant: 'destructive',
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || tags.length === 0) {
      toast({
        title: "Відсутні дані",
        description: "Будь ласка, заповніть всі обов'язкові поля та додайте хоча б один тег.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload image if present
      const imageUrl = await uploadImage();
      
      if (!imageUrl && !isEditing) {
        toast({
          title: "Відсутнє зображення",
          description: "Будь ласка, завантажте зображення для проекту.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      const projectData = {
        title: formData.title,
        description: formData.description,
        image_url: imageUrl || previewImage,
        demo_url: formData.demoUrl || null,
        repo_url: formData.repoUrl || null,
        tags: tags.map(tag => tag.text),
        featured: formData.featured
      };
      
      if (isEditing && id) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', id);
        
        if (error) throw error;
        
        toast({
          title: "Проект оновлено!",
          description: "Ваш проект було успішно оновлено.",
        });
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert([{
            ...projectData,
            id: uuidv4(),
            created_at: new Date().toISOString()
          }]);
        
        if (error) throw error;
        
        toast({
          title: "Проект додано!",
          description: "Ваш новий проект було успішно додано.",
        });
      }
      
      // Navigate to admin projects page
      navigate('/admin/projects');
    } catch (error: any) {
      console.error('Error saving project:', error);
      toast({
        title: "Помилка збереження",
        description: error.message || "Не вдалося зберегти проект.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-16 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center flex items-center justify-center">
          <Flag className="mr-3 text-blue-500" />
          {isEditing ? 'Редагувати проект' : 'Додати новий проект'}
        </h1>
        <p className="text-foreground/80 max-w-3xl mx-auto text-center mb-12">
          {isEditing 
            ? 'Оновіть інформацію про ваш проект нижче.' 
            : 'Заповніть форму нижче, щоб додати новий проект до свого портфоліо.'}
        </p>
      </div>
      <main className="flex-grow">
        <section className="section-padding">
          <div className="container mx-auto px-4 max-w-3xl">
            <Card className="animate-scale-up">
              <CardHeader>
                <CardTitle>{isEditing ? 'Редагувати проект' : 'Додати новий проект'}</CardTitle>
                <CardDescription>
                  {isEditing 
                    ? 'Внесіть зміни до свого проекту.' 
                    : 'Додайте свою останню роботу до свого портфоліо.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form id="edit-project-form" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Назва проекту <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Наприклад, E-Commerce Platform"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Опис <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Опишіть ваш проект, його функції та використані технології..."
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Зображення проекту <span className="text-destructive">*</span>
                      </label>
                      <div className="border rounded-md p-4">
                        {previewImage ? (
                          <div className="relative">
                            <img 
                              src={previewImage} 
                              alt="Попередній перегляд проекту" 
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
                            <p className="text-sm text-muted-foreground mb-2">Перетягніть або натисніть для завантаження</p>
                            <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                              Вибрати зображення
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
                        <span>Теги <span className="text-destructive">*</span></span>
                        <span className="text-muted-foreground text-xs">{tags.length}/10</span>
                      </label>
                      <div className="flex items-center">
                        <Input
                          id="tags"
                          value={tagInput}
                          onChange={handleTagInputChange}
                          onKeyDown={handleTagKeyDown}
                          placeholder="Наприклад, React, Node.js (натисніть Enter для додавання)"
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
                          URL демо
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
                          URL репозиторію
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
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4"
                          checked={formData.featured}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            featured: e.target.checked
                          }))}
                        />
                        Рекомендований проект
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Рекомендовані проекти будуть виділені у вашому портфоліо
                      </p>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/admin/projects')}
                  disabled={isSubmitting}
                >
                  Скасувати
                </Button>
                <Button 
                  type="submit" 
                  form="edit-project-form" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" /> 
                      {isEditing ? 'Оновлення...' : 'Збереження...'}
                    </>
                  ) : (
                    <>
                      {isEditing ? 'Оновити проект' : 'Додати проект'}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EditProjectPage;
