import { motion } from "framer-motion";
import { Shield, Clock, Gem, Users } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Sécurité Absolue",
    description:
      "Notre technologie quantique garantit un retour stable à 99,99%. Chaque voyage est supervisé par nos ingénieurs temporels certifiés.",
  },
  {
    icon: Clock,
    title: "Précision Temporelle",
    description:
      "Arrivez à la seconde près dans l'époque de votre choix. Notre calibrage temporel est le plus précis de l'industrie.",
  },
  {
    icon: Gem,
    title: "Expérience Sur Mesure",
    description:
      "Chaque voyage est personnalisé : tenues d'époque, guide personnel, accès exclusifs aux événements historiques majeurs.",
  },
  {
    icon: Users,
    title: "Concierge Dédié",
    description:
      "Un concierge temporel vous accompagne avant, pendant et après votre voyage pour une expérience sans souci.",
  },
];

const WhyChronos = () => {
  return (
    <section className="py-24 md:py-32 px-6 border-t border-border">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.4em] uppercase font-body mb-3">
            L'Excellence Temporelle
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            Pourquoi Choisir Chronos ?
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-2xl mx-auto">
            Depuis 2024, nous repoussons les limites du voyage temporel pour offrir des expériences inoubliables en toute sécurité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="border border-border bg-card p-8 text-center group hover:border-primary/40 transition-all duration-500"
            >
              <div className="h-14 w-14 mx-auto mb-5 flex items-center justify-center border border-primary/30 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                <reason.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChronos;
