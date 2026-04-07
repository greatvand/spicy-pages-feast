import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ExternalLink, BookOpen, ChefHat, Sparkles } from "lucide-react";
import type { SupperClubListing } from "@/types/supper-club";

interface SupperClubCardProps {
  listing: SupperClubListing;
  index: number;
  accentColor: string;
}

const SupperClubCard = ({ listing, index, accentColor }: SupperClubCardProps) => {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const spotsPercentage = (listing.spotsLeft / listing.capacity) * 100;
  const isAlmostFull = spotsPercentage <= 25;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.5 }}
      className="group bg-card/80 border border-border/60 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-body font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-background/80 text-foreground/80 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Spots badge */}
        {isAlmostFull && (
          <span className="absolute top-3 right-3 text-[10px] font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground">
            Almost Full
          </span>
        )}

        {/* Price */}
        <div className="absolute bottom-3 right-3">
          <span className="font-display text-lg font-bold text-primary-foreground drop-shadow-md">
            {listing.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="font-accent text-xs italic text-muted-foreground mb-1">
          Hosted by {listing.host}
        </p>
        <h3 className="font-display text-lg font-bold text-foreground leading-snug mb-2">
          {listing.name}
        </h3>
        <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {listing.description}
        </p>

        {/* Story toggle */}
        {listing.story && (
          <button
            onClick={() => setIsStoryOpen(!isStoryOpen)}
            className="flex items-center gap-1.5 mb-3 group/story"
          >
            <BookOpen className="w-3.5 h-3.5 text-muted-foreground/70 group-hover/story:text-foreground transition-colors" />
            <span className="font-accent text-xs italic text-muted-foreground/70 group-hover/story:text-foreground transition-colors underline underline-offset-2 decoration-dotted">
              {isStoryOpen ? "Close the story" : "Why this dinner is special"}
            </span>
          </button>
        )}

        {/* Expandable story */}
        <AnimatePresence>
          {isStoryOpen && listing.story && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mb-4 p-3 rounded-md border border-border/40 bg-background/60">
                {/* The Story */}
                <div className="mb-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
                    <span className="font-display text-xs font-semibold uppercase tracking-wider text-foreground/70">The Story</span>
                  </div>
                  <p className="font-accent text-sm italic text-foreground/80 leading-relaxed">
                    "{listing.story}"
                  </p>
                </div>

                {/* Host bio */}
                {listing.hostBio && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ChefHat className="w-3 h-3 text-muted-foreground/60" />
                      <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground/60">About the Host</span>
                    </div>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">
                      {listing.hostBio}
                    </p>
                  </div>
                )}

                {/* Menu highlights */}
                {listing.menuHighlights && listing.menuHighlights.length > 0 && (
                  <div>
                    <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground/60 block mb-1.5">
                      ✦ Menu Highlights
                    </span>
                    <ul className="space-y-1">
                      {listing.menuHighlights.map((item, i) => (
                        <li key={i} className="font-body text-xs text-foreground/70 flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: accentColor }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Details */}
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-muted-foreground/60" />
            <span className="font-body text-[11px] text-muted-foreground">{listing.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-muted-foreground/60" />
            <span className="font-body text-[11px] text-muted-foreground">{listing.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-muted-foreground/60" />
            <span className="font-body text-[11px] text-muted-foreground truncate">{listing.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3 text-muted-foreground/60" />
            <span className="font-body text-[11px] text-muted-foreground">
              {listing.spotsLeft} of {listing.capacity} left
            </span>
          </div>
        </div>

        {/* Capacity bar */}
        <div className="w-full h-1 rounded-full bg-muted mb-4">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${100 - spotsPercentage}%`,
              background: accentColor,
            }}
          />
        </div>

        {/* RSVP Button */}
        <a
          href={listing.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md font-body text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          style={{ background: accentColor }}
        >
          Reserve a Seat
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
};

export default SupperClubCard;
