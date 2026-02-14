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
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group relative bg-card border border-border overflow-hidden hover:border-primary/40 transition-all duration-500 cursor-pointer"
              onClick={() => navigate(`/destination/${dest.id}`)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                  <span className="text-xs tracking-widest uppercase text-foreground border-b border-primary pb-0.5 hover:text-primary transition-colors duration-300 font-body">
                    Découvrir
                  </span>
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
