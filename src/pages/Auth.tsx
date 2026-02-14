import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Bienvenue !", description: "Connexion réussie." });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast({
          title: "Compte créé !",
          description: "Vérifiez votre email pour confirmer votre inscription.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground text-sm font-body hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </button>

        <div className="border border-border bg-card p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="h-6 w-6 text-primary" />
            <span className="font-heading text-xl font-semibold tracking-wider text-foreground">
              CHRONOS
            </span>
          </div>

          <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
            {isLogin ? "Connexion" : "Créer un compte"}
          </h1>
          <p className="text-muted-foreground text-sm font-body mb-8">
            {isLogin
              ? "Accédez à votre espace voyageur temporel."
              : "Rejoignez l'élite des voyageurs temporels."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-secondary text-foreground border border-border px-4 py-3 text-sm font-body outline-none focus:border-primary transition-colors"
                  placeholder="Votre nom"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-secondary text-foreground border border-border px-4 py-3 text-sm font-body outline-none focus:border-primary transition-colors"
                placeholder="vous@exemple.com"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-secondary text-foreground border border-border px-4 py-3 text-sm font-body outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-widest uppercase font-body hover:shadow-gold transition-all duration-500 disabled:opacity-50"
            >
              {loading ? "Chargement..." : isLogin ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground font-body mt-6">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              {isLogin ? "Créer un compte" : "Se connecter"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
