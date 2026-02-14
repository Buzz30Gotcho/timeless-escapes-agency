import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4 text-sm tracking-[0.4em] uppercase text-primary font-body"
        >
          Voyages Temporels de Luxe
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight"
        >
          <span className="text-foreground">Voyagez Au-Delà</span>
          <br />
          <span className="text-gradient-gold italic">Du Temps</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-6 max-w-lg text-muted-foreground font-body text-base md:text-lg leading-relaxed"
        >
          Découvrez les plus grands moments de l'Histoire. 
          Paris 1889, le Crétacé, Florence 1504 — trois époques, une expérience inoubliable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a href="#destinations" className="bg-primary text-primary-foreground px-10 py-4 text-sm tracking-widest uppercase font-body hover:shadow-gold transition-all duration-500">
            Explorer les Époques
          </a>
          <button onClick={() => navigate(user ? "/dashboard" : "/auth")} className="border border-border text-foreground px-10 py-4 text-sm tracking-widest uppercase font-body hover:border-primary hover:text-primary transition-all duration-500">
            Réserver un Voyage
          </button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
