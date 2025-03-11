
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-16 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Contact Me</h1>
        <p className="text-foreground/80 max-w-3xl mx-auto text-center mb-12">
          Let's connect! Whether you're looking to collaborate on a project or just want to say hello,
          I'd love to hear from you.
        </p>
      </div>
      <main className="flex-grow">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
