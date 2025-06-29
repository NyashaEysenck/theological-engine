import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import Button from '../common/Button';

interface CallToActionProps {
  isAuthenticated: boolean;
}

const CallToAction = ({ isAuthenticated }: CallToActionProps) => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989934/pexels-photo-5989934.jpeg')] opacity-10 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent"></div>
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Star className="h-12 w-12 text-parchment-100" />
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-8">
            Begin Your Journey
          </h2>
          <p className="text-xl lg:text-2xl text-primary-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            Discover Truth. Dispel Myth. Dive Deep.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <Button 
                variant="secondary" 
                size="lg"
                className="group text-lg px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white shadow-strong"
              >
                Start Your Journey
                <ChevronRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-lg px-8 py-4"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;