import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ScrollText, Clock, Map, Globe, Users } from 'lucide-react';
import { HistoricalContext, GeographicContext, ChapterIntroduction } from '../../types/bible';

interface ContextPanelProps {
  expandedSection: string | null;
  onToggleSection: (section: string) => void;
  historicalContext: HistoricalContext;
  geographicContext: GeographicContext;
  chapterIntro: ChapterIntroduction;
}

const ContextPanel = ({
  expandedSection,
  onToggleSection,
  historicalContext,
  geographicContext,
  chapterIntro
}: ContextPanelProps) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Chapter Introduction */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <button
          onClick={() => onToggleSection('intro')}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center">
            <ScrollText className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-heading font-semibold">Chapter Introduction</h2>
          </div>
          {expandedSection === 'intro' ? (
            <ChevronUp className="h-5 w-5 text-neutral-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-neutral-400" />
          )}
        </button>
        
        {expandedSection === 'intro' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4"
          >
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Summary</h3>
              <p className="text-neutral-700">{chapterIntro.summary}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Key Themes</h3>
              <ul className="list-disc list-inside text-neutral-700">
                {chapterIntro.themes.map((theme, index) => (
                  <li key={index}>{theme}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Key Characters</h3>
              <div className="space-y-2">
                {chapterIntro.characters.map((character, index) => (
                  <div key={index} className="flex items-center">
                    <Users className="h-4 w-4 text-primary-600 mr-2" />
                    <span className="font-medium">{character.name}</span>
                    <span className="text-neutral-600 ml-2">- {character.role}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Chapter Structure</h3>
              <ul className="list-disc list-inside text-neutral-700">
                {chapterIntro.structure.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      {/* Historical Context */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <button
          onClick={() => onToggleSection('historical')}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-heading font-semibold">Historical Context</h2>
          </div>
          {expandedSection === 'historical' ? (
            <ChevronUp className="h-5 w-5 text-neutral-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-neutral-400" />
          )}
        </button>
        
        {expandedSection === 'historical' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="font-medium text-neutral-900 mb-1">Time Period</p>
                <p className="text-neutral-700">{historicalContext.period}</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="font-medium text-neutral-900 mb-1">Approximate Date</p>
                <p className="text-neutral-700">{historicalContext.date}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Historical Background</h3>
              <p className="text-neutral-700">{historicalContext.background}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Concurrent Events</h3>
              <ul className="list-disc list-inside text-neutral-700">
                {historicalContext.concurrent.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      {/* Geographic Context */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <button
          onClick={() => onToggleSection('geographic')}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center">
            <Map className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-heading font-semibold">Geographic Context</h2>
          </div>
          {expandedSection === 'geographic' ? (
            <ChevronUp className="h-5 w-5 text-neutral-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-neutral-400" />
          )}
        </button>
        
        {expandedSection === 'geographic' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4"
          >
            <div className="aspect-video bg-neutral-100 rounded-lg flex items-center justify-center">
              <Globe className="h-12 w-12 text-neutral-400" />
              <p className="ml-2 text-neutral-600">Interactive map coming soon</p>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Main Location</h3>
              <p className="text-neutral-700">{geographicContext.mainLocation}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Related Sites</h3>
              <ul className="list-disc list-inside text-neutral-700">
                {geographicContext.relatedSites.map((site, index) => (
                  <li key={index}>{site}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-neutral-900 mb-2">Important Routes</h3>
              <ul className="list-disc list-inside text-neutral-700">
                {geographicContext.routes.map((route, index) => (
                  <li key={index}>{route}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContextPanel;