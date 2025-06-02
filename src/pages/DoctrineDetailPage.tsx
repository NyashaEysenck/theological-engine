import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { contentService } from '../services/contentService';
import { Doctrine } from '../types/content';
import Button from '../components/common/Button';

const DoctrineDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [doctrine, setDoctrine] = useState<Doctrine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { favoriteDoctrine, toggleFavoriteDoctrine } = useUserProgress();

  useEffect(() => {
    const loadDoctrine = async () => {
      if (!id) return;
      
      try {
        const data = await contentService.getDoctrineById(id);
        setDoctrine(data);
      } catch (error) {
        console.error('Error loading doctrine:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctrine();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated || !doctrine) return;
    await toggleFavoriteDoctrine(doctrine.id);
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

  if (!doctrine) {
    return (
      <div className="mt-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
            Doctrine not found
          </h1>
          <Link to="/doctrines">
            <Button variant="primary">Return to Doctrines</Button>
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
              to="/doctrines"
              className="inline-flex items-center text-neutral-600 hover:text-neutral-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Doctrines
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
                  {doctrine.title}
                </h1>
                <div className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                  {doctrine.category}
                </div>
              </div>
              {isAuthenticated && (
                <button
                  onClick={handleToggleFavorite}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <Heart 
                    className={`h-6 w-6 ${
                      favoriteDoctrine.includes(doctrine.id) ? 'fill-current' : ''
                    }`}
                  />
                </button>
              )}
            </div>

            <div className="space-y-8">
              {/* Summary */}
              <div>
                <h2 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                  Summary
                </h2>
                <p className="text-neutral-700">{doctrine.summary}</p>
              </div>

              {/* Biblical Definition */}
              <div className="bg-primary-50 p-6 rounded-lg">
                <h2 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                  Biblical Definition
                </h2>
                <p className="text-neutral-700">{doctrine.biblicalDefinition}</p>
              </div>

              {/* Key Scriptures */}
              <div>
                <h2 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                  Key Scriptures
                </h2>
                <div className="space-y-3">
                  {doctrine.keyScriptures.map((scripture, index) => (
                    <div
                      key={index}
                      className="p-4 border border-neutral-200 rounded-lg bg-neutral-50"
                    >
                      <p className="text-neutral-700">{scripture}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Misunderstandings */}
              <div>
                <h2 className="text-xl font-heading font-semibold text-neutral-800 mb-3">
                  Common Misunderstandings
                </h2>
                <div className="space-y-3">
                  {doctrine.commonMisunderstandings.map((misunderstanding, index) => (
                    <div
                      key={index}
                      className="p-4 border border-red-100 bg-red-50 rounded-lg"
                    >
                      <p className="text-red-700">{misunderstanding}</p>
                    </div>
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

export default DoctrineDetailPage;