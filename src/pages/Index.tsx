import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BookCover from "@/components/BookCover";
import IntroPage from "@/components/IntroPage";
import CuisinePage from "@/components/CuisinePage";
import SupperClubInfo from "@/components/SupperClubInfo";

import northIndian from "@/assets/north-indian.jpg";
import southIndian from "@/assets/south-indian.jpg";
import coastalIndian from "@/assets/coastal-indian.jpg";
import streetFood from "@/assets/street-food.jpg";

const cuisines = [
  {
    pageNumber: 2,
    title: "The Royal North",
    subtitle: "Chapter One",
    description:
      "From the tandoors of Punjab to the royal kitchens of Lucknow, North Indian cuisine is a symphony of rich gravies, fragrant biryanis, and bread baked in clay ovens. Every bite carries the weight of Mughal grandeur.",
    dishes: ["Butter Chicken", "Dum Biryani", "Dal Makhani", "Tandoori Roti", "Rogan Josh", "Galouti Kebab"],
    image: northIndian,
    accentColor: "hsl(8, 70%, 48%)",
  },
  {
    pageNumber: 3,
    title: "The Verdant South",
    subtitle: "Chapter Two",
    description:
      "Coconut, curry leaves, and mustard seeds define the soul of South Indian cooking. From crispy dosas on banana leaves to the tangy rasam that warms the spirit, this is cuisine of elegant simplicity.",
    dishes: ["Masala Dosa", "Idli Sambar", "Hyderabadi Biryani", "Chettinad Chicken", "Appam & Stew", "Payasam"],
    image: southIndian,
    accentColor: "hsl(145, 40%, 30%)",
    reverse: true,
  },
  {
    pageNumber: 4,
    title: "The Coastal Trail",
    subtitle: "Chapter Three",
    description:
      "Where the Arabian Sea meets the Bay of Bengal, a treasure trove of seafood unfolds. Kokum-kissed curries, coconut-milk stews, and the freshest catch prepared with centuries-old spice blends.",
    dishes: ["Fish Curry", "Prawn Balchão", "Malabar Parotta", "Crab Masala", "Surmai Fry", "Sol Kadhi"],
    image: coastalIndian,
    accentColor: "hsl(25, 60%, 40%)",
  },
  {
    pageNumber: 5,
    title: "The Street Chapter",
    subtitle: "Chapter Four",
    description:
      "The true heartbeat of Indian food lives in its streets. Sizzling tawas, bubbling oil, tangy chutneys — street food is where rules break and flavour explodes without reservation.",
    dishes: ["Pani Puri", "Vada Pav", "Chaat", "Jalebi", "Kathi Roll", "Pav Bhaji"],
    image: streetFood,
    accentColor: "hsl(42, 90%, 55%)",
    reverse: true,
  },
];

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
          {cuisines.map((cuisine) => (
            <CuisinePage key={cuisine.pageNumber} {...cuisine} />
          ))}
          <SupperClubInfo />
        </main>
      )}
    </div>
  );
};

export default Index;
