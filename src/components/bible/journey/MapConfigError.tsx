import { AlertCircle, Map } from 'lucide-react';

const MapConfigError = () => {
  return (
    <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="flex items-center">
          <div className="p-2 bg-primary-100 rounded-lg mr-3">
            <Map className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-neutral-900">
              Journey Maps
            </h2>
            <p className="text-sm text-neutral-600">
              Explore biblical journeys and locations
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-md">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="font-medium text-amber-800 text-lg mb-3">Maps Feature Unavailable</h3>
            <p className="text-amber-700 mb-4">
              We're unable to load the interactive maps feature at this time. This could be due to a temporary connection issue or configuration setting.
            </p>
            <div className="text-sm text-amber-600 bg-amber-100 p-3 rounded-lg">
              <p className="font-medium mb-2">You can still explore:</p>
              <ul className="list-disc list-inside space-y-1 text-left">
                <li>Scripture reading with verse-by-verse explanations</li>
                <li>Historical and geographical context in text format</li>
                <li>Community discussions about biblical locations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapConfigError;