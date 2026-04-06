import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Utensils, Calendar, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/jeemann-logo.jpeg";

const CUISINES = [
  { id: "north", label: "North Indian", emoji: "🫓", desc: "Butter chicken, dal makhani, naan" },
  { id: "south", label: "South Indian", emoji: "🍛", desc: "Dosas, sadyas, Chettinad spice" },
  { id: "coastal", label: "Coastal", emoji: "🦐", desc: "Malvani, Mangalorean, Goan" },
  { id: "street", label: "Street Food", emoji: "🥘", desc: "Chaat, pav bhaji, kebabs" },
  { id: "fusion", label: "Fusion", emoji: "🍱", desc: "Indo-Japanese, modern Indian" },
  { id: "desserts", label: "Mithai & Sweets", emoji: "🍮", desc: "Gulab jamun, kheer, jalebi" },
];

const CITIES = [
  { id: "mumbai", label: "Mumbai", emoji: "🌊" },
  { id: "delhi", label: "Delhi", emoji: "🏛️" },
  { id: "bangalore", label: "Bangalore", emoji: "🌿" },
  { id: "kolkata", label: "Kolkata", emoji: "🎭" },
  { id: "chennai", label: "Chennai", emoji: "🛕" },
  { id: "hyderabad", label: "Hyderabad", emoji: "🍗" },
  { id: "goa", label: "Goa", emoji: "🏖️" },
  { id: "jaipur", label: "Jaipur", emoji: "🏰" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const toggleItem = (id: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const steps = [
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "What makes your mouth water?",
      subtitle: "Pick your favourite cuisines — we'll curate pop-ups just for you",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Where do you feast?",
      subtitle: "Choose your cities — we'll find the best tables nearby",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "You're all set!",
      subtitle: "Your personalised supper club journey begins now",
    },
  ];

  const canProceed = step === 0 ? selectedCuisines.length > 0 : step === 1 ? selectedCities.length > 0 : true;

  return (
    <div className="min-h-screen bg-deep-maroon flex items-center justify-center overflow-hidden relative px-4">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-saffron"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <motion.div className="flex justify-center mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <img src={logo} alt="Jeemann" className="w-20 h-auto rounded-xl" />
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full"
              animate={{
                width: i === step ? 32 : 12,
                backgroundColor: i <= step ? "hsl(var(--saffron))" : "hsl(var(--copper) / 0.3)",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Card */}
        <motion.div
          className="bg-gradient-to-b from-tandoori/20 via-deep-maroon to-deep-maroon border border-copper/30 rounded-xl overflow-hidden shadow-2xl"
          layout
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              {/* Step header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-saffron">{steps[step].icon}</span>
                <p className="font-accent text-sm text-saffron/60 uppercase tracking-widest">
                  Step {step + 1} of {steps.length}
                </p>
              </div>
              <h2 className="font-display text-2xl text-saffron font-bold mb-1">
                {steps[step].title}
              </h2>
              <p className="font-body text-sm text-copper/70 mb-6">{steps[step].subtitle}</p>

              {/* Step 0: Cuisines */}
              {step === 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {CUISINES.map((c) => {
                    const selected = selectedCuisines.includes(c.id);
                    return (
                      <motion.button
                        key={c.id}
                        onClick={() => toggleItem(c.id, selectedCuisines, setSelectedCuisines)}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          selected
                            ? "border-saffron/60 bg-saffron/10"
                            : "border-copper/20 bg-deep-maroon/50 hover:border-copper/40"
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl">{c.emoji}</span>
                        <p className="font-display text-sm text-saffron font-semibold mt-1">{c.label}</p>
                        <p className="font-body text-xs text-copper/50 mt-0.5 line-clamp-1">{c.desc}</p>
                        {selected && (
                          <motion.div
                            layoutId={`check-${c.id}`}
                            className="absolute top-2 right-2 w-4 h-4 rounded-full bg-saffron flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <span className="text-deep-maroon text-xs">✓</span>
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Step 1: Cities */}
              {step === 1 && (
                <div className="grid grid-cols-2 gap-3">
                  {CITIES.map((c) => {
                    const selected = selectedCities.includes(c.id);
                    return (
                      <motion.button
                        key={c.id}
                        onClick={() => toggleItem(c.id, selectedCities, setSelectedCities)}
                        className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${
                          selected
                            ? "border-saffron/60 bg-saffron/10"
                            : "border-copper/20 bg-deep-maroon/50 hover:border-copper/40"
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-xl">{c.emoji}</span>
                        <p className="font-display text-sm text-saffron font-semibold">{c.label}</p>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Step 2: Complete */}
              {step === 2 && (
                <motion.div
                  className="text-center py-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: 2 }}
                    className="inline-block mb-4"
                  >
                    <Sparkles className="w-16 h-16 text-saffron" />
                  </motion.div>
                  <p className="font-body text-copper/70 text-sm mb-2">
                    {selectedCuisines.length} cuisines · {selectedCities.length} cities
                  </p>
                  <p className="font-accent text-lg italic text-saffron/60">
                    Your table awaits...
                  </p>
                </motion.div>
              )}

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                {step > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep((s) => s - 1)}
                    className="border-copper/30 text-copper hover:text-saffron hover:border-saffron/40 bg-transparent"
                  >
                    ← Back
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (step < steps.length - 1) setStep((s) => s + 1);
                    else navigate("/");
                  }}
                  disabled={!canProceed}
                  className="flex-1 h-12 font-display font-bold bg-saffron text-deep-maroon hover:bg-turmeric disabled:opacity-30"
                >
                  {step < steps.length - 1 ? (
                    <>Continue <ChevronRight className="w-4 h-4 ml-1" /></>
                  ) : (
                    "Start Exploring 🍽️"
                  )}
                </Button>
              </div>

              {step < 2 && (
                <button
                  onClick={() => navigate("/")}
                  className="w-full mt-3 text-xs text-copper/40 hover:text-copper/60 font-accent transition-colors"
                >
                  Skip for now
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="text-center mt-5 font-accent text-sm italic text-copper/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          meet · eat · belong
        </motion.p>
      </div>
    </div>
  );
};

export default Onboarding;
