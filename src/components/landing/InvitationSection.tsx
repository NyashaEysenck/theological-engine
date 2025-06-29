import { motion } from 'framer-motion';
import { Users, Heart, Search, Zap, Shield, Book } from 'lucide-react';

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

const InvitationSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary-50 via-parchment-50 to-sage-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="p-3 bg-secondary-100 rounded-xl">
                <Users className="h-8 w-8 text-secondary-600" />
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6">
              Our Invitation to All Seekers
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Whether you're a believer, seeker, skeptic, or critic, we welcome your journey toward truth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-soft border border-neutral-200">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg mr-4">
                    <Heart className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900">
                    To the Believer
                  </h3>
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Seeking deeper roots in truth and a fuller understanding of God's Word. Let us journey together in strengthening your foundation.
                </p>
                <blockquote className="text-sm text-neutral-600 italic border-l-4 border-primary-200 pl-4 bg-primary-50 p-4 rounded-r-lg">
                  "But grow in the grace and knowledge of our Lord and Savior Jesus Christ."
                  <footer className="mt-2 font-medium">— 2 Peter 3:18 (ESV)</footer>
                </blockquote>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-soft border border-neutral-200">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-secondary-100 rounded-lg mr-4">
                    <Search className="h-6 w-6 text-secondary-600" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900">
                    To the Seeker
                  </h3>
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Wrestling with questions and searching for truth. We welcome your curiosity and desire to understand.
                </p>
                <blockquote className="text-sm text-neutral-600 italic border-l-4 border-secondary-200 pl-4 bg-secondary-50 p-4 rounded-r-lg">
                  "You will seek me and find me, when you seek me with all your heart."
                  <footer className="mt-2 font-medium">— Jeremiah 29:13 (ESV)</footer>
                </blockquote>
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-soft border border-neutral-200">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-accent-100 rounded-lg mr-4">
                    <Zap className="h-6 w-6 text-accent-600" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900">
                    To the Skeptic
                  </h3>
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Questioning assumptions and demanding evidence. Your critical thinking is valued here as we examine truth together.
                </p>
                <blockquote className="text-sm text-neutral-600 italic border-l-4 border-accent-200 pl-4 bg-accent-50 p-4 rounded-r-lg">
                  "Come now, let us reason together, says the LORD."
                  <footer className="mt-2 font-medium">— Isaiah 1:18 (ESV)</footer>
                </blockquote>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-soft border border-neutral-200">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-sage-100 rounded-lg mr-4">
                    <Shield className="h-6 w-6 text-sage-600" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900">
                    To the Critic
                  </h3>
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Challenging established interpretations and seeking authentic understanding. Your perspective enriches our pursuit of truth.
                </p>
                <blockquote className="text-sm text-neutral-600 italic border-l-4 border-sage-200 pl-4 bg-sage-50 p-4 rounded-r-lg">
                  "Test everything; hold fast what is good."
                  <footer className="mt-2 font-medium">— 1 Thessalonians 5:21 (ESV)</footer>
                </blockquote>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white p-10 lg:p-12 rounded-2xl shadow-medium border border-neutral-200 text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-primary-100 rounded-xl">
                <Book className="h-10 w-10 text-primary-600" />
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-neutral-900 mb-6">
              A Common Journey
            </h3>
            <p className="text-lg lg:text-xl text-neutral-700 mb-8 leading-relaxed max-w-4xl mx-auto">
              Just as Jesus responded to temptation with "It is written," we invite you to join us in discovering 
              and understanding the authentic Word of God that stands firm against every challenge.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <blockquote className="text-neutral-700 italic bg-parchment-50 p-6 rounded-xl border border-parchment-200">
                "If any of you lacks wisdom, let him ask God, who gives generously to all without reproach, and it will be given him."
                <footer className="text-primary-600 font-medium mt-4">— James 1:5 (ESV)</footer>
              </blockquote>
              <blockquote className="text-neutral-700 italic bg-sage-50 p-6 rounded-xl border border-sage-200">
                "You will know the truth, and the truth will set you free."
                <footer className="text-primary-600 font-medium mt-4">— John 8:32 (ESV)</footer>
              </blockquote>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvitationSection;