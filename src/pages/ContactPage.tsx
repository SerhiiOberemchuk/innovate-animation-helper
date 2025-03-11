
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Flag, Heart, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 pb-8 px-4 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Contact Me</h1>
        <p className="text-foreground/80 max-w-3xl mx-auto text-center mb-6">
          Let's connect! Whether you're looking to collaborate on a project or just want to say hello,
          I'd love to hear from you.
        </p>
        
        {/* Ukrainian and Italian elements */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-6 rounded-lg glassmorphism border border-primary/20 transition-transform hover:scale-105">
            <div className="w-full h-4 bg-gradient-to-r from-blue-500 to-blue-500 rounded-t-lg mb-1"></div>
            <div className="w-full h-4 bg-gradient-to-r from-yellow-400 to-yellow-400 rounded-b-lg mb-3"></div>
            <div className="flex items-center gap-2 mb-2">
              <Flag className="text-blue-500" />
              <span className="font-bold">Oberemchuk Serhii</span>
            </div>
            <p className="text-center text-sm mb-3">Proud Ukrainian Developer</p>
            <Heart className="text-blue-500 animate-pulse" />
          </div>
          
          <div className="flex flex-col items-center p-6 rounded-lg glassmorphism border border-primary/20 transition-transform hover:scale-105">
            <div className="w-full h-4 bg-gradient-to-r from-green-500 to-green-500 rounded-t-lg mb-1"></div>
            <div className="w-full h-4 bg-gradient-to-r from-white to-white rounded-m-lg mb-1"></div>
            <div className="w-full h-4 bg-gradient-to-r from-red-500 to-red-500 rounded-b-lg mb-3"></div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="text-red-500" />
              <span className="font-medium">Currently in Italy</span>
            </div>
            <p className="text-center text-sm">Working as a Full Stack Developer</p>
          </div>
        </div>
      </div>
      <main className="flex-grow">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
