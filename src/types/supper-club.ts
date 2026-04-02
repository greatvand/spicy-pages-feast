export interface SupperClubListing {
  id: string;
  name: string;
  host: string;
  date: string;
  time: string;
  price: string;
  city: string;
  location: string;
  capacity: number;
  spotsLeft: number;
  image: string;
  cuisine: string;
  description: string;
  bookingUrl: string;
  tags: string[];
}

export interface CuisineCategory {
  pageNumber: number;
  title: string;
  subtitle: string;
  tagline: string;
  accentColor: string;
  headerImage: string;
  listings: SupperClubListing[];
  reverse?: boolean;
}
