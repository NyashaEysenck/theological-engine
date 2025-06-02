import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, StarOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { contentService } from '../services/contentService';
import { Myth } from '../types/content';
import Button from '../components/common/Button';

const MythDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [myth, setMyth] = useState<Myth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { favoriteMyths, toggleFavoriteMyth } = useUserProgress();

  useEffect(() => {
    const loadMyth = async () => {
      if (!id) return;
      
      try {
        const data = await contentService.getMythById(id);
        setMyth(data);
      } catch (error) {
        console.error('Error loading myth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMyth();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated || !myth) return;
    await toggleFavoriteMyth(myth.id);
  };

  if (isLoading) {
    return (
      <div className="mt-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-100 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-neutral-100 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-neutral-100 rounded"></div>
              <div className="h-32 bg-neutral-100 rounded"></div>
              <div className="h-32 bg-neutral-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!myth) {
    return (
      <div className="mt-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
            Myth not found
          </h1>
          <Link to="/myths">
            <Button variant="primary">Return to Myths</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-24">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <Link
              to="/myths"
              className="inline-flex items-center text-neutral-600 hover:text-neutral-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Myths
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-heading font-bold text-neutral-900">
                {myth.title}
              </h1>
              {isAuthenticated && (
                <button
                  onClick={handleToggleFavorite}
                  className="text-primary-600 hover:text-primary-700"
                >
                  {favoriteMyths.includes(myth.id) ? (
                    <Star className="h-6 w-6 fill-current" />
                  ) : (
                    <StarOff className="h-6 w-6" />
                  )}
                </button>
              )}
            </div>

            <div className="space-y-8">
              {/* Popular Perception */}
              <div>
                <h2 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                  Popular Perception
                </h2>
                <p className="text-neutral-700">{myth.popularPerception}</p>
              </div>

              {/* Biblical Counter-Argument */}
              <div>
                <h2 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                  Biblical Truth
                </h2>
                
                <div className="space-y-6">
                  {/* Scriptural Refutation */}
                  <div className="bg-neutral-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">
                      Scriptural Refutation
                    </h3>
                    <p className="text-neutral-700">
                      {myth.biblicalCounterArgument.scripturalRefutation}
                    </p>
                  </div>

                  {/* Contextual Explanation */}
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">
                      Historical and Cultural Context
                    </h3>
                    <p className="text-neutral-700">
                      {myth.biblicalCounterArgument.contextualExplanation}
                    </p>
                  </div>

                  {/* Sound Doctrine */}
                  <div className="bg-primary-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">
                      Sound Biblical Doctrine
                    </h3>
                    <p className="text-neutral-700">
                      {myth.biblicalCounterArgument.soundDoctrine}
                    </p>
                  </div>

                  {/* Supporting Scriptures */}
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">
                      Supporting Scriptures
                    </h3>
                    <div className="space-y-3">
                      {myth.biblicalCounterArgument.supportingScriptures.map((scripture, index) => (
                        <div
                          key={index}
                          className="p-4 border border-neutral-200 rounded-lg"
                        >
                          <p className="text-neutral-700">{scripture}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {myth.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MythDetailPage;