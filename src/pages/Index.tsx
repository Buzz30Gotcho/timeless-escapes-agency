import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DestinationCards from "@/components/DestinationCards";
import BookingSection from "@/components/BookingSection";
import ChatbotWidget from "@/components/ChatbotWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DestinationCards />
      <BookingSection />
      <ChatbotWidget />

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-heading text-sm text-muted-foreground tracking-wider">
            © 2026 Chronos — Voyages Temporels
          </p>
          <p className="text-xs text-muted-foreground font-body tracking-widest uppercase">
            Le temps est le luxe ultime
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
