import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Sparkles, Gift } from "lucide-react";
import type { SupperClubListing } from "@/types/supper-club";

interface SupperClubCardProps {
  listing: SupperClubListing;
  index: number;
  accentColor: string;
}

// Parse "Apr 12, 2026" -> { day: "12", month: "Apr" }
const parseDate = (date: string) => {
  const m = date.match(/^(\w+)\s+(\d+)/);
  return m ? { month: m[1].toUpperCase(), day: m[2] } : { month: "", day: "" };
};

const SupperClubCard = ({ listing, index, accentColor }: SupperClubCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { day, month } = parseDate(listing.date);
  const filledPct = Math.round(((listing.capacity - listing.spotsLeft) / listing.capacity) * 100);
  const issueNo = String(800 + index * 47 + listing.id.length * 13).slice(-3);
  const signature = listing.menuHighlights?.[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.55 }}
      className="relative flex flex-col md:flex-row min-h-[300px] overflow-hidden border shadow-2xl"
      style={{
        background: "hsl(var(--deep-maroon))",
        borderColor: "hsl(var(--saffron) / 0.25)",
      }}
    >
      {/* === STUB: Date & Coordinate === */}
      <div
        className="md:w-52 shrink-0 flex flex-col justify-between p-6 relative"
        style={{
          background: "rgba(0,0,0,0.32)",
          borderRight: "1.5px dashed hsl(var(--saffron) / 0.35)",
        }}
      >
        {/* perforation circles */}
        <span className="hidden md:block absolute -right-2 top-0 w-4 h-4 rounded-full bg-parchment" style={{ background: "hsl(var(--parchment))" }} />
        <span className="hidden md:block absolute -right-2 bottom-0 w-4 h-4 rounded-full bg-parchment" style={{ background: "hsl(var(--parchment))" }} />

        <div className="space-y-5">
          <div
            className="font-body text-[10px] uppercase tracking-[0.3em]"
            style={{ color: "hsl(var(--saffron) / 0.85)" }}
          >
            Issue No. {issueNo}
          </div>
          <div>
            <div className="font-display text-5xl leading-none text-primary-foreground">{day}</div>
            <div className="font-body text-[10px] uppercase tracking-widest text-primary-foreground/80 mt-1">
              {month} · {listing.time}
            </div>
          </div>
          <div className="pt-3 border-t border-primary-foreground/10">
            <div className="font-body text-[10px] uppercase tracking-widest text-primary-foreground/60 mb-1">
              Coordinate
            </div>
            <div className="font-body text-xs text-primary-foreground/90">{listing.location}</div>
          </div>
        </div>
        <div className="hidden md:block">
          <div
            className="text-[9px] uppercase tracking-[0.4em] origin-bottom-left -rotate-90 translate-x-3 whitespace-nowrap"
            style={{ color: "hsl(var(--saffron) / 0.4)" }}
          >
            Non-Transferable Passage
          </div>
        </div>
      </div>

      {/* === MAIN: Title, Story, Signature === */}
      <div className="flex-1 flex flex-col justify-between p-7">
        <div>
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex flex-wrap gap-1.5">
              {listing.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[9px] uppercase tracking-widest border"
                  style={{
                    color: "hsl(var(--saffron))",
                    borderColor: "hsl(var(--saffron) / 0.35)",
                    background: "hsl(var(--saffron) / 0.08)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="font-body text-[10px] uppercase tracking-widest text-primary-foreground/60 text-right">
              Host: {listing.host}
            </span>
          </div>

          <h3 className="font-display text-3xl md:text-4xl leading-[1.05] text-primary-foreground mb-4 text-balance">
            {listing.name}
          </h3>

          <p className="font-body text-sm leading-relaxed text-primary-foreground/70 max-w-prose mb-5">
            {listing.description}
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-primary-foreground/10 pt-4">
            {signature && (
              <div>
                <div className="font-body text-[9px] uppercase tracking-widest text-primary-foreground/40 mb-0.5">
                  Signature
                </div>
                <div className="font-body text-xs font-medium text-primary-foreground/90">{signature}</div>
              </div>
            )}
            <div>
              <div className="font-body text-[9px] uppercase tracking-widest text-primary-foreground/40 mb-0.5">
                Cuisine
              </div>
              <div className="font-body text-xs font-medium text-primary-foreground/90">{listing.cuisine}</div>
            </div>
          </div>

          {listing.story && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mt-4 font-accent italic text-sm underline underline-offset-4 decoration-dotted transition-colors"
              style={{ color: "hsl(var(--saffron) / 0.85)" }}
            >
              {isOpen ? "— close the passage —" : "— read the passage —"}
            </button>
          )}

          <AnimatePresence initial={false}>
            {isOpen && listing.story && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div
                  className="mt-4 p-5 border-l-2"
                  style={{
                    background: "rgba(0,0,0,0.25)",
                    borderColor: "hsl(var(--saffron) / 0.6)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3 h-3" style={{ color: "hsl(var(--saffron))" }} />
                    <span className="font-body text-[10px] uppercase tracking-widest text-primary-foreground/60">
                      The Story
                    </span>
                  </div>
                  <p className="font-accent italic text-sm leading-relaxed text-primary-foreground/85 mb-4">
                    "{listing.story}"
                  </p>
                  {listing.hostBio && (
                    <div className="mb-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <ChefHat className="w-3 h-3 text-primary-foreground/50" />
                        <span className="font-body text-[10px] uppercase tracking-widest text-primary-foreground/50">
                          About the Host
                        </span>
                      </div>
                      <p className="font-body text-xs text-primary-foreground/70 leading-relaxed">
                        {listing.hostBio}
                      </p>
                    </div>
                  )}
                  {listing.menuHighlights && listing.menuHighlights.length > 1 && (
                    <div>
                      <span className="font-body text-[10px] uppercase tracking-widest text-primary-foreground/50 block mb-1.5">
                        ✦ Full Menu
                      </span>
                      <ul className="space-y-1">
                        {listing.menuHighlights.map((m, i) => (
                          <li key={i} className="font-body text-xs text-primary-foreground/75 flex gap-2">
                            <span
                              className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                              style={{ background: "hsl(var(--saffron))" }}
                            />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* === GOLD ACTION PANEL === */}
      <div
        className="md:w-60 shrink-0 p-6 flex md:flex-col flex-row justify-between items-center md:items-stretch gap-4"
        style={{
          background: `linear-gradient(160deg, hsl(var(--saffron)), hsl(var(--turmeric)))`,
          color: "hsl(var(--foreground))",
        }}
      >
        <div>
          <div className="font-body text-[10px] uppercase font-bold tracking-widest opacity-70">
            Fare per seat
          </div>
          <div className="font-display text-3xl md:text-4xl tabular-nums leading-tight">
            {listing.price}
          </div>
        </div>
        <div className="md:space-y-3 md:w-full flex-1 md:flex-none">
          <div className="hidden md:flex justify-between text-[10px] font-bold uppercase tracking-tight">
            <span>Spots</span>
            <span className="tabular-nums">
              {String(listing.spotsLeft).padStart(2, "0")} / {String(listing.capacity).padStart(2, "0")}
            </span>
          </div>
          <div className="hidden md:block w-full h-1 bg-foreground/15">
            <div className="h-full bg-foreground" style={{ width: `${filledPct}%` }} />
          </div>
          <a
            href={listing.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 px-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-90"
            style={{
              background: "hsl(var(--deep-maroon))",
              color: "hsl(var(--saffron))",
            }}
          >
            Secure Passage
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default SupperClubCard;
