import { motion } from 'framer-motion';
import { Book, Search, Shield, ScrollText, ChevronRight, Users, Compass, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import LandingNav from '../components/landing/LandingNav';

const LandingPage = () => {
  return (
    <div className="bg-neutral-50">
      <LandingNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Micaiah's Stand: A Foundation in Truth
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Inspired by the prophet who dared to speak God's unwelcome truth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1: The Enduring Word */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-12">
              The Enduring Word
            </h2>
            <div className="space-y-8">
              <blockquote className="text-xl text-neutral-700 italic">
                "For the word of God is living and active, sharper than any two-edged sword, piercing to the division of soul and of spirit, of joints and of marrow, and discerning the thoughts and intentions of the heart."
                <footer className="text-neutral-500 mt-2">— Hebrews 4:12 (ESV)</footer>
              </blockquote>
              <blockquote className="text-xl text-neutral-700 italic">
                "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be competent, equipped for every good work."
                <footer className="text-neutral-500 mt-2">— 2 Timothy 3:16-17 (ESV)</footer>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: The Challenge of Clarity */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-12 text-center">
              The Challenge of Clarity
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <blockquote className="text-lg text-neutral-700 italic">
                  "But false prophets also arose among the people, just as there will be false teachers among you, who will secretly bring in destructive heresies..."
                  <footer className="text-neutral-500 mt-2">— 2 Peter 2:1 (ESV)</footer>
                </blockquote>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <blockquote className="text-lg text-neutral-700 italic">
                  "The simple believes everything, but the prudent gives thought to his steps."
                  <footer className="text-neutral-500 mt-2">— Proverbs 14:15 (ESV)</footer>
                </blockquote>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <blockquote className="text-lg text-neutral-700 italic">
                  "Answer not a fool according to his folly, lest you be like him yourself. Answer a fool according to his folly, lest he be wise in his own eyes."
                  <footer className="text-neutral-500 mt-2">— Proverbs 26:4-5 (ESV)</footer>
                </blockquote>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <blockquote className="text-lg text-neutral-700 italic">
                  "So that we may no longer be children, tossed to and fro by the waves and carried about by every wind of doctrine, by human cunning, by craftiness in deceitful schemes."
                  <footer className="text-neutral-500 mt-2">— Ephesians 4:14 (ESV)</footer>
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Our Invitation to All Seekers */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-12 text-center">
              Our Invitation to All Seekers
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                    To the Believer
                  </h3>
                  <p className="text-neutral-700 mb-4">
                    Seeking deeper roots in truth and a fuller understanding of God's Word. Let us journey together in strengthening your foundation.
                  </p>
                  <blockquote className="text-sm text-neutral-600 italic border-l-4 border-primary-200 pl-4">
                    "But grow in the grace and knowledge of our Lord and Savior Jesus Christ."
                    <footer className="mt-1">— 2 Peter 3:18 (ESV)</footer>
                  </blockquote>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                    To the Seeker
                  </h3>
                  <p className="text-neutral-700 mb-4">
                    Wrestling with questions and searching for truth. We welcome your curiosity and desire to understand.
                  </p>
                  <blockquote className="text-sm text-neutral-600 italic border-l-4 border-primary-200 pl-4">
                    "You will seek me and find me, when you seek me with all your heart."
                    <footer className="mt-1">— Jeremiah 29:13 (ESV)</footer>
                  </blockquote>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                    To the Skeptic
                  </h3>
                  <p className="text-neutral-700 mb-4">
                    Questioning assumptions and demanding evidence. Your critical thinking is valued here as we examine truth together.
                  </p>
                  <blockquote className="text-sm text-neutral-600 italic border-l-4 border-primary-200 pl-4">
                    "Come now, let us reason together, says the LORD."
                    <footer className="mt-1">— Isaiah 1:18 (ESV)</footer>
                  </blockquote>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                    To the Critic
                  </h3>
                  <p className="text-neutral-700 mb-4">
                    Challenging established interpretations and seeking authentic understanding. Your perspective enriches our pursuit of truth.
                  </p>
                  <blockquote className="text-sm text-neutral-600 italic border-l-4 border-primary-200 pl-4">
                    "Test everything; hold fast what is good."
                    <footer className="mt-1">— 1 Thessalonians 5:21 (ESV)</footer>
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-4">
                A Common Journey
              </h3>
              <p className="text-lg text-neutral-700 mb-6">
                Just as Micaiah stood firm to deliver God's true message amidst a chorus of deceptive voices, 
                we invite you to join us in discovering and understanding the authentic Word of God.
              </p>
              <div className="space-y-4">
                <blockquote className="text-neutral-700 italic">
                  "If any of you lacks wisdom, let him ask God, who gives generously to all without reproach, and it will be given him."
                  <footer className="text-neutral-500 mt-2">— James 1:5 (ESV)</footer>
                </blockquote>
                <blockquote className="text-neutral-700 italic">
                  "You will know the truth, and the truth will set you free."
                  <footer className="text-neutral-500 mt-2">— John 8:32 (ESV)</footer>
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Discover the Core Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-12 text-center">
              Discover the Core Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-neutral-50 p-8 rounded-lg">
                <Search className="h-8 w-8 text-primary-600 mb-4" />
                <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                  Myth Deconstruction Modules
                </h3>
                <p className="text-neutral-700">
                  Directly confront and dismantle common Christian myths, aligning them with scriptural truth.
                </p>
              </div>
              <div className="bg-neutral-50 p-8 rounded-lg">
                <Compass className="h-8 w-8 text-primary-600 mb-4" />
                <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                  Core Doctrine Navigator
                </h3>
                <p className="text-neutral-700">
                  Explore the foundational doctrines of Christianity, rooted firmly in biblical understanding.
                </p>
              </div>
              <div className="bg-neutral-50 p-8 rounded-lg">
                <BookOpen className="h-8 w-8 text-primary-600 mb-4" />
                <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                  Unlocking the Bible
                </h3>
                <p className="text-neutral-700">
                  Engage in a gamified, sequential reading experience from Genesis to Revelation.
                </p>
              </div>
              <div className="bg-neutral-50 p-8 rounded-lg">
                <Users className="h-8 w-8 text-primary-600 mb-4" />
                <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                  Community & Connection
                </h3>
                <p className="text-neutral-700">
                  Engage in curated discussions, join study groups, and find accountability partners.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Begin Your Journey */}
      <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-8">
              Begin Your Journey
            </h2>
            <p className="text-xl text-primary-100 mb-12">
              Discover Truth. Dispel Myth. Dive Deep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="group"
                >
                  Start Your Journey
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <Book className="h-6 w-6 text-white" />
                <span className="font-heading font-semibold text-xl">Micaiah's Stand</span>
              </Link>
              <p className="text-neutral-400 mb-4 max-w-md">
                An interactive theological discernment engine designed to help Christians identify and correct common myths and misinterpretations through careful study of Scripture.
              </p>
            </div>
            
            <div>
              <h3 className="font-heading font-medium text-sm uppercase mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/myths" className="text-neutral-400 hover:text-white transition-colors">
                    Myth Deconstruction
                  </Link>
                </li>
                <li>
                  <Link to="/doctrines" className="text-neutral-400 hover:text-white transition-colors">
                    Core Doctrines
                  </Link>
                </li>
                <li>
                  <Link to="/query" className="text-neutral-400 hover:text-white transition-colors">
                    Bible Query Engine
                  </Link>
                </li>
                <li>
                  <Link to="/bible-reading" className="text-neutral-400 hover:text-white transition-colors">
                    Bible Reading
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-medium text-sm uppercase mb-4">Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/register" className="text-neutral-400 hover:text-white transition-colors">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-neutral-400 hover:text-white transition-colors">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Micaiah's Stand. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-sm text-neutral-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-neutral-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;