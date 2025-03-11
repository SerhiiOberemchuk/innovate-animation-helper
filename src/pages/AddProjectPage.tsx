
import Navbar from "@/components/Navbar";
import AddProject from "@/components/AddProject";
import Footer from "@/components/Footer";

const AddProjectPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-16 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Add New Project</h1>
        <p className="text-foreground/80 max-w-3xl mx-auto text-center mb-12">
          Showcase your latest work by adding it to your portfolio.
          Fill out the form below to create a new project entry.
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
