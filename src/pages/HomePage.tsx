import { motion } from 'framer-motion';
import { Book, Search, BookOpen, ScrollText, Shield, Stars, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const features = [
    {
      icon: <Search className="h-8 w-8 text-primary-600" />,
      title: 'Myth Deconstruction',
      description: 'Explore common Christian myths and their biblical counters',
      link: '/myths'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: 'Core Doctrines',
      description: 'Understand foundational Christian beliefs with scriptural support',
      link: '/doctrines'
    },
    {
      icon: <ScrollText className="h-8 w-8 text-primary-600" />,
      title: 'Bible Query Engine',
      description: 'Discover what the Bible really says about various topics',
      link: '/query'
    },
    {
      icon: <Book className="h-8 w-8 text-primary-600" />,
      title: 'Scripture in Context',
      description: 'See commonly misused verses in their proper biblical context',
      link: '/scripture-context'
    }
  ];

  return (
    <div className="mt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                Unlock the Bible's Treasures
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Begin a transformative journey through Scripture, discovering its depths one chapter at a time. 
                Track your progress, earn achievements, and unlock profound biblical insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  to={isAuthenticated ? "/bible-reading" : "/register"}
                  className="group"
                >
                  Start Your Journey
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-transparent text-white border-white hover:bg-white/10"
                  to="/bible-reading"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                    <BookOpen className="h-10 w-10 text-primary-200 mb-3" />
                    <h3 className="font-heading font-semibold text-lg mb-2">Sequential Reading</h3>
                    <p className="text-sm text-primary-100">Journey from Genesis to Revelation systematically</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                    <Stars className="h-10 w-10 text-primary-200 mb-3" />
                    <h3 className="font-heading font-semibold text-lg mb-2">Earn Rewards</h3>
                    <p className="text-sm text-primary-100">Unlock achievements and special content</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                    <Shield className="h-10 w-10 text-primary-200 mb-3" />
                    <h3 className="font-heading font-semibold text-lg mb-2">Deep Insights</h3>
                    <p className="text-sm text-primary-100">Access study tools and commentary</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                    <Book className="h-10 w-10 text-primary-200 mb-3" />
                    <h3 className="font-heading font-semibold text-lg mb-2">Track Progress</h3>
                    <p className="text-sm text-primary-100">Monitor your reading journey</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Tools For Biblical Understanding
            </h2>
            <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
              Explore our comprehensive features designed to deepen your understanding of Scripture 
              and strengthen your biblical foundation.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-200/80"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="font-heading text-2xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-700 mb-6 text-lg">
                  {feature.description}
                </p>
                <Link 
                  to={feature.link}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 group-hover:translate-x-1 transition-transform"
                >
                  Explore
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-primary-800 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989934/pexels-photo-5989934.jpeg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Begin Your Biblical Discovery Journey
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join us today and embark on a transformative path through Scripture. 
            Unlock deeper understanding, discover sound doctrine, and grow in biblical wisdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              to={isAuthenticated ? "/bible-reading" : "/register"}
              className="group"
            >
              {isAuthenticated ? "Continue Your Journey" : "Start Your Journey"}
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-white hover:bg-white/10"
              to="/doctrines"
            >
              Explore Core Doctrines
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;