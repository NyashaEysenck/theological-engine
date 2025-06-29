import { motion } from 'framer-motion';
import { MapPin, Info } from 'lucide-react';
import { BiblicalLocation } from '../../../types/journey';

interface LocationDetailsProps {
  location: BiblicalLocation;
  onClose: () => void;
}

const LocationDetails = ({ location, onClose }: LocationDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-4 p-4 bg-parchment-50 rounded-lg border border-parchment-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-primary-600 mr-2" />
            <h4 className="font-heading font-semibold text-neutral-900">
              {location.name}
            </h4>
          </div>
          {location.modernName && (
            <p className="text-sm text-neutral-600 mb-2">
              Modern location: {location.modernName}
            </p>
          )}
          <p className="text-sm text-neutral-700 mb-3">
            {location.description}
          </p>
          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Biblical References:
              </span>
              <p className="text-sm text-neutral-700">
                {location.biblicalReferences.join(', ')}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider">
                Significance:
              </span>
              <p className="text-sm text-neutral-700">
                {location.significance}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-600 ml-4"
        >
          <Info className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default LocationDetails;