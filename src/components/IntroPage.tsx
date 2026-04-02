import { motion } from "framer-motion";
import BookPage from "./BookPage";
import logo from "@/assets/logo.png";

const IntroPage = () => {
  return (
    <BookPage pageNumber={1} isActive={true}>
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-primary/30" />
              <div className="w-3 h-3 rotate-45 border border-primary/40" />
              <div className="w-16 h-px bg-primary/30" />
            </div>

            <img 
              src={logo} 
              alt="Jeemann" 
              className="w-36 mx-auto mb-6 drop-shadow-sm"
            />

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-snug">
              The world's table,<br />
              <span className="text-gradient-warm">one supper at a time.</span>
            </h2>

            <div className="w-px h-12 bg-primary/20 mx-auto mb-8" />

            <p className="font-body text-muted-foreground leading-loose max-w-lg mx-auto text-base">
              From Italian trattorias in New York to omakase counters in Tokyo,
              discover intimate pop-up dining experiences hosted by passionate chefs 
              and food collectives across the globe. Browse by cuisine, search your 
              city, and reserve a seat at the table.
            </p>

            <div className="flex items-center justify-center gap-4 mt-12">
              <div className="w-16 h-px bg-primary/30" />
              <div className="w-2 h-2 rounded-full bg-warm-gold/60" />
              <div className="w-16 h-px bg-primary/30" />
            </div>

            <p className="font-accent text-sm italic text-muted-foreground/50 mt-8">
              Scroll to explore cuisines and upcoming pop-ups...
            </p>
          </motion.div>
        </div>
      </div>
    </BookPage>
  );
};

export default IntroPage;
