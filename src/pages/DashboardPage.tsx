import { motion } from 'framer-motion';
import { Book, Search, Shield, Stars, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

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
      icon: <Book className="h-8 w-8 text-primary-600" />,
      title: 'Bible Reading',
      description: 'Track your progress through Scripture with our guided reading plan',
      link: '/bible-reading'
    }
  ];

  return (
    <div className="mt-24">
      {/* Welcome Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16 mb-12 rounded-lg">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5989934/pexels-photo-5989934.jpeg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-heading font-bold mb-4">
              Welcome back, {user?.username}
            </h1>
            <p className="text-xl text-primary-100">
              Continue your journey through Scripture
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200"
            >
              <div className="mb-4">{feature.icon}</div>
              <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                {feature.title}
              </h2>
              <p className="text-neutral-700 mb-4">
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
      <section className="mb-12">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
          <h2 className="text-2xl font-heading font-semibold text-neutral-900 mb-6">
            Your Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <Stars className="h-6 w-6 text-primary-600 mb-2" />
              <h3 className="font-medium text-neutral-900">Reading Streak</h3>
              <p className="text-2xl font-bold text-primary-600">7 days</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <Book className="h-6 w-6 text-primary-600 mb-2" />
              <h3 className="font-medium text-neutral-900">Chapters Read</h3>
              <p className="text-2xl font-bold text-primary-600">24</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <Shield className="h-6 w-6 text-primary-600 mb-2" />
              <h3 className="font-medium text-neutral-900">Myths Explored</h3>
              <p className="text-2xl font-bold text-primary-600">12</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;