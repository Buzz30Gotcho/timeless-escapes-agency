import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, PlaneTakeoff, Mail, Edit3, Check, MapPin, Calendar, Users, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { destinations } from "@/data/destinations";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profile, setProfile] = useState<{ full_name: string | null }>({ full_name: null });
  const [bookings, setBookings] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);

  const [selectedDest, setSelectedDest] = useState(destinations[0].id);
  const [showDescription, setShowDescription] = useState(false);
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchAll = async () => {
      const [p, b] = await Promise.all([
        supabase.from("profiles").select("full_name").eq("user_id", user.id).single(),
        supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      if (p.data) { setProfile(p.data); setEditName(p.data.full_name || ""); }
      if (b.data) setBookings(b.data);
      setDataLoading(false);
    };
    fetchAll();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ full_name: editName }).eq("user_id", user.id);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else { setProfile({ full_name: editName }); setEditing(false); toast({ title: "Profil mis à jour !" }); }
    setSaving(false);
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBookingLoading(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      destination_id: selectedDest,
      departure_date: date,
      travelers,
    });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Réservation envoyée !" });
      setDate("");
      setTravelers(1);
      const { data } = await supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (data) setBookings(data);
    }
    setBookingLoading(false);
  };

  const handleCancel = async (id: string) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast({ title: "Réservation annulée." });
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <p className="text-muted-foreground font-body animate-pulse">Chargement...</p>
        </div>
      </div>
    );
  }

  const selected = destinations.find((d) => d.id === selectedDest)!;
  const initials = (profile.full_name || "V")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          {/* ── Sidebar: Profile ── */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 lg:self-start space-y-6"
          >
            {/* Avatar + name */}
            <div className="bg-card border border-border p-6 text-center">
              <div className="h-20 w-20 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                <span className="font-heading text-2xl text-primary-foreground">{initials}</span>
              </div>
              {editing ? (
                <div className="flex items-center gap-2 justify-center">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    autoFocus
                    className="bg-secondary text-foreground border border-border px-3 py-1.5 text-sm font-body outline-none focus:border-primary w-full max-w-[180px]"
                  />
                  <button onClick={handleSave} disabled={saving} className="text-primary hover:text-primary/80">
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <h2 className="font-heading text-xl text-foreground">{profile.full_name || "Voyageur"}</h2>
                  <button onClick={() => setEditing(true)} className="text-muted-foreground hover:text-primary transition-colors">
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              <p className="text-xs text-muted-foreground font-body mt-1 flex items-center justify-center gap-1">
                <Mail className="h-3 w-3" /> {user?.email}
              </p>
            </div>

            {/* Stats */}
            <div className="bg-card border border-border p-5">
              <h4 className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-3">Statistiques</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-body">Voyages réservés</span>
                  <span className="text-primary font-heading text-lg">{bookings.length}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-body">En attente</span>
                  <span className="text-foreground font-heading">{bookings.filter((b) => b.status === "pending").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-body">Confirmés</span>
                  <span className="text-foreground font-heading">{bookings.filter((b) => b.status === "confirmed").length}</span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-card border border-border p-5">
              <h4 className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-3">Navigation</h4>
              <div className="space-y-2">
                <button onClick={() => navigate("/#destinations")} className="w-full text-left text-sm text-muted-foreground font-body hover:text-primary transition-colors flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" /> Voir les destinations
                </button>
                <button onClick={() => navigate("/#experiences")} className="w-full text-left text-sm text-muted-foreground font-body hover:text-primary transition-colors flex items-center gap-2">
                  <PlaneTakeoff className="h-3.5 w-3.5" /> Nos expériences
                </button>
              </div>
            </div>
          </motion.aside>

          {/* ── Main content ── */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Booking section */}
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-6">Réserver un voyage</h2>
              <form onSubmit={handleBook} className="bg-card border border-border p-6 space-y-6">
                {/* Destinations grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {destinations.map((d) => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => { setSelectedDest(d.id); setShowDescription(true); }}
                      className={`relative overflow-hidden border transition-all text-left group ${
                        selectedDest === d.id
                          ? "border-primary ring-1 ring-primary/30"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={d.image}
                          alt={d.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="font-heading text-sm text-foreground">{d.title}</p>
                        <p className="text-xs text-primary font-body">{d.price}</p>
                      </div>
                      {selectedDest === d.id && (
                        <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Selected destination description */}
                {showDescription && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="bg-secondary/50 border border-border px-4 py-3"
                  >
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      {selected.description}
                    </p>
                  </motion.div>
                )}

                {/* Date + travelers row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground font-body uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Calendar className="h-3.5 w-3.5" /> Date de départ
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full bg-secondary text-foreground border border-border px-4 py-3 text-sm font-body outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-body uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Users className="h-3.5 w-3.5" /> Voyageurs
                    </label>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="h-10 w-10 border border-border text-foreground hover:border-primary transition-colors font-heading">−</button>
                      <span className="text-foreground font-heading text-lg w-8 text-center">{travelers}</span>
                      <button type="button" onClick={() => setTravelers(Math.min(8, travelers + 1))} className="h-10 w-10 border border-border text-foreground hover:border-primary transition-colors font-heading">+</button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-widest uppercase font-body hover:shadow-gold transition-all duration-500 disabled:opacity-50"
                >
                  {bookingLoading ? "Envoi..." : `Réserver ${selected.title} →`}
                </button>
              </form>
            </div>

            {/* Bookings list */}
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-6">Mes voyages</h2>
              {bookings.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-border bg-card/50">
                  <PlaneTakeoff className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground font-body text-sm">Aucune réservation pour le moment</p>
                  <p className="text-muted-foreground/60 font-body text-xs mt-1">Choisissez une destination ci-dessus pour commencer</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b, i) => {
                    const dest = destinations.find((d) => d.id === b.destination_id);
                    return (
                      <motion.div
                        key={b.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-4 p-4 border border-border bg-card group hover:border-primary/30 transition-colors"
                      >
                        {dest && (
                          <img src={dest.image} alt={dest.title} className="h-14 w-14 object-cover shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading text-base text-foreground">{dest?.title || b.destination_id}</h4>
                          <p className="text-xs text-muted-foreground font-body">
                            {new Date(b.departure_date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} · {b.travelers} voyageur{b.travelers > 1 ? "s" : ""}
                          </p>
                        </div>
                        <span className={`text-xs font-body uppercase tracking-wider px-3 py-1 border shrink-0 ${
                          b.status === "confirmed" ? "border-green-500/50 text-green-400 bg-green-500/5" : "border-primary/50 text-primary bg-primary/5"
                        }`}>
                          {b.status === "pending" ? "En attente" : b.status === "confirmed" ? "Confirmé" : b.status}
                        </span>
                        <button
                          onClick={() => handleCancel(b.id)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all shrink-0"
                          title="Annuler"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
