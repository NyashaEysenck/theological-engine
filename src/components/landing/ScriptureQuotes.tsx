import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';

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

const ScriptureQuotes = () => {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="p-3 bg-primary-50 rounded-xl">
              <ScrollText className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-16">
            The Enduring Word
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={itemVariants}
              className="bg-parchment-50 p-8 lg:p-10 rounded-2xl border border-parchment-200 shadow-soft"
            >
              <blockquote className="text-lg lg:text-xl text-neutral-700 italic leading-relaxed">
                "For the word of God is living and active, sharper than any two-edged sword, piercing to the division of soul and of spirit, of joints and of marrow, and discerning the thoughts and intentions of the heart."
              </blockquote>
              <footer className="text-primary-600 font-medium mt-6 text-base">
                — Hebrews 4:12 (ESV)
              </footer>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-sage-50 p-8 lg:p-10 rounded-2xl border border-sage-200 shadow-soft"
            >
              <blockquote className="text-lg lg:text-xl text-neutral-700 italic leading-relaxed">
                "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be competent, equipped for every good work."
              </blockquote>
              <footer className="text-primary-600 font-medium mt-6 text-base">
                — 2 Timothy 3:16-17 (ESV)
              </footer>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScriptureQuotes;