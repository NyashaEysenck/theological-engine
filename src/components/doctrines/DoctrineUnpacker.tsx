import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, BookOpen, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { Doctrine } from '../../types/content';
import { verseService } from '../../services/verseService';

interface DoctrineUnpackerProps {
  doctrine: Doctrine;
}

interface ExpandedSection {
  scripture?: string;
  misunderstanding?: number;
}

const DoctrineUnpacker = ({ doctrine }: DoctrineUnpackerProps) => {
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>({});
  const [verseDetails, setVerseDetails] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const handleScriptureClick = async (scripture: string, index: number) => {
    const key = `scripture-${index}`;
    
    if (expandedSection.scripture === key) {
      setExpandedSection({});
      return;
    }

    setExpandedSection({ scripture: key });
    
    if (!verseDetails[key]) {
      setIsLoading({ ...isLoading, [key]: true });
      
      try {
        // Extract reference for demo
        const reference = scripture.split(' - ')[0];
        const match = reference.match(/(\w+)\s+(\d+):(\d+)/);
        
        if (match) {
          const [, book, chapter] = match;
          const verses = await verseService.getChapterVerses(book.toLowerCase(), parseInt(chapter));
          
          setVerseDetails({
            ...verseDetails,
            [key]: {
              reference,
              text: verses[0]?.text || 'Verse text would be loaded here',
              explanation: `This verse establishes the doctrine of ${doctrine.title} by revealing God's nature and will as expressed in Scripture.`,
              contribution: scripture.split(' - ')[1] || 'Supports the foundational understanding of this doctrine.'
            }
          });
        }
      } catch (error) {
        console.error('Error loading verse:', error);
      } finally {
        setIsLoading({ ...isLoading, [key]: false });
      }
    }
  };

  const handleMisunderstandingClick = (index: number) => {
    const key = `misunderstanding-${index}`;
    
    if (expandedSection.misunderstanding === index) {
      setExpandedSection({});
    } else {
      setExpandedSection({ misunderstanding: index });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-secondary-50 to-secondary-100 border-b border-secondary-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-secondary-100 rounded-lg mr-3">
            <Shield className="h-6 w-6 text-secondary-600" />
          </div>
          <span className="px-3 py-1 bg-secondary-200 text-secondary-800 text-sm rounded-full font-medium">
            {doctrine.category}
          </span>
        </div>
        <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-3">
          {doctrine.title}
        </h3>
        <p className="text-lg text-neutral-700 leading-relaxed">
          {doctrine.summary}
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Biblical Definition */}
        <div>
          <h4 className="font-heading font-semibold text-neutral-800 mb-4 text-lg">
            Biblical Definition
          </h4>
          <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <p className="text-primary-800 leading-relaxed">
              {doctrine.biblicalDefinition}
            </p>
          </div>
        </div>

        {/* Key Scriptures - Interactive */}
        <div>
          <h4 className="font-heading font-semibold text-neutral-800 mb-4 text-lg flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary-600" />
            Key Scriptures
          </h4>
          <div className="space-y-3">
            {doctrine.keyScriptures.map((scripture, index) => {
              const key = `scripture-${index}`;
              const isExpanded = expandedSection.scripture === key;
              const reference = scripture.split(' - ')[0];
              
              return (
                <div key={index}>
                  <button
                    onClick={() => handleScriptureClick(scripture, index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      isExpanded
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-primary-600 mb-2">{reference}</p>
                        <p className="text-sm text-neutral-700">
                          {scripture.split(' - ')[1]}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-primary-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-neutral-400" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 ml-4"
                      >
                        {isLoading[key] ? (
                          <div className="p-4 bg-parchment-50 border border-parchment-200 rounded-lg animate-pulse">
                            <div className="h-4 bg-parchment-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-parchment-200 rounded w-full mb-2"></div>
                            <div className="h-3 bg-parchment-200 rounded w-2/3"></div>
                          </div>
                        ) : verseDetails[key] ? (
                          <div className="p-4 bg-parchment-50 border border-parchment-200 rounded-lg">
                            <blockquote className="text-parchment-800 italic mb-4 text-lg border-l-4 border-parchment-400 pl-4">
                              "{verseDetails[key].text}"
                            </blockquote>
                            <div className="space-y-3">
                              <div>
                                <h5 className="font-medium text-parchment-700 mb-1">
                                  Doctrinal Contribution:
                                </h5>
                                <p className="text-sm text-parchment-700">
                                  {verseDetails[key].contribution}
                                </p>
                              </div>
                              <div>
                                <h5 className="font-medium text-parchment-700 mb-1">
                                  Explanation:
                                </h5>
                                <p className="text-sm text-parchment-700">
                                  {verseDetails[key].explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Common Misunderstandings - Interactive Corrector */}
        <div>
          <h4 className="font-heading font-semibold text-neutral-800 mb-4 text-lg flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            Common Misunderstandings
          </h4>
          <div className="space-y-3">
            {doctrine.commonMisunderstandings.map((misunderstanding, index) => {
              const isExpanded = expandedSection.misunderstanding === index;
              
              return (
                <div key={index}>
                  <button
                    onClick={() => handleMisunderstandingClick(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      isExpanded
                        ? 'border-red-300 bg-red-50'
                        : 'border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-red-800 font-medium">
                          Misunderstanding #{index + 1}
                        </p>
                        <p className="text-sm text-red-700 mt-1">
                          {misunderstanding}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-red-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 ml-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <h5 className="font-medium text-green-700 mb-2 flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Biblical Correction:
                        </h5>
                        <p className="text-green-800 mb-3">
                          {doctrine.biblicalDefinition}
                        </p>
                        <div className="text-sm text-green-700">
                          <p className="font-medium mb-1">Supporting Evidence:</p>
                          <p>{doctrine.keyScriptures[0]?.split(' - ')[0] || 'See key scriptures above'}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctrineUnpacker;