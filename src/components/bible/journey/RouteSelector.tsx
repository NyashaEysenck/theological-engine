import { useState } from 'react';
import { JourneyRoute } from '../../../types/journey';

interface RouteSelectorProps {
  relevantJourneys: JourneyRoute[];
  journeyRoutes: JourneyRoute[];
  selectedRoute: JourneyRoute | null;
  onRouteSelect: (route: JourneyRoute) => void;
}

const RouteSelector = ({ 
  relevantJourneys, 
  journeyRoutes, 
  selectedRoute, 
  onRouteSelect 
}: RouteSelectorProps) => {
  return (
    <div>
      <h3 className="font-heading font-semibold text-neutral-900 mb-4">
        Available Journeys
      </h3>
      
      {/* Relevant journeys for current reading */}
      {relevantJourneys.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-primary-600 mb-3 uppercase tracking-wider">
            Related to Current Reading
          </h4>
          <div className="space-y-2">
            {relevantJourneys.map(journey => (
              <button
                key={journey.id}
                onClick={() => onRouteSelect(journey)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedRoute?.id === journey.id
                    ? 'border-primary-300 bg-primary-50'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: journey.routeColor }}
                  />
                  <span className="font-medium text-neutral-900">{journey.name}</span>
                </div>
                <p className="text-sm text-neutral-600">{journey.character}</p>
                <p className="text-xs text-neutral-500 mt-1">{journey.biblicalPeriod}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* All journeys */}
      <div>
        <h4 className="text-sm font-medium text-neutral-600 mb-3 uppercase tracking-wider">
          All Biblical Journeys
        </h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {journeyRoutes.map(journey => (
            <button
              key={journey.id}
              onClick={() => onRouteSelect(journey)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedRoute?.id === journey.id
                  ? 'border-primary-300 bg-primary-50'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="flex items-center mb-1">
                <div 
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: journey.routeColor }}
                />
                <span className="font-medium text-sm text-neutral-900">{journey.name}</span>
              </div>
              <p className="text-xs text-neutral-600">{journey.character}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteSelector;