import { motion } from 'framer-motion';
import { User, Book, Star, Trophy, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import Button from '../components/common/Button';
import { formatDate } from '../utils/helpers';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { 
    favoriteMyths,
    favoriteDoctrine,
    badges,
    experience,
    level,
    getReadingStreak
  } = useUserProgress();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="mt-24">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 mb-8">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-neutral-900">
                  {user?.username}
                </h1>
                <p className="text-neutral-600">{user?.email}</p>
                <p className="text-sm text-neutral-500">
                  Member since {formatDate(user?.createdAt || '')}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center mb-2">
                <Trophy className="h-5 w-5 text-primary-600 mr-2" />
                <h2 className="text-lg font-heading font-semibold">Progress</h2>
              </div>
              <div className="space-y-2">
                <p className="text-neutral-600">Level {level}</p>
                <p className="text-neutral-600">{experience} XP earned</p>
                <p className="text-neutral-600">{getReadingStreak()} day streak</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-primary-600 mr-2" />
                <h2 className="text-lg font-heading font-semibold">Favorites</h2>
              </div>
              <div className="space-y-2">
                <p className="text-neutral-600">{favoriteMyths.length} myths saved</p>
                <p className="text-neutral-600">{favoriteDoctrine.length} doctrines saved</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center mb-2">
                <Book className="h-5 w-5 text-primary-600 mr-2" />
                <h2 className="text-lg font-heading font-semibold">Reading</h2>
              </div>
              <Button variant="outline" size="sm" to="/bible-reading">
                View Reading Progress
              </Button>
            </div>
          </div>

          {/* Badges Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-8">
            <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
              Earned Badges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 rounded-lg bg-neutral-50 border border-neutral-200"
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-6 w-6 text-primary-600" />
                    <div>
                      <p className="font-medium text-neutral-900">{badge.name}</p>
                      <p className="text-sm text-neutral-600">{badge.description}</p>
                      <p className="text-xs text-neutral-500">
                        Earned on {formatDate(badge.awardedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
              Account Actions
            </h2>
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;