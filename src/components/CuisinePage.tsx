import { motion } from "framer-motion";
import BookPage from "./BookPage";
import SupperClubCard from "./SupperClubCard";
import type { SupperClubListing } from "@/types/supper-club";

interface CuisinePageProps {
  pageNumber: number;
  title: string;
  subtitle: string;
  tagline: string;
  headerImage: string;
  accentColor: string;
  listings: SupperClubListing[];
  reverse?: boolean;
}

const CuisinePage = ({
  pageNumber,
  title,
  subtitle,
  tagline,
  headerImage,
  accentColor,
  listings,
}: CuisinePageProps) => {
  return (
    <BookPage pageNumber={pageNumber} isActive={true}>
      <div className="min-h-screen">
        {/* Hero banner */}
        <div className="relative h-[35vh] md:h-[40vh] overflow-hidden">
          <img
            src={headerImage}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sand via-sand/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-0.5 w-20 mb-4" style={{ background: accentColor }} />
              <p className="font-accent text-base italic text-muted-foreground mb-1">
                {subtitle}
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
                {title}
              </h2>
              <p className="font-body text-sm text-muted-foreground/80 mt-2 max-w-lg">
                {tagline}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Listings section */}
        <div className="px-6 md:px-12 lg:px-16 py-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: accentColor }}
            />
            <p className="font-accent text-sm uppercase tracking-[0.2em] text-muted-foreground/60">
              {listings.length} Pop-ups Available
            </p>
            <div className="flex-1 h-px bg-border/50" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, i) => (
              <SupperClubCard
                key={listing.id}
                listing={listing}
                index={i}
                accentColor={accentColor}
              />
            ))}
          </div>
        </div>
      </div>
    </BookPage>
  );
};

export default CuisinePage;
