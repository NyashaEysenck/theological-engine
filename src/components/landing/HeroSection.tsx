import { motion } from 'framer-motion';
import { Book, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

interface HeroSectionProps {
  isAuthenticated: boolean;
}

const HeroSection = ({ isAuthenticated }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg')] opacity-10 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Book className="h-12 w-12 text-parchment-100" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-8 leading-tight tracking-tight">
            It Is Written
            <span className="block text-3xl lg:text-4xl font-normal text-parchment-200 mt-4">
              A Foundation in Truth
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-primary-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            Inspired by the words Jesus used to counter temptation and declare truth, 
            we invite seekers of all backgrounds to discover authentic biblical understanding.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              to="/register"
              className="group text-lg px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white shadow-strong"
            >
              Begin Your Journey
              <ChevronRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-lg px-8 py-4"
              to="/myths"
            >
              Explore Truth
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;