import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChefHat, X } from "lucide-react";
import { allListings, allCuisines, allCities } from "@/data/listings";
import SupperClubCard from "./SupperClubCard";

const SearchFilter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return allListings.filter((listing) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        listing.name.toLowerCase().includes(q) ||
        listing.host.toLowerCase().includes(q) ||
        listing.description.toLowerCase().includes(q) ||
        listing.city.toLowerCase().includes(q) ||
        listing.cuisine.toLowerCase().includes(q);
      const matchesCuisine = !selectedCuisine || listing.cuisine === selectedCuisine;
      const matchesCity = !selectedCity || listing.city === selectedCity;
      return matchesSearch && matchesCuisine && matchesCity;
    });
  }, [searchQuery, selectedCuisine, selectedCity]);

  const hasActiveFilters = searchQuery || selectedCuisine || selectedCity;

  return (
    <section className="px-6 md:px-12 lg:px-16 py-12 bg-background">
      {/* Search bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="Search by name, city, cuisine, or chef..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter chips */}
      <div className="max-w-4xl mx-auto mb-10 space-y-4">
        {/* Cuisine filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <ChefHat className="w-4 h-4" />
            <span className="font-body text-xs uppercase tracking-wider">Cuisine</span>
          </div>
          {allCuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(selectedCuisine === cuisine ? null : cuisine)}
              className={`px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all ${
                selectedCuisine === cuisine
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>

        {/* City filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <MapPin className="w-4 h-4" />
            <span className="font-body text-xs uppercase tracking-wider">City</span>
          </div>
          {allCities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(selectedCity === city ? null : city)}
              className={`px-3 py-1.5 rounded-full font-body text-xs font-medium transition-all ${
                selectedCity === city
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-body text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "experience" : "experiences"} found
          </span>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCuisine(null);
                setSelectedCity(null);
              }}
              className="font-body text-xs text-primary hover:underline"
            >
              Clear all filters
            </button>
          )}
          <div className="flex-1 h-px bg-border/50" />
        </div>

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((listing, i) => (
              <motion.div
                key={listing.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <SupperClubCard
                  listing={listing}
                  index={i}
                  accentColor="hsl(20, 80%, 52%)"
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-display text-2xl text-foreground mb-2">No matches found</p>
            <p className="font-body text-muted-foreground">Try adjusting your filters or search terms.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SearchFilter;
