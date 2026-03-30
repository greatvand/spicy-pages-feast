import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BookPageProps {
  children: ReactNode;
  pageNumber: number;
  isActive: boolean;
  direction?: "left" | "right";
}

const BookPage = ({ children, pageNumber, isActive }: BookPageProps) => {
  return (
    <motion.section
      className="min-h-screen book-page page-texture relative overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Page edge effect */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-foreground/10 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-foreground/5 to-transparent" />
      
      {/* Page number */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span className="font-accent text-muted-foreground/40 text-lg italic">{pageNumber}</span>
      </div>

      {children}
    </motion.section>
  );
};

export default BookPage;
