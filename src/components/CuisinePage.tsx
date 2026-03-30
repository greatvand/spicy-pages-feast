import { motion } from "framer-motion";
import BookPage from "./BookPage";

interface CuisinePageProps {
  pageNumber: number;
  title: string;
  subtitle: string;
  description: string;
  dishes: string[];
  image: string;
  accentColor: string;
  reverse?: boolean;
}

const CuisinePage = ({
  pageNumber,
  title,
  subtitle,
  description,
  dishes,
  image,
  accentColor,
  reverse = false,
}: CuisinePageProps) => {
  return (
    <BookPage pageNumber={pageNumber} isActive={true}>
      <div className={`min-h-screen flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch`}>
        {/* Image side */}
        <motion.div
          className="lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            width={800}
            height={600}
          />
          <div className={`absolute inset-0 bg-gradient-to-${reverse ? 'l' : 'r'} from-transparent via-transparent to-parchment/50 hidden lg:block`} />
          <div className="absolute inset-0 bg-gradient-to-t from-parchment/80 to-transparent lg:hidden" />
        </motion.div>

        {/* Content side */}
        <div className="lg:w-1/2 flex items-center px-8 md:px-16 py-12 lg:py-0">
          <div className="max-w-lg mx-auto">
            {/* Ornamental top */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-0.5 w-24 mb-6"
              style={{ background: accentColor }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-accent text-lg italic text-muted-foreground mb-2"
            >
              {subtitle}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="font-body text-muted-foreground leading-relaxed mb-8"
            >
              {description}
            </motion.p>

            {/* Dishes list */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <p className="font-accent text-sm uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">
                Signature Dishes
              </p>
              <div className="grid grid-cols-2 gap-2">
                {dishes.map((dish, i) => (
                  <motion.div
                    key={dish}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: accentColor }}
                    />
                    <span className="font-body text-sm text-foreground/80">{dish}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Ornamental bottom */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="h-0.5 w-16 mt-8"
              style={{ background: accentColor }}
            />
          </div>
        </div>
      </div>
    </BookPage>
  );
};

export default CuisinePage;
