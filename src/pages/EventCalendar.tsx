import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Clock, Users, ExternalLink, Sparkles, BookOpen } from "lucide-react";
import { cuisineCategories } from "@/data/listings";
import type { SupperClubListing } from "@/types/supper-club";
import { useNavigate } from "react-router-dom";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Flatten all listings with their accent color
const allListings = cuisineCategories.flatMap((cat) =>
  cat.listings.map((l) => ({ ...l, accentColor: cat.accentColor, cuisineCategory: cat.title }))
);

// Parse "Apr 12, 2026" into Date
function parseListingDate(dateStr: string): Date {
  return new Date(dateStr);
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// Build a map of date → listings
const listingsByDate = new Map<string, (SupperClubListing & { accentColor: string; cuisineCategory: string })[]>();
allListings.forEach((l) => {
  const d = parseListingDate(l.date);
  const k = dateKey(d);
  if (!listingsByDate.has(k)) listingsByDate.set(k, []);
  listingsByDate.get(k)!.push(l);
});

const EventCalendar = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(3); // April (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [firstDayOfWeek, daysInMonth]);

  const selectedKey = selectedDate ? dateKey(selectedDate) : null;
  const selectedListings = selectedKey ? listingsByDate.get(selectedKey) || [] : [];

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/60 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-display text-xl font-bold text-foreground hover:text-primary transition-colors">
            ← Jeemann
          </button>
          <h1 className="font-display text-lg font-semibold text-foreground">Event Calendar</h1>
          <div className="w-20" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm">
              {/* Month nav */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {MONTHS[currentMonth]} {currentYear}
                </h2>
                <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((d) => (
                  <div key={d} className="text-center font-body text-xs font-medium text-muted-foreground uppercase tracking-wider py-2">
                    {d}
                  </div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => {
                  if (day === null) return <div key={`empty-${i}`} />;
                  const d = new Date(currentYear, currentMonth, day);
                  const k = dateKey(d);
                  const events = listingsByDate.get(k) || [];
                  const hasEvents = events.length > 0;
                  const isSelected = selectedDate && dateKey(selectedDate) === k;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(d)}
                      className={`relative aspect-square flex flex-col items-center justify-center rounded-lg transition-all duration-200 text-sm font-body
                        ${isSelected ? "bg-primary text-primary-foreground shadow-md scale-105" : ""}
                        ${!isSelected && hasEvents ? "bg-muted/80 hover:bg-muted text-foreground font-semibold" : ""}
                        ${!isSelected && !hasEvents ? "text-muted-foreground hover:bg-muted/40" : ""}
                      `}
                    >
                      {day}
                      {hasEvents && (
                        <div className="flex gap-0.5 mt-0.5">
                          {events.slice(0, 3).map((e, ei) => (
                            <span key={ei} className="w-1.5 h-1.5 rounded-full" style={{ background: e.accentColor }} />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-4">
                {cuisineCategories.map((cat) => (
                  <div key={cat.title} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.accentColor }} />
                    <span className="font-body text-xs text-muted-foreground">{cat.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected date panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedDate ? (
                <motion.div
                  key={dateKey(selectedDate)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    {selectedDate.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    {selectedListings.length === 0
                      ? "No suppers scheduled for this date."
                      : `${selectedListings.length} supper${selectedListings.length > 1 ? "s" : ""} happening`}
                  </p>

                  <div className="space-y-4">
                    {selectedListings.map((listing) => (
                      <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border/60 rounded-lg overflow-hidden shadow-sm"
                      >
                        <div className="h-1.5 w-full" style={{ background: listing.accentColor }} />
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground/60">{listing.cuisineCategory}</span>
                              <h4 className="font-display text-base font-bold text-foreground leading-snug">{listing.name}</h4>
                              <p className="font-accent text-xs italic text-muted-foreground">by {listing.host}</p>
                            </div>
                            <span className="font-display text-base font-bold text-foreground shrink-0">{listing.price}</span>
                          </div>

                          <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">{listing.description}</p>

                          {/* Story toggle */}
                          {listing.story && (
                            <>
                              <button
                                onClick={() => setExpandedStory(expandedStory === listing.id ? null : listing.id)}
                                className="flex items-center gap-1.5 mb-2 group/s"
                              >
                                <BookOpen className="w-3 h-3 text-muted-foreground/60 group-hover/s:text-foreground transition-colors" />
                                <span className="font-accent text-xs italic text-muted-foreground/70 group-hover/s:text-foreground transition-colors underline underline-offset-2 decoration-dotted">
                                  {expandedStory === listing.id ? "Close story" : "Read the story"}
                                </span>
                              </button>
                              <AnimatePresence>
                                {expandedStory === listing.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-3 rounded-md bg-background/60 border border-border/30 mb-3">
                                      <div className="flex items-center gap-1 mb-1.5">
                                        <Sparkles className="w-3 h-3" style={{ color: listing.accentColor }} />
                                        <span className="font-display text-[10px] font-semibold uppercase tracking-wider text-foreground/60">Why This Dinner Is Special</span>
                                      </div>
                                      <p className="font-accent text-xs italic text-foreground/75 leading-relaxed">"{listing.story}"</p>
                                      {listing.menuHighlights && (
                                        <div className="mt-2 pt-2 border-t border-border/30">
                                          <span className="font-body text-[9px] uppercase tracking-wider text-muted-foreground/50">Menu Highlights</span>
                                          <ul className="mt-1 space-y-0.5">
                                            {listing.menuHighlights.map((m, mi) => (
                                              <li key={mi} className="font-body text-[11px] text-foreground/65 flex items-center gap-1">
                                                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: listing.accentColor }} />
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
                            </>
                          )}

                          <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground mb-3">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{listing.time}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{listing.location}</span>
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{listing.spotsLeft} spots left</span>
                          </div>

                          {/* Capacity bar */}
                          <div className="w-full h-1 rounded-full bg-muted mb-3">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${((listing.capacity - listing.spotsLeft) / listing.capacity) * 100}%`, background: listing.accentColor }}
                            />
                          </div>

                          <a
                            href={listing.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2 rounded-md font-body text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                            style={{ background: listing.accentColor }}
                          >
                            Reserve a Seat <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-64 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7 text-muted-foreground/40" />
                  </div>
                  <p className="font-display text-lg font-semibold text-foreground mb-1">Pick a date</p>
                  <p className="font-body text-sm text-muted-foreground max-w-[200px]">
                    Tap a date with coloured dots to see what suppers are cooking.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
