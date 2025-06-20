import { motion } from 'framer-motion';
import { Book, Search, Shield, Stars, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Search className="h-8 w-8 text-primary-900" />,
      title: 'Myth Deconstruction',
      description: 'Explore common Christian myths and their biblical counters',
      link: '/myths'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-900" />,
      title: 'Core Doctrines',
      description: 'Understand foundational Christian beliefs with scriptural support',
      link: '/doctrines'
    },
    {
      icon: <Book className="h-8 w-8 text-primary-900" />,
      title: 'Bible Reading',
      description: 'Track your progress through Scripture with our guided reading plan',
      link: '/bible-reading'
    }
  ];

  return (
    <div className="mt-24">
      {/* Welcome Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20 mb-16 rounded-2xl shadow-card">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989934/pexels-photo-5989934.jpeg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-heading font-bold mb-6">
              Welcome back, {user?.username}
            </h1>
            <p className="text-xl text-primary-100 font-light">
              Continue your journey through Scripture
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-10 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-neutral-200"
            >
              <div className="mb-6">{feature.icon}</div>
              <h2 className="text-2xl font-heading font-semibold text-primary-900 mb-4">
                {feature.title}
              </h2>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <Link to={feature.link}>
                <Button variant="outline" size="sm" className="group">
                  Explore
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mb-16">
        <div className="bg-white p-10 rounded-2xl shadow-card border border-neutral-200">
          <h2 className="text-3xl font-heading font-semibold text-primary-900 mb-8">
            Your Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
              <Stars className="h-6 w-6 text-primary-900 mb-3" />
              <h3 className="font-medium text-primary-900 mb-1">Reading Streak</h3>
              <p className="text-3xl font-bold text-primary-900">7 days</p>
            </div>
            <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
              <Book className="h-6 w-6 text-primary-900 mb-3" />
              <h3 className="font-medium text-primary-900 mb-1">Chapters Read</h3>
              <p className="text-3xl font-bold text-primary-900">24</p>
            </div>
            <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
              <Shield className="h-6 w-6 text-primary-900 mb-3" />
              <h3 className="font-medium text-primary-900 mb-1">Myths Explored</h3>
              <p className="text-3xl font-bold text-primary-900">12</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;