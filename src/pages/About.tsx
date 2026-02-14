import { motion } from "framer-motion";
import { Github, Linkedin, Code2, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const techStack = ["React", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion", "Vite"];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto space-y-12"
        >
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              À propos
            </h1>
            <div className="h-[2px] w-16 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          {/* Bio */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Frédéric Makha Sar
              </h2>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed">
              Développeur Full Stack passionné par la création d'expériences web modernes et immersives.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              <strong className="text-foreground">TimeLess Escapes Agency</strong> est un projet vitrine 
              conçu pour démontrer mes compétences en développement web. Il combine ma passion pour 
              l'Histoire et le voyage avec les technologies modernes du web pour offrir une expérience 
              utilisateur unique et engageante.
            </p>
          </motion.section>

          {/* Tech Stack */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Technologies
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="border border-primary/30 text-primary px-4 py-1.5 text-xs font-body tracking-wider uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Links */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4"
          >
            <a
              href="https://github.com/Buzz30Gotcho?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-primary text-primary px-6 py-3 text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/frederic-sar-a377061a3/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-primary text-primary px-6 py-3 text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </motion.section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
