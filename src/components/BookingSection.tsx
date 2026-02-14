import { motion } from "framer-motion";
import { destinations } from "@/data/destinations";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BookingForm from "@/components/BookingForm";

const BookingSection = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(destinations[0].id);
  const selected = destinations.find((d) => d.id === selectedId)!;

  return (
    <section id="booking" className="py-24 md:py-32 px-6 border-t border-border">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.4em] uppercase font-body mb-3">
            Prêt à Partir ?
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            Réservez Votre Voyage
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Destination selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-4">
              Sélectionnez une destination
            </p>
            {destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => setSelectedId(dest.id)}
                className={`w-full flex items-center gap-4 p-4 border transition-all text-left ${
                  selectedId === dest.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="h-16 w-16 object-cover shrink-0"
                />
                <div>
                  <h4 className="font-heading text-lg text-foreground">{dest.title}</h4>
                  <p className="text-xs text-muted-foreground font-body">{dest.era} — {dest.year}</p>
                  <p className="text-primary text-sm font-heading mt-1">{dest.price}</p>
                </div>
              </button>
            ))}

            <button
              onClick={() => navigate(`/destination/${selectedId}`)}
              className="text-sm text-primary font-body underline underline-offset-4 mt-2"
            >
              Voir les détails de {selected.title} →
            </button>
          </motion.div>

          {/* Booking form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <BookingForm destination={selected} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
