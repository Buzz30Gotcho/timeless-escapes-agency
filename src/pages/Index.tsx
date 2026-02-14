import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationCards from "@/components/DestinationCards";
import WhyTimelessEscapesAgency from "@/components/WhyTimelessEscapesAgency";
import ChatbotWidget from "@/components/ChatbotWidget";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DestinationCards />
      <WhyTimelessEscapesAgency />
      <ChatbotWidget />
      <Footer />
    </div>
  );
};

export default Index;
