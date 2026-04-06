import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BookCover from "@/components/BookCover";
import IntroPage from "@/components/IntroPage";
import CuisinePage from "@/components/CuisinePage";
import SupperClubInfo from "@/components/SupperClubInfo";
import { cuisineCategories } from "@/data/listings";

const Index = () => {
  const [isBookOpen, setIsBookOpen] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence>
        {!isBookOpen && (
          <BookCover onOpen={() => setIsBookOpen(true)} isOpen={isBookOpen} />
        )}
      </AnimatePresence>

      {isBookOpen && (
        <main className="relative">
          <IntroPage />
          {cuisineCategories.map((category) => (
            <CuisinePage key={category.pageNumber} {...category} />
          ))}
          <SupperClubInfo />
        </main>
      )}
    </div>
  );
};

export default Index;
