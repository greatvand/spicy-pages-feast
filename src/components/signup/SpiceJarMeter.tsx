import { motion, AnimatePresence } from "framer-motion";

interface SpiceJarMeterProps {
  password: string;
}

const getStrength = (password: string) => {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
};

const levels = [
  { label: "Mild", emoji: "🌿", color: "hsl(var(--spice-green))" },
  { label: "Warming", emoji: "🫚", color: "hsl(var(--turmeric))" },
  { label: "Spicy", emoji: "🌶️", color: "hsl(var(--tandoori))" },
  { label: "Fiery!", emoji: "🔥", color: "hsl(var(--destructive))" },
];

const SpiceJarMeter = ({ password }: SpiceJarMeterProps) => {
  const strength = getStrength(password);
  if (!password) return null;

  const level = levels[Math.max(strength - 1, 0)];
  const fillPercent = (strength / 4) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 mt-3"
    >
      {/* Spice Jar */}
      <div className="relative w-10 h-16 flex-shrink-0">
        {/* Jar body */}
        <div className="absolute bottom-0 left-1 right-1 h-12 rounded-b-md border-2 border-copper/50 bg-deep-maroon/30 overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 right-0 rounded-b-sm"
            animate={{ height: `${fillPercent}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            style={{ background: level.color }}
          />
          {/* Bubbles */}
          <AnimatePresence>
            {strength >= 3 && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{ background: level.color, left: `${20 + i * 25}%` }}
                    initial={{ bottom: 0, opacity: 0 }}
                    animate={{
                      bottom: ["10%", "80%"],
                      opacity: [0.8, 0],
                      scale: [1, 0.5],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
        {/* Jar lid */}
        <div className="absolute top-0 left-0 right-0 h-4 rounded-t-sm border-2 border-copper/60 bg-copper/40" />
      </div>

      {/* Label */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <motion.span
            key={strength}
            initial={{ scale: 1.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="text-lg"
          >
            {level.emoji}
          </motion.span>
          <motion.span
            key={level.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-accent text-sm font-semibold tracking-wide"
            style={{ color: level.color }}
          >
            {level.label}
          </motion.span>
        </div>
        {/* Dots */}
        <div className="flex gap-1 mt-1">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="h-1 flex-1 rounded-full"
              animate={{
                backgroundColor: i <= strength ? level.color : "hsl(var(--copper) / 0.3)",
              }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* Flame particles for max strength */}
      <AnimatePresence>
        {strength >= 4 && (
          <div className="relative w-6 h-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-saffron"
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-2, -20 - Math.random() * 10],
                  x: [0, (Math.random() - 0.5) * 12],
                  scale: [1, 0.3],
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.4,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SpiceJarMeter;
