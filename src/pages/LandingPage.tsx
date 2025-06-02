import { motion } from 'framer-motion';
import { Book, Search, Shield, ScrollText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const LandingPage = () => {
  return (
    <div className="bg-neutral-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              "Sanctify them in the truth; your word is truth."
            </h1>
            <p className="text-xl text-primary-100 mb-4 italic">
              — John 17:17
            </p>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Welcome to a journey of understanding, where truth meets grace, and questions find answers in Scripture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                to="/register"
                className="group"
              >
                Begin Your Journey
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                to="/login"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-lg">
              <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                To the Seeker
              </h3>
              <p className="text-neutral-700 mb-4">
                "Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you."
              </p>
              <p className="text-sm text-neutral-500 italic">— Matthew 7:7</p>
            </div>
            
            <div className="bg-neutral-50 p-8 rounded-lg">
              <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                To the Skeptic
              </h3>
              <p className="text-neutral-700 mb-4">
                "Come now, let us reason together, says the LORD."
              </p>
              <p className="text-sm text-neutral-500 italic">— Isaiah 1:18</p>
            </div>
            
            <div className="bg-neutral-50 p-8 rounded-lg">
              <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                To the Believer
              </h3>
              <p className="text-neutral-700 mb-4">
                "But grow in the grace and knowledge of our Lord and Savior Jesus Christ."
              </p>
              <p className="text-sm text-neutral-500 italic">— 2 Peter 3:18</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Message Section */}
      <section className="py-24 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-12">
            The Heart of God's Word
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-xl mb-2">
                "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."
              </p>
              <p className="text-primary-200 italic">— John 3:16</p>
            </div>
            <div>
              <p className="text-xl mb-2">
                "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness."
              </p>
              <p className="text-primary-200 italic">— 2 Timothy 3:16</p>
            </div>
            <div>
              <p className="text-xl mb-2">
                "The truth will set you free."
              </p>
              <p className="text-primary-200 italic">— John 8:32</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-12 text-center">
            Tools for Understanding
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 p-8 rounded-lg">
              <Search className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                Myth Deconstruction
              </h3>
              <p className="text-neutral-700 mb-4">
                Examine common Christian myths against biblical truth.
              </p>
              <Link 
                to="/myths"
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                Explore Myths
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>

            <div className="bg-neutral-50 p-8 rounded-lg">
              <Shield className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                Core Doctrines
              </h3>
              <p className="text-neutral-700 mb-4">
                Understand foundational biblical teachings with clarity.
              </p>
              <Link 
                to="/doctrines"
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                Study Doctrines
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>

            <div className="bg-neutral-50 p-8 rounded-lg">
              <ScrollText className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                Scripture Context
              </h3>
              <p className="text-neutral-700 mb-4">
                See commonly misused verses in their proper context.
              </p>
              <Link 
                to="/scripture-context"
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                Explore Context
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>

            <div className="bg-neutral-50 p-8 rounded-lg">
              <Book className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                Bible Reading
              </h3>
              <p className="text-neutral-700 mb-4">
                Track your journey through Scripture with guided reading plans.
              </p>
              <Link 
                to="/bible-reading"
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                Start Reading
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
            "Your word is a lamp to my feet and a light to my path."
          </h2>
          <p className="text-primary-200 italic mb-8">— Psalm 119:105</p>
          <Button
            variant="secondary"
            size="lg"
            to="/register"
            className="group"
          >
            Begin Your Journey
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;