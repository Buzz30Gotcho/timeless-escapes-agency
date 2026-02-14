import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationCards from "@/components/DestinationCards";
import WhyChronos from "@/components/WhyChronos";
import ChatbotWidget from "@/components/ChatbotWidget";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DestinationCards />
      <WhyChronos />
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

export default Index;
