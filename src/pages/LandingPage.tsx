import { motion } from 'framer-motion';
import { Book, Search, Shield, ScrollText, ChevronRight, Users, Compass, BookOpen, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const LandingPage = () => {
  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl lg:text-7xl font-heading font-bold mb-8 leading-tight bg-clip-text">
              Micaiah's Stand: A Foundation in Truth
            </h1>
            <p className="text-2xl text-primary-100 mb-12 leading-relaxed">
              Inspired by the prophet who dared to speak God's unwelcome truth
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="secondary"
                size="lg"
                to="/register"
                className="group text-lg px-8 py-4"
              >
                Begin Your Journey
                <ChevronRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                to="/login"
                className="text-lg px-8 py-4 bg-transparent text-white border-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-50 to-transparent"
        />
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6">
              Discover Biblical Truth
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Explore our comprehensive tools designed to deepen your understanding of Scripture
              and strengthen your biblical foundation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8" />,
                title: "Myth Deconstruction",
                description: "Explore and understand common Christian myths with biblical truth"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Core Doctrines",
                description: "Study foundational biblical teachings with scriptural support"
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Bible Reading",
                description: "Track your progress through Scripture with our guided reading plan"
              },
              {
                icon: <Compass className="h-8 w-8" />,
                title: "Scripture Context",
                description: "Understand verses in their proper historical and literary context"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative p-8 bg-neutral-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />
                <div className="text-primary-600 mb-6">{feature.icon}</div>
                <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Quotes */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-heading font-bold text-neutral-900 mb-8">
                The Enduring Word
              </h2>
              <blockquote className="p-8 bg-white rounded-2xl shadow-sm border border-neutral-200">
                <p className="text-xl text-neutral-700 italic mb-4">
                  "For the word of God is living and active, sharper than any two-edged sword, piercing to the division of soul and of spirit, of joints and of marrow, and discerning the thoughts and intentions of the heart."
                </p>
                <footer className="text-neutral-500">— Hebrews 4:12 (ESV)</footer>
              </blockquote>
              <blockquote className="p-8 bg-white rounded-2xl shadow-sm border border-neutral-200">
                <p className="text-xl text-neutral-700 italic mb-4">
                  "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be competent, equipped for every good work."
                </p>
                <footer className="text-neutral-500">— 2 Timothy 3:16-17 (ESV)</footer>
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-heading font-bold text-neutral-900 mb-8">
                Our Commitment
              </h2>
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-neutral-200">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Lock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                      Biblical Accuracy
                    </h3>
                    <p className="text-neutral-600">
                      We are committed to accurate interpretation and faithful teaching of God's Word.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                      Community Support
                    </h3>
                    <p className="text-neutral-600">
                      Join a community dedicated to growing in biblical understanding and spiritual maturity.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989934/pexels-photo-5989934.jpeg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-heading font-bold mb-8">
              Begin Your Biblical Discovery Journey
            </h2>
            <p className="text-xl mb-12 text-primary-100 max-w-2xl mx-auto leading-relaxed">
              Join us today and embark on a transformative path through Scripture. 
              Unlock deeper understanding, discover sound doctrine, and grow in biblical wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="secondary"
                size="lg"
                to="/register"
                className="group text-lg px-8 py-4"
              >
                Start Your Journey
                <ChevronRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                to="/doctrines"
                className="text-lg px-8 py-4 bg-transparent text-white border-white hover:bg-white/10"
              >
                Explore Core Doctrines
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Book className="h-6 w-6 text-primary-500" />
                <span className="font-heading font-semibold text-xl">Micaiah's Stand</span>
              </div>
              <p className="text-neutral-400">
                Committed to biblical truth and accurate scriptural interpretation.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li><Link to="/myths" className="text-neutral-400 hover:text-white transition-colors">Myth Deconstruction</Link></li>
                <li><Link to="/doctrines" className="text-neutral-400 hover:text-white transition-colors">Core Doctrines</Link></li>
                <li><Link to="/query" className="text-neutral-400 hover:text-white transition-colors">Bible Query</Link></li>
                <li><Link to="/scripture-context" className="text-neutral-400 hover:text-white transition-colors">Scripture Context</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4">Account</h3>
              <ul className="space-y-2">
                <li><Link to="/register" className="text-neutral-400 hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link to="/login" className="text-neutral-400 hover:text-white transition-colors">Sign In</Link></li>
                <li><Link to="/bible-reading" className="text-neutral-400 hover:text-white transition-colors">Bible Reading</Link></li>
                <li><Link to="/profile" className="text-neutral-400 hover:text-white transition-colors">Profile</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-800 text-center text-neutral-400">
            <p>&copy; {new Date().getFullYear()} Micaiah's Stand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;