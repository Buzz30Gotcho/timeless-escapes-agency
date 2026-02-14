import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Users, Calendar, Sparkles } from "lucide-react";
import type { Destination } from "@/data/destinations";

interface BookingFormProps {
  destination: Destination;
}

const options = [
  { id: "guide", label: "Guide personnel", price: "+§5 000" },
  { id: "vip", label: "Accès VIP exclusif", price: "+§8 000" },
  { id: "photo", label: "Photographe temporel", price: "+§3 000" },
  { id: "cuisine", label: "Expérience gastronomique", price: "+§4 000" },
];

const BookingForm = ({ destination }: BookingFormProps) => {
  const [travelers, setTravelers] = useState(1);
  const [date, setDate] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="sticky top-24 bg-card border border-border p-6 md:p-8">
      <h3 className="font-heading text-2xl text-foreground mb-2">Réserver ce voyage</h3>
      <p className="text-primary font-heading text-xl mb-6">{destination.price}</p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="h-14 w-14 bg-primary/20 flex items-center justify-center mx-auto mb-4 rounded-full">
              <Check className="h-7 w-7 text-primary" />
            </div>
            <h4 className="font-heading text-xl text-foreground mb-2">Réservation envoyée !</h4>
            <p className="text-muted-foreground font-body text-sm">
              Notre concierge temporel vous contactera sous 24h pour finaliser votre voyage vers {destination.title}.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
            {/* Date */}
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">
                <Calendar className="h-3.5 w-3.5 inline mr-1.5" />
                Date de départ
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-secondary text-foreground border border-border px-4 py-3 text-sm font-body outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Travelers */}
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">
                <Users className="h-3.5 w-3.5 inline mr-1.5" />
                Voyageurs
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="h-10 w-10 border border-border text-foreground hover:border-primary transition-colors font-heading"
                >
                  −
                </button>
                <span className="text-foreground font-heading text-lg w-8 text-center">{travelers}</span>
                <button
                  type="button"
                  onClick={() => setTravelers(Math.min(8, travelers + 1))}
                  className="h-10 w-10 border border-border text-foreground hover:border-primary transition-colors font-heading"
                >
                  +
                </button>
              </div>
            </div>

            {/* Options */}
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">
                <Sparkles className="h-3.5 w-3.5 inline mr-1.5" />
                Personnaliser
              </label>
              <div className="space-y-2">
                {options.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => toggleOption(opt.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-body border transition-all ${
                      selectedOptions.includes(opt.id)
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="text-primary text-xs">{opt.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-widest uppercase font-body hover:shadow-gold transition-all duration-500"
            >
              Demander une réservation
            </button>

            <p className="text-xs text-muted-foreground font-body text-center">
              Annulation gratuite jusqu'à 72h avant le départ
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingForm;
