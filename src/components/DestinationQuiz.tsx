import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { destinations } from "@/data/destinations";

type DestKey = "paris" | "cretaceous" | "florence";

interface Question {
  question: string;
  options: { label: string; scores: Record<DestKey, number> }[];
}

const questions: Question[] = [
  {
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: "Culturelle et artistique", scores: { paris: 1, cretaceous: 0, florence: 2 } },
      { label: "Aventure et nature", scores: { paris: 0, cretaceous: 2, florence: 0 } },
      { label: "Élégance et raffinement", scores: { paris: 2, cretaceous: 0, florence: 1 } },
    ],
  },
  {
    question: "Votre période préférée ?",
    options: [
      { label: "Histoire moderne (XIXe-XXe siècle)", scores: { paris: 2, cretaceous: 0, florence: 0 } },
      { label: "Temps anciens et origines", scores: { paris: 0, cretaceous: 2, florence: 0 } },
      { label: "Renaissance et classicisme", scores: { paris: 0, cretaceous: 0, florence: 2 } },
    ],
  },
  {
    question: "Vous préférez :",
    options: [
      { label: "L'effervescence urbaine", scores: { paris: 2, cretaceous: 0, florence: 1 } },
      { label: "La nature sauvage", scores: { paris: 0, cretaceous: 2, florence: 0 } },
      { label: "L'art et l'architecture", scores: { paris: 1, cretaceous: 0, florence: 2 } },
    ],
  },
  {
    question: "Votre activité idéale :",
    options: [
      { label: "Visiter des monuments", scores: { paris: 2, cretaceous: 0, florence: 1 } },
      { label: "Observer la faune", scores: { paris: 0, cretaceous: 2, florence: 0 } },
      { label: "Explorer des musées", scores: { paris: 1, cretaceous: 0, florence: 2 } },
    ],
  },
];

const destIdMap: Record<DestKey, string> = {
  paris: "paris-1889",
  cretaceous: "cretaceous",
  florence: "florence-1504",
};

const recommendations: Record<DestKey, string> = {
  paris:
    "Votre âme vibre au rythme de la Belle Époque ! Paris 1889 vous attend avec l'inauguration de la Tour Eiffel, les lumières de l'Exposition Universelle et l'élégance d'un dîner au champagne avec vue sur la Seine.",
  cretaceous:
    "L'aventurier en vous ne demande qu'à s'exprimer ! Le Crétacé vous promet une immersion unique au cœur de la nature préhistorique, face aux plus grandes créatures ayant foulé notre planète.",
  florence:
    "Vous avez l'âme d'un artiste de la Renaissance ! Florence 1504 vous ouvre les portes de l'atelier de Léonard de Vinci et vous offre le privilège d'assister au dévoilement du David de Michel-Ange.",
};

const DestinationQuiz = () => {
  const [step, setStep] = useState(0); // 0-3 = questions, 4 = result
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);
    setStep(step + 1);
  };

  const getResult = (): DestKey => {
    const scores: Record<DestKey, number> = { paris: 0, cretaceous: 0, florence: 0 };
    answers.forEach((ansIdx, qIdx) => {
      const option = questions[qIdx].options[ansIdx];
      (Object.keys(option.scores) as DestKey[]).forEach((k) => {
        scores[k] += option.scores[k];
      });
    });
    return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as DestKey;
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  const isResult = step >= questions.length;
  const resultKey = isResult ? getResult() : null;
  const resultDest = resultKey ? destinations.find((d) => d.id === destIdMap[resultKey]) : null;

  return (
    <div className="bg-card border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Compass className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg text-foreground">Trouvez votre destination idéale</h3>
      </div>

      {/* Progress bar */}
      {!isResult && (
        <div className="flex gap-1.5 mb-6">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 transition-colors duration-300 ${
                i < step ? "bg-primary" : i === step ? "bg-primary/50" : "bg-border"
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isResult ? (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">
              Question {step + 1}/{questions.length}
            </p>
            <h4 className="font-heading text-base text-foreground mb-4">
              {questions[step].question}
            </h4>
            <div className="space-y-2 mb-6">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left px-4 py-3 border text-sm font-body transition-all ${
                    selectedOption === i
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-sm tracking-wider uppercase font-body hover:shadow-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {step < questions.length - 1 ? "Suivant" : "Voir le résultat"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {resultDest && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-body uppercase tracking-wider">Votre destination idéale</span>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src={resultDest.image}
                    alt={resultDest.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-heading text-xl text-foreground">{resultDest.title}</h4>
                    <p className="text-sm text-primary font-body">{resultDest.price}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {recommendations[resultKey!]}
                </p>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 text-sm text-muted-foreground font-body hover:text-primary transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Refaire le quiz
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationQuiz;
