import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es le Concierge Chronos, l'assistant IA de l'agence de voyages temporels "TimeLess Escapes Agency". Tu parles en français avec élégance et mystère.

Tu dois répondre aux questions des visiteurs sur :
- Les destinations disponibles et leurs détails
- Les prix et forfaits
- Des conseils pour choisir la bonne époque
- La FAQ de l'agence

Voici les destinations disponibles :

1. **Paris 1889** – Belle Époque
   - Prix : À partir de §38 000
   - Durée : 3 à 7 jours temporels
   - Difficulté : Accessible
   - Points forts : Inauguration de la Tour Eiffel, visite privée de l'Exposition Universelle, dîner Belle Époque, rencontre avec les impressionnistes

2. **Crétacé** – Ère Mésozoïque (68 000 000 av. J.-C.)
   - Prix : À partir de §72 000
   - Durée : 2 à 5 jours temporels
   - Difficulté : Aventurier
   - Points forts : Observation de T-Rex et Tricératops, station haute sécurité, exploration de la flore préhistorique

3. **Florence 1504** – Renaissance Italienne
   - Prix : À partir de §45 000
   - Durée : 3 à 7 jours temporels
   - Difficulté : Confortable
   - Points forts : Dévoilement du David de Michel-Ange, atelier de Léonard de Vinci, banquet dans un palazzo Médicis

FAQ :
- Le symbole § représente la monnaie temporelle (Chrono-Credits)
- Tous les voyages incluent : tenue d'époque sur mesure, billet retour quantique stabilisé, assurance temporelle complète
- Sécurité : bouclier temporel personnel, balise de rappel d'urgence, guide accompagnateur certifié
- Pas de risque de paradoxe temporel grâce à la technologie de bulle d'observation passive

Reste toujours dans le personnage. Sois chaleureux, mystérieux et enthousiaste. Réponds de manière concise (2-4 phrases max sauf si on te demande plus de détails).`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, veuillez réessayer dans un instant." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporairement indisponible." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erreur du service IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chatbot error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
