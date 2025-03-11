
import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

const ExperiencePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-16 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Work Experience</h1>
        <p className="text-foreground/80 max-w-3xl mx-auto text-center mb-12">
          My professional journey as a developer, including roles, responsibilities,
          and the impact I've made at different organizations.
        </p>
      </div>
      <main className="flex-grow">
        <Experience />
      </main>
      <Footer />
    </div>
  );
};

export default ExperiencePage;
