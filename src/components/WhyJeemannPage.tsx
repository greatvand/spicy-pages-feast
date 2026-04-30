import { motion } from "framer-motion";
import BookPage from "./BookPage";

const pillars = [
  {
    glyph: "✦",
    title: "Intimate by design",
    desc: "No buffets. No banquets. Just a long table, candlelight, and food cooked with intention.",
  },
  {
    glyph: "❋",
    title: "Stories on every plate",
    desc: "Every host has a why. A grandmother's recipe. A region forgotten. A craft kept alive.",
  },
  {
    glyph: "✺",
    title: "Strangers, then family",
    desc: "You arrive alone or with one friend. You leave with a table full of them.",
  },
];

const WhyJeemannPage = () => {
  return (
    <BookPage pageNumber={3} isActive={true}>
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-accent text-sm italic text-muted-foreground tracking-widest uppercase mb-3">
              Chapter Three
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why <span className="text-gradient-spice">Jeemann</span>
            </h2>

            <blockquote className="font-accent text-lg md:text-xl italic text-muted-foreground leading-relaxed max-w-xl mx-auto border-l-2 border-primary/40 pl-6 text-left">
              "Jeemann" — to dine, to savour, to be fed with love. In a world of
              dark kitchens and silent meals, we believe the most radical thing you
              can do is sit at a stranger's table and break bread.
            </blockquote>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-6 rounded-lg bg-card/40 border border-border/40"
              >
                <div className="font-display text-4xl text-saffron mb-4">{p.glyph}</div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="font-accent text-center text-sm italic text-muted-foreground/50 mt-12"
          >
            Now — turn the page. The kitchens are waiting.
          </motion.p>
        </div>
      </div>
    </BookPage>
  );
};

export default WhyJeemannPage;