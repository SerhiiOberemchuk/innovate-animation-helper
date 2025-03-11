
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-16 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">My Projects</h1>
        <p className="text-foreground/80 max-w-3xl mx-auto text-center mb-12">
          Below is a showcase of my work. Each project represents a unique challenge and solution
          that demonstrates my skills, approach, and technical abilities.
        </p>
      </div>
      <main className="flex-grow">
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
