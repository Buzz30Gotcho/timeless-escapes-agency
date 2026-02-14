import { motion } from "framer-motion";
import { Globe, Compass, HeartHandshake, Headphones } from "lucide-react";

const reasons = [
  {
    icon: Globe,
    title: "Destinations Uniques",
    description:
      "Des voyages soigneusement sélectionnés vers des lieux et des époques extraordinaires. Chaque destination est une expérience culturelle inoubliable.",
  },
  {
    icon: Compass,
    title: "Itinéraires Sur Mesure",
    description:
      "Chaque voyage est personnalisé selon vos envies : visites privées, rencontres exclusives et accès privilégiés aux sites les plus emblématiques.",
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement Premium",
    description:
      "Des guides experts passionnés vous accompagnent tout au long de votre séjour pour une immersion authentique et enrichissante.",
  },
  {
    icon: Headphones,
    title: "Conciergerie 24/7",
    description:
      "Un concierge dédié à votre disposition avant, pendant et après votre voyage pour une tranquillité d'esprit totale.",
  },
];

const WhyTimelessEscapesAgency = () => {
  return (
    <section id="experiences" className="py-24 md:py-32 px-6 border-t border-border">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.4em] uppercase font-body mb-3">
            Notre Engagement
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            Pourquoi Choisir TimeLess Escapes Agency ?
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-2xl mx-auto">
            Depuis 2024, nous créons des voyages d'exception alliant découverte culturelle, confort et service personnalisé.
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

export default WhyTimelessEscapesAgency;
