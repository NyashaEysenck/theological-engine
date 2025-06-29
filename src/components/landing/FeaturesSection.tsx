import { motion } from 'framer-motion';
import { Compass, Search, Shield, BookOpen, Users } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const FeaturesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="p-3 bg-primary-100 rounded-xl">
                <Compass className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6">
              Discover the Core Features
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools designed to deepen understanding and strengthen biblical foundations.
            </p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={itemVariants} className="group bg-parchment-50 p-8 rounded-xl border border-parchment-200 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="p-3 bg-primary-100 rounded-xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
                <Search className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900 mb-4">
                Myth Deconstruction Modules
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                Directly confront and dismantle common Christian myths, aligning them with scriptural truth.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="group bg-sage-50 p-8 rounded-xl border border-sage-200 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="p-3 bg-secondary-100 rounded-xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
                <Compass className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900 mb-4">
                Core Doctrine Navigator
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                Explore the foundational doctrines of Christianity, rooted firmly in biblical understanding.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="group bg-accent-50 p-8 rounded-xl border border-accent-200 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="p-3 bg-accent-100 rounded-xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900 mb-4">
                Unlocking the Bible
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                Engage in a gamified, sequential reading experience from Genesis to Revelation.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="group bg-primary-50 p-8 rounded-xl border border-primary-200 shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="p-3 bg-sage-100 rounded-xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900 mb-4">
                Community & Connection
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                Engage in curated discussions, join study groups, and find accountability partners.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;