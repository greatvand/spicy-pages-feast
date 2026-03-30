import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Utensils } from "lucide-react";
import BookPage from "./BookPage";

const features = [
  {
    icon: Calendar,
    title: "Monthly Gatherings",
    desc: "Every last Saturday, we celebrate a different regional cuisine of India.",
  },
  {
    icon: Utensils,
    title: "Authentic Recipes",
    desc: "Dishes passed down through generations, cooked with traditional techniques.",
  },
  {
    icon: Users,
    title: "Intimate Setting",
    desc: "Limited to 20 guests per evening for a truly personal experience.",
  },
  {
    icon: MapPin,
    title: "Rotating Venues",
    desc: "Beautiful heritage homes and courtyards across the city.",
  },
];

const SupperClubInfo = () => {
  return (
    <BookPage pageNumber={6} isActive={true}>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Join the Table
          </h2>
          <p className="font-accent text-xl italic text-muted-foreground">
            Where strangers become friends over shared plates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="flex gap-4 p-6 rounded-lg bg-card/60 border border-border/50"
            >
              <div className="w-12 h-12 rounded-full spice-gradient flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button className="spice-gradient font-body text-primary-foreground px-10 py-4 rounded-full text-lg font-medium tracking-wide hover:opacity-90 transition-opacity shadow-lg">
            Reserve Your Seat
          </button>
          <p className="font-accent text-sm text-muted-foreground/60 mt-4 italic">
            Next gathering: April 26, 2026 — Coastal Konkan
          </p>
        </motion.div>

        {/* Bottom ornament */}
        <div className="mt-16 flex items-center gap-3">
          <div className="w-12 h-px bg-border" />
          <span className="font-accent text-muted-foreground/40 text-sm italic">fin</span>
          <div className="w-12 h-px bg-border" />
        </div>
      </div>
    </BookPage>
  );
};

export default SupperClubInfo;
