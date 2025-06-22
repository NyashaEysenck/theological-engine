import { motion } from 'framer-motion';
import { Book, Search, Shield, Stars, ChevronRight, TrendingUp, Award, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      link: '/myths',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200'
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary-600" />,
      title: 'Core Doctrines',
      description: 'Understand foundational Christian beliefs with scriptural support',
      link: '/doctrines',
      bgColor: 'bg-secondary-50',
      borderColor: 'border-secondary-200'
    },
    {
      icon: <Book className="h-8 w-8 text-accent-600" />,
      title: 'Bible Reading',
      description: 'Track your progress through Scripture with our guided reading plan',
      link: '/bible-reading',
      bgColor: 'bg-accent-50',
      borderColor: 'border-accent-200'
    }
  ];

  const stats = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary-600" />,
      label: 'Reading Streak',
      value: '7 days',
      bgColor: 'bg-primary-50',
      iconBg: 'bg-primary-100'
    },
    {
      icon: <Book className="h-6 w-6 text-secondary-600" />,
      label: 'Chapters Read',
      value: '24',
      bgColor: 'bg-secondary-50',
      iconBg: 'bg-secondary-100'
    },
    {
      icon: <Shield className="h-6 w-6 text-accent-600" />,
      label: 'Myths Explored',
      value: '12',
      bgColor: 'bg-accent-50',
      iconBg: 'bg-accent-100'
    }
  ];

  return (
    <div className="mt-24 min-h-screen bg-parchment-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Welcome Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-20 mb-12 rounded-2xl shadow-strong">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989934/pexels-photo-5989934.jpeg')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent"></div>
          <div className="relative max-w-5xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <Book className="h-12 w-12 text-parchment-100" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
                Welcome back, {user?.username}
              </h1>
              <p className="text-xl lg:text-2xl text-primary-100 leading-relaxed">
                Continue your journey through Scripture and biblical truth
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${stat.bgColor} p-8 rounded-xl border ${stat.iconBg.replace('bg-', 'border-').replace('100', '200')} shadow-soft`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-neutral-900 text-lg mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 ${stat.iconBg} rounded-xl`}>
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="mb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group ${feature.bgColor} p-8 lg:p-10 rounded-xl ${feature.borderColor} border shadow-soft hover:shadow-medium transition-all duration-300`}
              >
                <div className="mb-6">
                  <div className="p-3 bg-white rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h2 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900 mb-4">
                  {feature.title}
                </h2>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Link to={feature.link}>
                  <Button variant="outline" size="sm" className="group/btn">
                    Explore
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Recent Activity */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-8 lg:p-10 rounded-xl shadow-soft border border-neutral-200"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="p-3 bg-sage-100 rounded-xl mr-4">
                  <Calendar className="h-6 w-6 text-sage-600" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-neutral-900">
                  Your Progress Overview
                </h2>
              </div>
              <Link to="/bible-reading">
                <Button variant="outline" size="sm" className="group">
                  View Details
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-parchment-50 rounded-xl border border-parchment-200">
                <div className="flex items-center mb-3">
                  <Award className="h-5 w-5 text-parchment-600 mr-2" />
                  <h3 className="font-heading font-medium text-neutral-900">Experience Points</h3>
                </div>
                <p className="text-2xl font-bold text-parchment-700">1,250 XP</p>
                <p className="text-sm text-neutral-600 mt-1">Level 12</p>
              </div>
              
              <div className="p-6 bg-sage-50 rounded-xl border border-sage-200">
                <div className="flex items-center mb-3">
                  <Book className="h-5 w-5 text-sage-600 mr-2" />
                  <h3 className="font-heading font-medium text-neutral-900">Current Book</h3>
                </div>
                <p className="text-lg font-semibold text-sage-700">Genesis</p>
                <p className="text-sm text-neutral-600 mt-1">Chapter 15 of 50</p>
              </div>
              
              <div className="p-6 bg-primary-50 rounded-xl border border-primary-200">
                <div className="flex items-center mb-3">
                  <Stars className="h-5 w-5 text-primary-600 mr-2" />
                  <h3 className="font-heading font-medium text-neutral-900">Badges Earned</h3>
                </div>
                <p className="text-2xl font-bold text-primary-700">8</p>
                <p className="text-sm text-neutral-600 mt-1">3 this month</p>
              </div>
              
              <div className="p-6 bg-secondary-50 rounded-xl border border-secondary-200">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-5 w-5 text-secondary-600 mr-2" />
                  <h3 className="font-heading font-medium text-neutral-900">Weekly Goal</h3>
                </div>
                <p className="text-lg font-semibold text-secondary-700">5 of 7 days</p>
                <div className="w-full bg-secondary-200 rounded-full h-2 mt-2">
                  <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '71%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;