import { motion } from 'framer-motion';

const BoltBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="fixed top-4 right-4 z-50"
    >
      <a
        href="https://bolt.new/"
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full"
        aria-label="Powered by Bolt - Visit bolt.new"
      >
        <img
          src="/black_circle_360x360 copy.png"
          alt="Powered by Bolt"
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full shadow-medium hover:shadow-strong transition-shadow duration-200"
        />
      </a>
    </motion.div>
  );
};

export default BoltBadge;