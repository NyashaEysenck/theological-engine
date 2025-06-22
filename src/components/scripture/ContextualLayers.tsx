import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, AlertCircle, BookOpen, Eye, CheckCircle } from 'lucide-react';
import { ScriptureVerse } from '../../types/content';

interface ContextualLayersProps {
  verse: ScriptureVerse;
}

type LayerType = 'paragraph' | 'chapter' | 'book' | 'interpretation';

const ContextualLayers = ({ verse }: ContextualLayersProps) => {
  const [activeLayer, setActiveLayer] = useState<LayerType | null>(null);
  const [completedLayers, setCompletedLayers] = useState<Set<LayerType>>(new Set());

  const layers = [
    {
      id: 'paragraph' as LayerType,
      title: 'Paragraph Context',
      icon: <Layers className="h-4 w-4" />,
      content: verse.paragraph,
      description: 'Understanding the immediate context around the verse'
    },
    {
      id: 'chapter' as LayerType,
      title: 'Chapter Context',
      icon: <BookOpen className="h-4 w-4" />,
      content: verse.chapterContext,
      description: 'How this verse fits within the broader chapter theme'
    },
    {
      id: 'book' as LayerType,
      title: 'Book Theme',
      icon: <Eye className="h-4 w-4" />,
      content: verse.bookTheme,
      description: 'The overarching message and purpose of the biblical book'
    },
    {
      id: 'interpretation' as LayerType,
      title: 'Proper Interpretation',
      icon: <CheckCircle className="h-4 w-4" />,
      content: verse.properInterpretation,
      description: 'The correct understanding based on all contextual layers'
    }
  ];

  const handleLayerClick = (layerId: LayerType) => {
    if (activeLayer === layerId) {
      setActiveLayer(null);
    } else {
      setActiveLayer(layerId);
      setCompletedLayers(prev => new Set([...prev, layerId]));
    }
  };

  const getLayerStatus = (layerId: LayerType) => {
    if (completedLayers.has(layerId)) return 'completed';
    if (activeLayer === layerId) return 'active';
    return 'inactive';
  };

  const getLayerStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-300 bg-green-50 text-green-800';
      case 'active':
        return 'border-primary-300 bg-primary-50 text-primary-800';
      default:
        return 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-accent-50 to-accent-100 border-b border-accent-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-accent-100 rounded-lg mr-3">
            <Layers className="h-6 w-6 text-accent-600" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-neutral-900">
            {verse.reference}
          </h3>
        </div>
        
        {/* The Verse */}
        <blockquote className="text-lg text-accent-800 italic mb-4 border-l-4 border-accent-400 pl-4">
          {verse.verse}
        </blockquote>

        {/* Common Misuse Warning */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-800 mb-1">Common Misuse:</h4>
              <p className="text-red-700 text-sm">{verse.commonMisuse}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Layers */}
      <div className="p-6">
        <div className="mb-6">
          <h4 className="font-heading font-semibold text-neutral-800 mb-3">
            Build Understanding Through Context
          </h4>
          <p className="text-sm text-neutral-600 mb-4">
            Click each layer to progressively understand the verse in its proper context.
          </p>
        </div>

        <div className="space-y-4">
          {layers.map((layer, index) => {
            const status = getLayerStatus(layer.id);
            const isActive = activeLayer === layer.id;
            
            return (
              <div key={layer.id}>
                <button
                  onClick={() => handleLayerClick(layer.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${getLayerStyles(status)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-current bg-opacity-10 mr-3">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          {layer.icon}
                          <span className="font-medium ml-2">{layer.title}</span>
                          {completedLayers.has(layer.id) && (
                            <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
                          )}
                        </div>
                        <p className="text-xs opacity-75">{layer.description}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 ml-12"
                    >
                      <div className="p-4 bg-parchment-50 border border-parchment-200 rounded-lg">
                        <p className="text-parchment-800 leading-relaxed">
                          {layer.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">
              Context Understanding Progress
            </span>
            <span className="text-sm text-neutral-600">
              {completedLayers.size}/{layers.length}
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedLayers.size / layers.length) * 100}%` }}
            />
          </div>
          {completedLayers.size === layers.length && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-green-600 mt-2 font-medium"
            >
              ✓ Complete! You now understand this verse in its full biblical context.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContextualLayers;