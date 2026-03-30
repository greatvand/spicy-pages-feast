import { motion } from "framer-motion";
import BookPage from "./BookPage";

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
            {/* Ornamental flourish */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-primary/30" />
              <div className="w-3 h-3 rotate-45 border border-primary/40" />
              <div className="w-16 h-px bg-primary/30" />
            </div>

            <p className="font-accent text-lg italic text-muted-foreground mb-4 tracking-wide">
              An Invitation
            </p>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8 leading-snug">
              Every dish tells a story.<br />
              <span className="text-gradient-spice">Every meal is a celebration.</span>
            </h2>

            <div className="w-px h-12 bg-primary/20 mx-auto mb-8" />

            <p className="font-body text-muted-foreground leading-loose max-w-lg mx-auto text-base">
              India's culinary heritage spans thousands of years, countless regions, 
              and infinite flavours. Our supper club is a love letter to this tradition — 
              intimate gatherings where we explore one region, one story, one magnificent 
              thali at a time.
            </p>

            <div className="flex items-center justify-center gap-4 mt-12">
              <div className="w-16 h-px bg-primary/30" />
              <div className="w-2 h-2 rounded-full bg-saffron/60" />
              <div className="w-16 h-px bg-primary/30" />
            </div>

            <p className="font-accent text-sm italic text-muted-foreground/50 mt-8">
              Turn the pages to discover our culinary chapters...
            </p>
          </motion.div>
        </div>
      </div>
    </BookPage>
  );
};

export default IntroPage;
