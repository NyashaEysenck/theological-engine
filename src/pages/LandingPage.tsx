import { motion } from 'framer-motion';
import { Book, Search, Shield, ScrollText, ChevronRight, Users, Compass, BookOpen, Star, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import LandingNav from '../components/landing/LandingNav';
import BoltBadge from '../components/common/BoltBadge';

const LandingPage = () => {
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

  return (
    <div className="bg-parchment-50">
      <LandingNav />
      <BoltBadge />

      {/* Hero Section */}
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

      {/* The Enduring Word */}
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

      {/* The Challenge of Clarity */}
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

      {/* Our Invitation to All Seekers */}
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

      {/* Discover the Core Features */}
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

      {/* Begin Your Journey */}
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

      {/* Footer */}
      <footer className="bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary-600 rounded-lg">
                  <Book className="h-6 w-6 text-white" />
                </div>
                <span className="font-heading font-semibold text-xl">It Is Written</span>
              </Link>
              <p className="text-neutral-400 mb-6 max-w-md leading-relaxed">
                An interactive theological discernment engine designed to help Christians identify and correct common myths and misinterpretations through careful study of Scripture.
              </p>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-6 text-neutral-300">Features</h3>
              <ul className="space-y-3">
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
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-6 text-neutral-300">Account</h3>
              <ul className="space-y-3">
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
              © {new Date().getFullYear()} It Is Written. All rights reserved.
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