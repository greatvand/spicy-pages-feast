import { motion } from "framer-motion";
import { Search, CalendarCheck, Utensils } from "lucide-react";
import BookPage from "./BookPage";

const steps = [
  {
    icon: Search,
    title: "Discover",
    desc: "Browse curated supper clubs across India — by cuisine, city, or the story behind the table.",
  },
  {
    icon: CalendarCheck,
    title: "Reserve",
    desc: "Pick a date, claim your seat. Most pop-ups host just 12–20 guests — book before they're gone.",
  },
  {
    icon: Utensils,
    title: "Belong",
    desc: "Show up hungry. Leave with new friends, full bellies, and a story worth telling.",
  },
];

const HowItWorksPage = () => {
  return (
    <BookPage pageNumber={2} isActive={true}>
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-accent text-sm italic text-muted-foreground tracking-widest uppercase mb-3">
              Chapter Two
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How it <span className="text-gradient-spice">works</span>
            </h2>
            <div className="w-16 h-px bg-primary/40 mx-auto" />
          </motion.div>

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 rounded-full spice-gradient flex items-center justify-center shadow-lg">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-primary/40 flex items-center justify-center font-accent text-xs italic text-primary">
                    {i + 1}
                  </span>
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4 mt-16"
          >
            <div className="w-12 h-px bg-primary/30" />
            <span className="font-accent text-sm italic text-muted-foreground/60">
              three steps to a seat at the table
            </span>
            <div className="w-12 h-px bg-primary/30" />
          </motion.div>
        </div>
      </div>
    </BookPage>
  );
};

export default HowItWorksPage;