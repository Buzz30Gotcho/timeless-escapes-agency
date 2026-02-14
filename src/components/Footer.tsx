import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="font-heading text-sm font-semibold tracking-wider text-foreground">
            TimeLess Escapes Agency
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-body text-muted-foreground">
          <a href="/destination/paris-1889" className="hover:text-primary transition-colors">Paris 1889</a>
          <a href="/destination/cretaceous" className="hover:text-primary transition-colors">Crétacé</a>
          <a href="/destination/florence-1504" className="hover:text-primary transition-colors">Florence 1504</a>
          {user ? (
            <button onClick={() => navigate("/dashboard")} className="hover:text-primary transition-colors">
              Mon Espace
            </button>
          ) : (
            <button onClick={() => navigate("/auth")} className="hover:text-primary transition-colors">
              Créer un compte
            </button>
          )}
        </div>

        {/* Credits */}
        <p className="text-xs text-muted-foreground font-body">
          © 2026{" "}
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
    </footer>
  );
};

export default Footer;
