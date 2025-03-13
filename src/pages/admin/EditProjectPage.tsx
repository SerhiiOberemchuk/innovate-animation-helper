
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AddProject from '@/components/AddProject';

const EditProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-16 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Редагувати проект</h1>
        <p className="text-foreground/80 max-w-3xl mx-auto text-center mb-12">
          Оновіть інформацію про проект у своєму портфоліо.
          Відредагуйте форму нижче для внесення змін.
        </p>
      </div>
      <main className="flex-grow">
        <AddProject projectId={id} />
      </main>
      <Footer />
    </div>
  );
};

export default EditProjectPage;
