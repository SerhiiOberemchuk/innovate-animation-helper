
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddProject from "@/components/AddProject";

const AddProjectPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-16 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Додати новий проект</h1>
        <p className="text-foreground/80 max-w-3xl mx-auto text-center mb-12">
          Додайте свій новий проект до портфоліо.
          Заповніть форму нижче, щоб створити новий запис проекту.
        </p>
      </div>
      <main className="flex-grow">
        <AddProject />
      </main>
      <Footer />
    </div>
  );
};

export default AddProjectPage;
