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
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
                Discover Biblical Truth
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed max-w-xl">
                Journey through Scripture with modern tools for ancient wisdom. 
                Uncover truth, dispel myths, and grow in understanding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="group"
                  >
                    Begin Your Journey
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/doctrines">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-transparent text-white border-white hover:bg-white/10"
                  >
                    Explore Doctrines
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
              >
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <BookOpen className="h-8 w-8 text-primary-200 mb-3" />
                    <h3 className="font-heading text-lg font-semibold mb-2">Bible Reading</h3>
                    <p className="text-sm text-primary-100">Track your journey through Scripture with our guided reading plans</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 translate-x-4">
                    <Shield className="h-8 w-8 text-primary-200 mb-3" />
                    <h3 className="font-heading text-lg font-semibold mb-2">Sound Doctrine</h3>
                    <p className="text-sm text-primary-100">Explore core Christian beliefs with biblical support</p>
                  </div>
                </div>
                <div className="space-y-6 translate-y-12">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <Search className="h-8 w-8 text-primary-200 mb-3" />
                    <h3 className="font-heading text-lg font-semibold mb-2">Truth Search</h3>
                    <p className="text-sm text-primary-100">Find biblical answers to your theological questions</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 translate-x-4">
                    <ScrollText className="h-8 w-8 text-primary-200 mb-3" />
                    <h3 className="font-heading text-lg font-semibold mb-2">Myth Busting</h3>
                    <p className="text-sm text-primary-100">Discover what the Bible really teaches about common beliefs</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-4">
                Your Path to Understanding
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Discover our comprehensive tools designed to deepen your biblical knowledge 
                and strengthen your theological foundation.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-neutral-200/80"
            >
              <div className="bg-primary-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Book className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-neutral-900 mb-3">
                Bible Reading Plans
              </h3>
              <p className="text-neutral-600 mb-6">
                Follow structured reading plans with historical context and theological insights.
              </p>
              <Link 
                to="/register" 
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
              >
                Start Reading
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-neutral-200/80"
            >
              <div className="bg-primary-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-neutral-900 mb-3">
                Doctrinal Clarity
              </h3>
              <p className="text-neutral-600 mb-6">
                Understand core Christian beliefs with clear biblical support and explanation.
              </p>
              <Link 
                to="/doctrines" 
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
              >
                Explore Doctrines
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-neutral-200/80"
            >
              <div className="bg-primary-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-neutral-900 mb-3">
                Truth Discovery
              </h3>
              <p className="text-neutral-600 mb-6">
                Search and explore biblical answers to your theological questions.
              </p>
              <Link 
                to="/query" 
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
              >
                Start Searching
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scripture Focus Section */}
      <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989934/pexels-photo-5989934.jpeg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
                Scripture as Our Foundation
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Every feature and insight is grounded in careful biblical study and interpretation.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Lock className="h-6 w-6 text-primary-200 mb-3" />
                  <h3 className="font-heading text-lg font-semibold mb-2">Faithful to Scripture</h3>
                  <p className="text-sm text-primary-100">Committed to accurate biblical interpretation</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Users className="h-6 w-6 text-primary-200 mb-3" />
                  <h3 className="font-heading text-lg font-semibold mb-2">Community Focus</h3>
                  <p className="text-sm text-primary-100">Learn and grow with fellow believers</p>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <blockquote className="text-2xl font-heading italic mb-6">
                "All Scripture is breathed out by God and profitable for teaching, for reproof, 
                for correction, and for training in righteousness..."
              </blockquote>
              <p className="text-primary-200">2 Timothy 3:16 (ESV)</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6">
              Begin Your Journey Today
            </h2>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Join us in discovering the depths of biblical truth and growing in 
              understanding of God's Word.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="group"
                >
                  Create Your Account
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;