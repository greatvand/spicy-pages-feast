import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChefHat, Flame, UtensilsCrossed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/jeemann-logo.jpeg";

const STEPS = ["name", "email", "password"] as const;
type Step = (typeof STEPS)[number];

const stepLabels: Record<Step, string> = {
  name: "Who's knocking?",
  email: "Your invitation card",
  password: "The secret ingredient",
};

const stepIcons: Record<Step, React.ReactNode> = {
  name: <ChefHat className="w-5 h-5" />,
  email: <UtensilsCrossed className="w-5 h-5" />,
  password: <Flame className="w-5 h-5" />,
};

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [doorOpen, setDoorOpen] = useState(0); // 0 to 100
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isEntering, setIsEntering] = useState(false);

  const step = STEPS[currentStep];
  const filledSteps = STEPS.filter((s) => formData[s].length > 0).length;

  useEffect(() => {
    setDoorOpen(Math.min((filledSteps / STEPS.length) * 100, 100));
  }, [filledSteps]);

  const handleNext = () => {
    if (!formData[step]) return;
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((p) => p + 1);
    } else {
      // All fields complete — animate entry
      setIsEntering(true);
      setTimeout(() => navigate("/"), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleNext();
  };

  const doorAngle = (doorOpen / 100) * 75; // max 75deg perspective open

  return (
    <div className="min-h-screen bg-deep-maroon flex items-center justify-center overflow-hidden relative">
      {/* Ambient particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-saffron/40"
          initial={{ x: Math.random() * 400 - 200, y: Math.random() * 400, opacity: 0 }}
          animate={{
            y: [Math.random() * 600, -50],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}

      {/* Steam from kitchen */}
      <AnimatePresence>
        {doorOpen > 30 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: doorOpen / 200 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-saffron/10 rounded-full blur-3xl"
                style={{
                  width: 120 + i * 40,
                  height: 120 + i * 40,
                  left: `${40 + i * 5}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  y: [-20, -60],
                  opacity: [0.3, 0],
                  scale: [1, 1.5],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-entry animation */}
      <AnimatePresence>
        {isEntering && (
          <motion.div
            className="fixed inset-0 z-50 bg-saffron"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-center h-full flex-col gap-4">
              <motion.img
                src={logo}
                alt="Jeemann"
                className="w-32 h-auto rounded-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
              <motion.p
                className="font-display text-2xl text-deep-maroon font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Welcome to the kitchen!
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-lg mx-4">
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={logo} alt="Jeemann" className="w-28 h-auto rounded-xl" />
        </motion.div>

        {/* Kitchen Door Frame */}
        <div className="relative" style={{ perspective: "1000px" }}>
          {/* Door frame */}
          <div className="absolute -inset-3 border-4 border-copper/60 rounded-xl bg-copper/10" />
          <div className="absolute -inset-1 border-2 border-saffron/20 rounded-lg" />

          {/* Warm light from inside (visible as door opens) */}
          <motion.div
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{ opacity: doorOpen / 150 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-saffron/30 via-turmeric/20 to-tandoori/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.p
                className="font-accent text-xl italic text-saffron/60 text-center px-8"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {doorOpen < 50
                  ? "Something's cooking..."
                  : doorOpen < 90
                  ? "Almost there..."
                  : "The table is set!"}
              </motion.p>
            </div>
          </motion.div>

          {/* The Door (swings open based on progress) */}
          <motion.div
            className="relative rounded-lg overflow-hidden bg-gradient-to-b from-tandoori via-deep-maroon to-tandoori border border-copper/40 shadow-2xl"
            animate={{ rotateY: -doorAngle }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            style={{ transformOrigin: "left center" }}
          >
            {/* Door panel texture */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-4 border border-saffron/30 rounded-sm" />
              <div className="absolute inset-8 border border-saffron/15 rounded-sm" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-saffron/30" />
            </div>

            {/* Door handle */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-12 bg-saffron/40 rounded-full shadow-lg" />

            {/* Form content on the door */}
            <div className="relative z-10 p-8 md:p-10">
              {/* Progress bar */}
              <div className="flex gap-2 mb-8">
                {STEPS.map((s, i) => (
                  <motion.div
                    key={s}
                    className="h-1.5 flex-1 rounded-full overflow-hidden bg-copper/30"
                  >
                    <motion.div
                      className="h-full bg-saffron rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: i <= currentStep ? "100%" : formData[s] ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Step label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-saffron">{stepIcons[step]}</span>
                    <p className="font-accent text-sm text-saffron/70 uppercase tracking-widest">
                      Step {currentStep + 1} of {STEPS.length}
                    </p>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-saffron font-bold mb-6">
                    {stepLabels[step]}
                  </h2>

                  {/* Input */}
                  <div className="relative">
                    <Input
                      type={step === "password" ? (showPassword ? "text" : "password") : step === "email" ? "email" : "text"}
                      placeholder={
                        step === "name" ? "Your full name" : step === "email" ? "your@email.com" : "Create a password"
                      }
                      value={formData[step]}
                      onChange={(e) => setFormData((p) => ({ ...p, [step]: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      className="bg-deep-maroon/80 border-copper/40 text-saffron placeholder:text-copper/50 h-14 text-lg font-body focus-visible:ring-saffron/50 pr-12"
                    />
                    {step === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-copper/60 hover:text-saffron transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    )}
                  </div>

                  {/* Action button */}
                  <Button
                    onClick={handleNext}
                    disabled={!formData[step]}
                    className="w-full mt-6 h-14 text-lg font-display font-bold bg-saffron text-deep-maroon hover:bg-turmeric disabled:opacity-30 transition-all duration-300"
                  >
                    {currentStep < STEPS.length - 1 ? "Continue →" : "Enter the Kitchen 🍳"}
                  </Button>

                  {/* Back button */}
                  {currentStep > 0 && (
                    <button
                      onClick={() => setCurrentStep((p) => p - 1)}
                      className="w-full mt-3 text-sm text-copper/60 hover:text-saffron font-accent transition-colors"
                    >
                      ← Go back
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="font-accent text-sm text-copper/50">
                  Already a member?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-saffron hover:underline"
                  >
                    Walk right in
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          className="text-center mt-6 font-accent text-sm italic text-copper/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          meet · eat · belong
        </motion.p>
      </div>
    </div>
  );
};

export default Signup;
