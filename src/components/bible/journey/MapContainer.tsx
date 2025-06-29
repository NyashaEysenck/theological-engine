import { RefObject } from 'react';

interface MapContainerProps {
  mapRef: RefObject<HTMLDivElement>;
  isLoaded: boolean;
  isConfigured: boolean;
}

const MapContainer = ({ mapRef, isLoaded, isConfigured }: MapContainerProps) => {
  return (
    <div className="relative">
      <div 
        ref={mapRef}
        className="w-full h-96 lg:h-[500px] rounded-lg border border-neutral-200"
      />
      
      {!isLoaded && isConfigured && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;