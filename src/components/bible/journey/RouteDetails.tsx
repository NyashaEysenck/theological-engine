import { JourneyRoute } from '../../../types/journey';

interface RouteDetailsProps {
  route: JourneyRoute;
}

const RouteDetails = ({ route }: RouteDetailsProps) => {
  return (
    <div className="mt-4 p-4 bg-sage-50 rounded-lg border border-sage-200">
      <div className="flex items-center mb-3">
        <div 
          className="w-4 h-4 rounded-full mr-3"
          style={{ backgroundColor: route.routeColor }}
        />
        <h4 className="font-heading font-semibold text-neutral-900">
          {route.name}
        </h4>
      </div>
      <p className="text-sm text-neutral-700 mb-3">{route.description}</p>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-neutral-600">Duration:</span>
          <p className="text-neutral-700">{route.estimatedDuration}</p>
        </div>
        <div>
          <span className="font-medium text-neutral-600">Period:</span>
          <p className="text-neutral-700">{route.biblicalPeriod}</p>
        </div>
      </div>
      <div className="mt-3">
        <span className="font-medium text-neutral-600">Historical Context:</span>
        <p className="text-sm text-neutral-700 mt-1">{route.historicalContext}</p>
      </div>
    </div>
  );
};

export default RouteDetails;