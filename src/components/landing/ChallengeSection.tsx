import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

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

const ChallengeSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="p-3 bg-accent-100 rounded-xl">
                <Shield className="h-8 w-8 text-accent-600" />
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6">
              The Challenge of Clarity
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              In an age of information abundance, discerning truth from error requires wisdom, 
              careful study, and humble dependence on God's Spirit.
            </p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={itemVariants} className="bg-white p-6 lg:p-8 rounded-xl shadow-soft border border-neutral-200">
              <blockquote className="text-base lg:text-lg text-neutral-700 italic leading-relaxed mb-4">
                "But false prophets also arose among the people, just as there will be false teachers among you, who will secretly bring in destructive heresies..."
              </blockquote>
              <footer className="text-sm text-primary-600 font-medium">— 2 Peter 2:1 (ESV)</footer>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 lg:p-8 rounded-xl shadow-soft border border-neutral-200">
              <blockquote className="text-base lg:text-lg text-neutral-700 italic leading-relaxed mb-4">
                "The simple believes everything, but the prudent gives thought to his steps."
              </blockquote>
              <footer className="text-sm text-primary-600 font-medium">— Proverbs 14:15 (ESV)</footer>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 lg:p-8 rounded-xl shadow-soft border border-neutral-200">
              <blockquote className="text-base lg:text-lg text-neutral-700 italic leading-relaxed mb-4">
                "Answer not a fool according to his folly, lest you be like him yourself. Answer a fool according to his folly, lest he be wise in his own eyes."
              </blockquote>
              <footer className="text-sm text-primary-600 font-medium">— Proverbs 26:4-5 (ESV)</footer>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 lg:p-8 rounded-xl shadow-soft border border-neutral-200">
              <blockquote className="text-base lg:text-lg text-neutral-700 italic leading-relaxed mb-4">
                "So that we may no longer be children, tossed to and fro by the waves and carried about by every wind of doctrine, by human cunning, by craftiness in deceitful schemes."
              </blockquote>
              <footer className="text-sm text-primary-600 font-medium">— Ephesians 4:14 (ESV)</footer>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChallengeSection;