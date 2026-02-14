import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, PlaneTakeoff, Mail, Edit3, Check } from "lucide-react";
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

  // Profile edit
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);

  // Booking form
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDest, setSelectedDest] = useState(destinations[0].id);
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const [p, b] = await Promise.all([
        supabase.from("profiles").select("full_name").eq("user_id", user.id).single(),
        supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      if (p.data) { setProfile(p.data); setEditName(p.data.full_name || ""); }
      if (b.data) setBookings(b.data);
      setDataLoading(false);
    };
    fetch();
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
      setShowBooking(false);
      setDate("");
      setTravelers(1);
      const { data } = await supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (data) setBookings(data);
    }
    setBookingLoading(false);
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <p className="text-muted-foreground font-body">Chargement...</p>
        </div>
      </div>
    );
  }

  const selected = destinations.find((d) => d.id === selectedDest)!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16 max-w-3xl">

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-primary/20 flex items-center justify-center rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                {editing ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    autoFocus
                    className="bg-secondary text-foreground border border-border px-3 py-1 text-sm font-body outline-none focus:border-primary"
                  />
                ) : (
                  <h2 className="font-heading text-xl text-foreground">{profile.full_name || "Voyageur"}</h2>
                )}
                <p className="text-xs text-muted-foreground font-body flex items-center gap-1">
                  <Mail className="h-3 w-3" /> {user?.email}
                </p>
              </div>
            </div>
            {editing ? (
              <button onClick={handleSave} disabled={saving} className="text-primary hover:text-primary/80">
                <Check className="h-5 w-5" />
              </button>
            ) : (
              <button onClick={() => setEditing(true)} className="text-muted-foreground hover:text-primary transition-colors">
                <Edit3 className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Action button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => setShowBooking(!showBooking)}
          className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-widest uppercase font-body hover:shadow-gold transition-all duration-500 mb-8"
        >
          {showBooking ? "Fermer" : "Réserver un voyage"}
        </motion.button>

        {/* Booking form */}
        {showBooking && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            onSubmit={handleBook}
            className="bg-card border border-border p-6 mb-8 space-y-5"
          >
            {/* Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {destinations.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setSelectedDest(d.id)}
                  className={`flex items-center gap-3 p-3 border text-left transition-all ${
                    selectedDest === d.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <img src={d.image} alt={d.title} className="h-10 w-10 object-cover shrink-0" />
                  <div>
                    <p className="font-heading text-sm text-foreground">{d.title}</p>
                    <p className="text-xs text-primary">{d.price}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Date + travelers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-secondary text-foreground border border-border px-4 py-3 text-sm font-body outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">Voyageurs</label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="h-10 w-10 border border-border text-foreground hover:border-primary font-heading">−</button>
                  <span className="text-foreground font-heading text-lg w-8 text-center">{travelers}</span>
                  <button type="button" onClick={() => setTravelers(Math.min(8, travelers + 1))} className="h-10 w-10 border border-border text-foreground hover:border-primary font-heading">+</button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={bookingLoading}
              className="w-full bg-primary text-primary-foreground py-3 text-sm tracking-widest uppercase font-body hover:shadow-gold transition-all disabled:opacity-50"
            >
              {bookingLoading ? "Envoi..." : "Confirmer la réservation"}
            </button>
          </motion.form>
        )}

        {/* Bookings list */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="font-heading text-lg text-foreground mb-4">Mes voyages</h3>
          {bookings.length === 0 ? (
            <div className="text-center py-12 border border-border bg-card">
              <PlaneTakeoff className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-body text-sm">Aucune réservation pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => {
                const dest = destinations.find((d) => d.id === b.destination_id);
                return (
                  <div key={b.id} className="flex items-center gap-4 p-4 border border-border bg-card">
                    {dest && <img src={dest.image} alt={dest.title} className="h-14 w-14 object-cover shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-base text-foreground">{dest?.title || b.destination_id}</h4>
                      <p className="text-xs text-muted-foreground font-body">
                        {new Date(b.departure_date).toLocaleDateString("fr-FR")} · {b.travelers} voyageur{b.travelers > 1 ? "s" : ""}
                      </p>
                    </div>
                    <span className={`text-xs font-body uppercase tracking-wider px-3 py-1 border shrink-0 ${
                      b.status === "confirmed" ? "border-green-500 text-green-400" : "border-primary text-primary"
                    }`}>
                      {b.status === "pending" ? "En attente" : b.status === "confirmed" ? "Confirmé" : b.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
