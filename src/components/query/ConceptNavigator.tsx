import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, ExternalLink, Lightbulb, ChevronRight } from 'lucide-react';
import { BibleConcept } from '../../types/content';
import { verseService } from '../../services/verseService';
import Button from '../common/Button';

interface ConceptNavigatorProps {
  concept: BibleConcept;
}

interface GroupedScriptures {
  [bookName: string]: {
    references: string[];
    bookId: string;
  };
}

interface PassageDetails {
  reference: string;
  text: string;
  conceptExplanation: string;
  chapterContext?: string;
  bookTheme?: string;
}

const ConceptNavigator = ({ concept }: ConceptNavigatorProps) => {
  const [groupedScriptures, setGroupedScriptures] = useState<GroupedScriptures>({});
  const [selectedPassage, setSelectedPassage] = useState<string | null>(null);
  const [passageDetails, setPassageDetails] = useState<PassageDetails | null>(null);
  const [isLoadingPassage, setIsLoadingPassage] = useState(false);
  const [expandedBook, setExpandedBook] = useState<string | null>(null);

  useEffect(() => {
    // Group scriptures by book
    const grouped: GroupedScriptures = {};
    
    concept.relevantScriptures.forEach(scripture => {
      const reference = scripture.split(' - ')[0];
      const match = reference.match(/(\d?\s?\w+)\s+\d+:\d+/);
      
      if (match) {
        const bookName = match[1].trim();
        const bookId = bookName.toLowerCase().replace(/\s+/g, '');
        
        if (!grouped[bookName]) {
          grouped[bookName] = {
            references: [],
            bookId
          };
        }
        
        grouped[bookName].references.push(reference);
      }
    });
    
    setGroupedScriptures(grouped);
  }, [concept]);

  const handlePassageClick = async (reference: string) => {
    if (selectedPassage === reference) {
      setSelectedPassage(null);
      setPassageDetails(null);
      return;
    }

    setIsLoadingPassage(true);
    setSelectedPassage(reference);

    try {
      const match = reference.match(/(\d?\s?\w+)\s+(\d+):(\d+)/);
      if (match) {
        const [, book, chapter] = match;
        const bookId = book.toLowerCase().replace(/\s+/g, '');
        const chapterNum = parseInt(chapter);
        
        const verses = await verseService.getChapterVerses(bookId, chapterNum);
        
        setPassageDetails({
          reference,
          text: verses[0]?.text || 'Verse text would be loaded here',
          conceptExplanation: generateConceptExplanation(concept, reference),
          chapterContext: `This passage appears in ${book} ${chapter}, which focuses on...`,
          bookTheme: `The book of ${book} emphasizes...`
        });
      }
    } catch (error) {
      console.error('Error loading passage:', error);
      setPassageDetails({
        reference,
        text: 'Verse text would be loaded here',
        conceptExplanation: generateConceptExplanation(concept, reference)
      });
    } finally {
      setIsLoadingPassage(false);
    }
  };

  const generateConceptExplanation = (concept: BibleConcept, reference: string): string => {
    // Generate a contextual explanation based on the concept and reference
    const conceptLower = concept.title.toLowerCase();
    
    if (conceptLower.includes('healing')) {
      return `This passage demonstrates ${concept.title} by showing God's power to heal while maintaining the balance between faith and God's sovereignty. It illustrates the biblical nuance that healing is a gift from God, not a formula or guarantee.`;
    } else if (conceptLower.includes('tithing')) {
      return `This passage relates to ${concept.title} by establishing principles of generous giving and stewardship. It shows how biblical giving flows from the heart rather than mere obligation, emphasizing proportional and cheerful generosity.`;
    } else if (conceptLower.includes('warfare')) {
      return `This passage illustrates ${concept.title} by revealing the spiritual battle between God's kingdom and dark forces. It demonstrates how believers engage in spiritual conflict through truth, righteousness, and dependence on God rather than formulaic techniques.`;
    }
    
    return `This passage demonstrates the biblical understanding of ${concept.title}, showing how Scripture provides balanced perspective on this concept while avoiding common misapplications.`;
  };

  const handleBookClick = (bookName: string) => {
    if (expandedBook === bookName) {
      setExpandedBook(null);
    } else {
      setExpandedBook(bookName);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-sage-50 to-sage-100 border-b border-sage-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-sage-100 rounded-lg mr-3">
            <Search className="h-6 w-6 text-sage-600" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-neutral-900">
            {concept.title}
          </h3>
        </div>
        <p className="text-sage-800 leading-relaxed">
          {concept.description}
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Biblical Nuance */}
        <div>
          <h4 className="font-heading font-semibold text-neutral-800 mb-3 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-primary-600" />
            Biblical Nuance
          </h4>
          <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <p className="text-primary-800 leading-relaxed">
              {concept.biblicalNuance}
            </p>
          </div>
        </div>

        {/* Related Books & Passages */}
        <div>
          <h4 className="font-heading font-semibold text-neutral-800 mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-secondary-600" />
            Related Books & Passages
          </h4>
          
          <div className="space-y-3">
            {Object.entries(groupedScriptures).map(([bookName, bookData]) => {
              const isExpanded = expandedBook === bookName;
              
              return (
                <div key={bookName}>
                  <button
                    onClick={() => handleBookClick(bookName)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      isExpanded
                        ? 'border-secondary-300 bg-secondary-50'
                        : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-secondary-600 mr-3" />
                        <div>
                          <h5 className="font-semibold text-neutral-900">{bookName}</h5>
                          <p className="text-sm text-neutral-600">
                            {bookData.references.length} relevant passage{bookData.references.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="h-5 w-5 text-neutral-400" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 ml-8 space-y-2"
                      >
                        {bookData.references.map((reference, index) => {
                          const isSelected = selectedPassage === reference;
                          
                          return (
                            <div key={index}>
                              <button
                                onClick={() => handlePassageClick(reference)}
                                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                                  isSelected
                                    ? 'border-primary-300 bg-primary-50'
                                    : 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-primary-600">{reference}</span>
                                  <ExternalLink className="h-4 w-4 text-neutral-400" />
                                </div>
                              </button>

                              <AnimatePresence>
                                {isSelected && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2 ml-4"
                                  >
                                    {isLoadingPassage ? (
                                      <div className="p-4 bg-parchment-50 border border-parchment-200 rounded-lg animate-pulse">
                                        <div className="h-4 bg-parchment-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-parchment-200 rounded w-full mb-2"></div>
                                        <div className="h-3 bg-parchment-200 rounded w-2/3"></div>
                                      </div>
                                    ) : passageDetails ? (
                                      <div className="p-4 bg-parchment-50 border border-parchment-200 rounded-lg">
                                        <blockquote className="text-parchment-800 italic mb-4 text-lg border-l-4 border-parchment-400 pl-4">
                                          "{passageDetails.text}"
                                        </blockquote>
                                        
                                        <div className="space-y-3">
                                          <div>
                                            <h6 className="font-medium text-parchment-700 mb-1">
                                              How this demonstrates {concept.title}:
                                            </h6>
                                            <p className="text-sm text-parchment-700">
                                              {passageDetails.conceptExplanation}
                                            </p>
                                          </div>
                                          
                                          <div className="flex space-x-4 pt-3 border-t border-parchment-300">
                                            <Button variant="outline" size="sm">
                                              Chapter Context
                                            </Button>
                                            <Button variant="outline" size="sm">
                                              Book Theme
                                            </Button>
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Balanced Perspective */}
        <div>
          <h4 className="font-heading font-semibold text-neutral-800 mb-3">
            Balanced Perspective
          </h4>
          <div className="p-4 bg-sage-50 border border-sage-200 rounded-lg">
            <p className="text-sage-800 leading-relaxed">
              {concept.balancedPerspective}
            </p>
          </div>
        </div>

        {/* Common Abuses Warning */}
        <div>
          <h4 className="font-heading font-semibold text-neutral-800 mb-3 text-red-700">
            Common Abuses to Avoid
          </h4>
          <div className="space-y-2">
            {concept.commonAbuses.map((abuse, index) => (
              <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">• {abuse}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptNavigator;