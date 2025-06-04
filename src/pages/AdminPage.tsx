import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Shield, ScrollText, BarChart3, Settings, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'settings'>('overview');
  const { user } = useAuth();

  // Mock data for demonstration
  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalChaptersRead: 15783,
    averageReadingTime: '23 minutes',
    mythsExplored: 456,
    doctrinesStudied: 289
  };

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Completed Genesis Chapter 3', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'Favorited "Trinity" doctrine', time: '3 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'Started Bible Reading Plan', time: '5 hours ago' }
  ];

  const notifications = [
    { id: 1, type: 'warning', message: 'High server load detected', time: '1 hour ago' },
    { id: 2, type: 'info', message: 'Daily backup completed', time: '6 hours ago' }
  ];

  return (
    <div className="mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Admin Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-neutral-900">
                Admin Dashboard
              </h1>
              <p className="text-neutral-600">
                Welcome back, {user?.username}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-neutral-600 hover:text-neutral-900">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  2
                </span>
              </button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600">Total Users</p>
                  <h3 className="text-2xl font-bold text-neutral-900">{stats.totalUsers}</h3>
                </div>
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <p className="text-sm text-neutral-500 mt-2">
                {stats.activeUsers} active users
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600">Chapters Read</p>
                  <h3 className="text-2xl font-bold text-neutral-900">{stats.totalChaptersRead}</h3>
                </div>
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
              <p className="text-sm text-neutral-500 mt-2">
                Avg. {stats.averageReadingTime} per session
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600">Content Engagement</p>
                  <h3 className="text-2xl font-bold text-neutral-900">{stats.mythsExplored}</h3>
                </div>
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <p className="text-sm text-neutral-500 mt-2">
                {stats.doctrinesStudied} doctrines studied
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Activity Feed */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg"
                  >
                    <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-neutral-900 font-medium">{activity.user}</p>
                      <p className="text-neutral-600">{activity.action}</p>
                      <p className="text-sm text-neutral-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications Panel */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                System Notifications
              </h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 rounded-lg ${
                      notification.type === 'warning' 
                        ? 'bg-orange-50 border border-orange-200' 
                        : 'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    <p className={`font-medium ${
                      notification.type === 'warning' ? 'text-orange-800' : 'text-blue-800'
                    }`}>
                      {notification.message}
                    </p>
                    <p className={`text-sm ${
                      notification.type === 'warning' ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;