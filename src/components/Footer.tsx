import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-heading text-lg font-semibold tracking-wider text-foreground">
                TimeLess Escapes Agency
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Pionniers du voyage temporel depuis 2024. Le temps est le luxe ultime.
            </p>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Destinations
            </h4>
            <ul className="space-y-3">
              <li><a href="/destination/paris-1889" className="text-sm text-muted-foreground font-body hover:text-primary transition-colors">Paris 1889</a></li>
              <li><a href="/destination/cretaceous" className="text-sm text-muted-foreground font-body hover:text-primary transition-colors">Crétacé</a></li>
              <li><a href="/destination/florence-1504" className="text-sm text-muted-foreground font-body hover:text-primary transition-colors">Florence 1504</a></li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Entreprise
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground font-body hover:text-primary transition-colors">À Propos</a></li>
              <li><a href="#contact" className="text-sm text-muted-foreground font-body hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Compte */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Compte
            </h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => navigate("/auth")} className="text-sm text-muted-foreground font-body hover:text-primary transition-colors">
                  Connexion
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/auth")} className="text-sm text-muted-foreground font-body hover:text-primary transition-colors">
                  Inscription
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 TimeLess Escapes Agency. Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground font-body">
            Développé par{" "}
            <a
              href="https://github.com/Buzz30Gotcho?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
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
