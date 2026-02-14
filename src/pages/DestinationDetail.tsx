import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Shield, MapPin, Calendar } from "lucide-react";
import { destinations } from "@/data/destinations";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

const BookingCTA = ({ dest }: { dest: { title: string; price: string } }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="sticky top-24 bg-card border border-border p-6 md:p-8">
      <h3 className="font-heading text-2xl text-foreground mb-2">Réserver ce voyage</h3>
      <p className="text-primary font-heading text-xl mb-6">{dest.price}</p>
      <p className="text-muted-foreground font-body text-sm mb-6">
        {user
          ? "Accédez à votre espace pour réserver ce voyage et personnaliser votre expérience."
          : "Connectez-vous pour réserver ce voyage et accéder à votre espace voyageur."}
      </p>
      <button
        onClick={() => navigate(user ? "/dashboard" : "/auth")}
        className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-widest uppercase font-body hover:shadow-gold transition-all duration-500"
      >
        {user ? "Réserver depuis mon espace" : "Se connecter pour réserver"}
      </button>
    </div>
  );
};

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dest = destinations.find((d) => d.id === id);

  if (!dest) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-foreground mb-4">Destination introuvable</h1>
          <button onClick={() => navigate("/")} className="text-primary underline font-body">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img src={dest.image} alt={dest.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />

        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16">
          <div className="container mx-auto">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-primary font-body text-sm mb-6 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Retour aux destinations
            </motion.button>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary text-sm tracking-[0.4em] uppercase font-body mb-3"
            >
              {dest.era} — {dest.year}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-5xl md:text-7xl font-semibold text-foreground"
            >
              {dest.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="font-heading text-3xl text-foreground mb-6">À propos de ce voyage</h2>
              <p className="text-muted-foreground font-body leading-relaxed text-base">{dest.longDescription}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h3 className="font-heading text-2xl text-foreground mb-6">Points forts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dest.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground font-body text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Info cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="bg-card border border-border p-5 text-center">
                <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Durée</p>
                <p className="text-foreground font-heading text-sm">{dest.duration}</p>
              </div>
              <div className="bg-card border border-border p-5 text-center">
                <Shield className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Niveau</p>
                <p className="text-foreground font-heading text-sm">{dest.difficulty}</p>
              </div>
              <div className="bg-card border border-border p-5 text-center">
                <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Prix</p>
                <p className="text-primary font-heading text-sm">{dest.price}</p>
              </div>
            </motion.div>
          </div>

          {/* CTA sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <BookingCTA dest={dest} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
