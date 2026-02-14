import { Clock } from "lucide-react";

const footerLinks = {
  Destinations: [
    { label: "Paris 1889", href: "/destination/paris-1889" },
    { label: "Crétacé", href: "/destination/cretaceous" },
    { label: "Florence 1504", href: "/destination/florence-1504" },
  ],
  Entreprise: [
    { label: "À Propos", href: "#" },
    { label: "Carrières", href: "#" },
    { label: "Presse", href: "#" },
  ],
  Support: [
    { label: "Contact", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Conditions", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-heading text-lg font-semibold tracking-wider text-foreground">
                TimeLess Escapes
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Pionniers du voyage temporel depuis 2024. Le temps est le luxe ultime.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground font-body hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 TimeLess Escapes Agency. Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground font-body tracking-widest uppercase">
            Le temps est le luxe ultime
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
