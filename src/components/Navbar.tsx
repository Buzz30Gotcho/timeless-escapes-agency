import { motion } from "framer-motion";
import { Clock, Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      // If not on homepage, navigate there first
      if (window.location.pathname !== "/") {
        navigate("/" + href);
      } else {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const links = [
    { label: "Destinations", href: "#destinations" },
    { label: "Expériences", href: "#experiences" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
          className="flex items-center gap-3"
        >
          <Clock className="h-6 w-6 text-primary" />
          <span className="font-heading text-xl font-semibold tracking-wider text-foreground">
            TimeLess Escapes Agency
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-body tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Basculer le thème"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {user ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm font-body tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Mon Espace
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 border border-primary text-primary px-6 py-2 text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="border border-primary text-primary px-6 py-2 text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Connexion
            </button>
          )}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-glass border-t border-border"
        >
          <div className="flex flex-col items-center gap-6 py-8">
            {links.map((item) => (
              <button
                key={item.label}
                onClick={() => { handleNavClick(item.href); setIsOpen(false); }}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Basculer le thème"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {user ? (
              <>
                <button
                  onClick={() => { navigate("/dashboard"); setIsOpen(false); }}
                  className="text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  Mon Espace
                </button>
                <button
                  onClick={() => { handleSignOut(); setIsOpen(false); }}
                  className="text-sm tracking-widest uppercase text-primary"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <button
                onClick={() => { navigate("/auth"); setIsOpen(false); }}
                className="text-sm tracking-widest uppercase text-primary"
              >
                Connexion
              </button>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
