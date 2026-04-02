import { motion } from "framer-motion";
import heroGlobal from "@/assets/hero-global.jpg";
import logo from "@/assets/logo.png";

interface BookCoverProps {
  onOpen: () => void;
  isOpen: boolean;
}

const BookCover = ({ onOpen, isOpen }: BookCoverProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
      onClick={onOpen}
      animate={isOpen ? { opacity: 0, pointerEvents: "none" as const } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ pointerEvents: isOpen ? "none" : "auto" }}
    >
      <div className="absolute inset-0 bg-charcoal" />
      
      <motion.div
        className="relative w-[90vw] max-w-[600px] aspect-[3/4] rounded-r-lg overflow-hidden shadow-2xl"
        animate={isOpen ? { rotateY: -120, scale: 0.8 } : { rotateY: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ transformOrigin: "left center", perspective: 1200 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-wine to-charcoal" />
        <div className="absolute inset-4 border-2 border-warm-gold/40 rounded-sm" />
        <div className="absolute inset-6 border border-warm-gold/20 rounded-sm" />

        <div className="absolute inset-12 rounded-lg overflow-hidden">
          <img 
            src={heroGlobal} 
            alt="Global Supper Club" 
            className="w-full h-full object-cover opacity-60"
            width={1280}
            height={960}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            <img 
              src={logo} 
              alt="Jeemann - meet · eat · belong" 
              className="w-48 md:w-64 mx-auto mb-4 drop-shadow-lg"
            />
            <p className="font-accent text-xl md:text-2xl text-warm-gold/70 italic">
              Global Supper Clubs
            </p>
            <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-4" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity, repeatDelay: 2 }}
            className="font-body text-sm text-warm-gold/50 mt-8 tracking-widest uppercase"
          >
            Tap to open
          </motion.p>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/30 to-transparent" />
      </motion.div>
    </motion.div>
  );
};

export default BookCover;
