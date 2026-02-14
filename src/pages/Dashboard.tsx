import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, CalendarDays, PlaneTakeoff, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { destinations } from "@/data/destinations";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

type Tab = "profile" | "book" | "bookings";

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState<{ full_name: string | null; avatar_url: string | null }>({ full_name: null, avatar_url: null });
  const [bookings, setBookings] = useState<any[]>([]);
  const [profileLoading, setProfileLoading] = useState(true);

  // Booking form state
  const [selectedDest, setSelectedDest] = useState(destinations[0].id);
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Profile edit state
  const [editName, setEditName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [profileRes, bookingsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      if (profileRes.data) {
        setProfile(profileRes.data);
        setEditName(profileRes.data.full_name || "");
      }
      if (bookingsRes.data) setBookings(bookingsRes.data);
      setProfileLoading(false);
    };
    fetchData();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    const { error } = await supabase.from("profiles").update({ full_name: editName }).eq("user_id", user.id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setProfile((p) => ({ ...p, full_name: editName }));
      toast({ title: "Profil mis à jour !" });
    }
    setSavingProfile(false);
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
      options: selectedOptions,
    });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Réservation envoyée !", description: "Notre équipe vous contactera sous 24h." });
      setDate("");
      setTravelers(1);
      setSelectedOptions([]);
      // Refresh bookings
      const { data } = await supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (data) setBookings(data);
      setActiveTab("bookings");
    }
    setBookingLoading(false);
  };

  const toggleOption = (id: string) => setSelectedOptions((p) => p.includes(id) ? p.filter((o) => o !== id) : [...p, id]);

  const optionsList = [
    { id: "guide", label: "Guide personnel", price: "+§5 000" },
    { id: "vip", label: "Accès VIP exclusif", price: "+§8 000" },
    { id: "photo", label: "Photographe temporel", price: "+§3 000" },
    { id: "cuisine", label: "Expérience gastronomique", price: "+§4 000" },
  ];

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: "profile", label: "Profil", icon: User },
    { id: "book", label: "Réserver", icon: PlaneTakeoff },
    { id: "bookings", label: "Mes Voyages", icon: CalendarDays },
  ];

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <p className="text-muted-foreground font-body">Chargement...</p>
        </div>
      </div>
    );
  }

  const selectedDestData = destinations.find((d) => d.id === selectedDest)!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-2"
        >
          Bonjour, {profile.full_name || "Voyageur"} 👋
        </motion.h1>
        <p className="text-muted-foreground font-body mb-10">Gérez vos voyages et votre profil.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-body tracking-wider uppercase transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg space-y-6">
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">Email</label>
              <p className="text-foreground font-body bg-secondary border border-border px-4 py-3 text-sm">{user?.email}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">Nom complet</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-secondary text-foreground border border-border px-4 py-3 text-sm font-body outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="bg-primary text-primary-foreground px-8 py-3 text-sm tracking-widest uppercase font-body hover:shadow-gold transition-all duration-500 disabled:opacity-50"
            >
              {savingProfile ? "Enregistrement..." : "Enregistrer"}
            </button>
          </motion.div>
        )}

        {/* Book Tab */}
        {activeTab === "book" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
            {/* Destination selector */}
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-4">Sélectionnez une destination</p>
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setSelectedDest(dest.id)}
                  className={`w-full flex items-center gap-4 p-4 border transition-all text-left ${
                    selectedDest === dest.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <img src={dest.image} alt={dest.title} className="h-16 w-16 object-cover shrink-0" />
                  <div>
                    <h4 className="font-heading text-lg text-foreground">{dest.title}</h4>
                    <p className="text-xs text-muted-foreground font-body">{dest.era} — {dest.year}</p>
                    <p className="text-primary text-sm font-heading mt-1">{dest.price}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleBook} className="bg-card border border-border p-6 md:p-8 sticky top-24 space-y-5">
              <h3 className="font-heading text-2xl text-foreground mb-2">Réserver {selectedDestData.title}</h3>
              <p className="text-primary font-heading text-xl mb-6">{selectedDestData.price}</p>

              <div>
                <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">Date de départ</label>
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
                  <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="h-10 w-10 border border-border text-foreground hover:border-primary transition-colors font-heading">−</button>
                  <span className="text-foreground font-heading text-lg w-8 text-center">{travelers}</span>
                  <button type="button" onClick={() => setTravelers(Math.min(8, travelers + 1))} className="h-10 w-10 border border-border text-foreground hover:border-primary transition-colors font-heading">+</button>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-body uppercase tracking-wider block mb-2">Personnaliser</label>
                <div className="space-y-2">
                  {optionsList.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => toggleOption(opt.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-body border transition-all ${
                        selectedOptions.includes(opt.id) ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/40"
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
                disabled={bookingLoading}
                className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-widest uppercase font-body hover:shadow-gold transition-all duration-500 disabled:opacity-50"
              >
                {bookingLoading ? "Envoi en cours..." : "Demander une réservation"}
              </button>
              <p className="text-xs text-muted-foreground font-body text-center">Annulation gratuite jusqu'à 72h avant le départ</p>
            </form>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-16">
                <PlaneTakeoff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-body">Aucune réservation pour le moment.</p>
                <button onClick={() => setActiveTab("book")} className="text-primary underline font-body text-sm mt-2">Réserver un voyage</button>
              </div>
            ) : (
              bookings.map((b) => {
                const dest = destinations.find((d) => d.id === b.destination_id);
                return (
                  <div key={b.id} className="flex items-center gap-4 p-4 border border-border bg-card">
                    {dest && <img src={dest.image} alt={dest.title} className="h-16 w-16 object-cover shrink-0" />}
                    <div className="flex-1">
                      <h4 className="font-heading text-lg text-foreground">{dest?.title || b.destination_id}</h4>
                      <p className="text-xs text-muted-foreground font-body">
                        {new Date(b.departure_date).toLocaleDateString("fr-FR")} · {b.travelers} voyageur{b.travelers > 1 ? "s" : ""}
                      </p>
                    </div>
                    <span className={`text-xs font-body uppercase tracking-wider px-3 py-1 border ${
                      b.status === "confirmed" ? "border-green-500 text-green-400" : "border-primary text-primary"
                    }`}>
                      {b.status === "pending" ? "En attente" : b.status === "confirmed" ? "Confirmé" : b.status}
                    </span>
                  </div>
                );
              })
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
