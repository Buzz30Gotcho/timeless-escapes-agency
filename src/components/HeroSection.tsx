import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
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
          Luxury Time Travel Since 2024
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight"
        >
          <span className="text-foreground">Journey Beyond</span>
          <br />
          <span className="text-gradient-gold italic">Time Itself</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-6 max-w-lg text-muted-foreground font-body text-base md:text-lg leading-relaxed"
        >
          Experience history's greatest moments firsthand. 
          Curated temporal voyages for the discerning traveler.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button className="bg-primary text-primary-foreground px-10 py-4 text-sm tracking-widest uppercase font-body hover:shadow-gold transition-all duration-500">
            Explore Eras
          </button>
          <button className="border border-border text-foreground px-10 py-4 text-sm tracking-widest uppercase font-body hover:border-primary hover:text-primary transition-all duration-500">
            Our Story
          </button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
