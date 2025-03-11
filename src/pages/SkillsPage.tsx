
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

const SkillsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-16 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">My Skills</h1>
        <p className="text-foreground/80 max-w-3xl mx-auto text-center mb-12">
          I've developed a diverse set of skills throughout my career as a full stack developer.
          Here's a comprehensive overview of my technical expertise.
        </p>
      </div>
      <main className="flex-grow">
        <Skills />
      </main>
      <Footer />
    </div>
  );
};

export default SkillsPage;
