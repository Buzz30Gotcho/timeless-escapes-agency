import { Clock, MapPin, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* Decorative top line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand & tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-heading text-lg font-semibold tracking-wider text-foreground">
                TimeLess Escapes
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
              Voyagez à travers les époques. Des expériences immersives uniques au cœur de l'Histoire.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Paris, France — Depuis 2024
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Explorer
            </h4>
            <div className="h-px w-8 bg-primary/40" />
            <ul className="space-y-2.5 text-sm font-body text-muted-foreground">
              <li>
                <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">
                  Accueil
                </button>
              </li>
              <li>
                <a href="/destination/paris-1889" className="hover:text-primary transition-colors">
                  Paris — 1889
                </a>
              </li>
              <li>
                <a href="/destination/cretaceous" className="hover:text-primary transition-colors">
                  Ère du Crétacé
                </a>
              </li>
              <li>
                <a href="/destination/florence-1504" className="hover:text-primary transition-colors">
                  Florence — 1504
                </a>
              </li>
              {user && (
                <li>
                  <button onClick={() => navigate("/dashboard")} className="hover:text-primary transition-colors">
                    Mon Espace
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Contact
            </h4>
            <div className="h-px w-8 bg-primary/40" />
            <ul className="space-y-2.5 text-sm font-body text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary/70" />
                contact@timeless-escapes.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary/70" />
                +33 1 42 00 00 00
              </li>
              {!user && (
                <li>
                  <button
                    onClick={() => navigate("/auth")}
                    className="mt-2 inline-block border border-primary text-primary px-5 py-2 text-xs tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Rejoindre l'aventure
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 TimeLess Escapes Agency — Tous droits réservés
          </p>
          <p className="text-xs text-muted-foreground font-body">
            Développé par{" "}
            <a
              href="https://github.com/Buzz30Gotcho?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              Frédéric Makha Sar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
