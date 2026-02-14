import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Clock } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const botResponses = [
  "Bienvenue, voyageur. Je serais ravi de vous aider à choisir l'époque parfaite pour votre voyage.",
  "Notre forfait Paris 1889 inclut un accès VIP à l'Exposition Universelle et une montée privée de la Tour Eiffel.",
  "Pour les amateurs de sensations fortes, le Crétacé offre une expérience unique d'observation des dinosaures en toute sécurité.",
  "Florence 1504 est idéale pour les passionnés d'art — vous pourrez assister au dévoilement du David de Michel-Ange.",
  "Tous les voyages incluent une tenue d'époque sur mesure et un billet retour quantique stabilisé. Souhaitez-vous une consultation avec un concierge ?",
];

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Bonsoir. Je suis votre concierge Chronos. Comment puis-je vous aider pour votre voyage temporel ?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseIndex = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: botResponses[responseIndex.current % botResponses.length],
        sender: "bot",
      };
      responseIndex.current++;
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center bg-primary text-primary-foreground shadow-gold transition-colors"
        style={{ borderRadius: "50%" }}
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 flex w-[360px] max-h-[500px] flex-col border border-border bg-card shadow-gold overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">Concierge Chronos</p>
                <p className="text-xs text-primary font-body">En ligne • Prêt à vous aider</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: 340 }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-sm font-body leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border p-3">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Posez votre question..."
                  className="flex-1 bg-secondary text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm font-body outline-none border border-border focus:border-primary transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground hover:shadow-gold transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
