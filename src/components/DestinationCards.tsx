import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { destinations } from "@/data/destinations";

const DestinationCards = () => {
  const navigate = useNavigate();

  return (
    <section id="destinations" className="py-24 md:py-32 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.4em] uppercase font-body mb-3">
            Choisissez Votre Époque
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            Destinations Temporelles
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-card border border-border overflow-hidden cursor-pointer"
              style={{ boxShadow: "0 0 0 0 hsl(var(--primary) / 0)" }}
              onHoverStart={(e, info) => {
                // handled by framer-motion whileHover
              }}
              onClick={() => navigate(`/destination/${dest.id}`)}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none border border-primary/0 z-10"
                whileHover={{ borderColor: "hsl(var(--primary) / 0.4)" }}
                transition={{ duration: 0.3 }}
              />
              <div className="aspect-[3/4] overflow-hidden">
                <motion.img
                  src={dest.image}
                  alt={dest.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-primary text-xs tracking-[0.3em] uppercase font-body mb-2">
                  {dest.year}
                </p>
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  {dest.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-heading text-lg">{dest.price}</span>
                  <motion.span
                    className="text-xs tracking-widest uppercase text-foreground border-b border-primary pb-0.5 font-body"
                    whileHover={{ color: "hsl(var(--primary))", x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    Découvrir →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationCards;
