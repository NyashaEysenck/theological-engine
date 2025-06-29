import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Navigation, Play, Pause, RotateCcw, Info, MapPin, Route, AlertCircle } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import { JourneyRoute, BiblicalLocation, MapViewState } from '../../types/journey';
import { journeyRoutes, getJourneyByBookChapter } from '../../data/journeyData';
import { mapsService } from '../../services/mapsService';
import Button from '../common/Button';

interface JourneyVisualizationProps {
  currentBook?: string;
  currentChapter?: number;
  onLocationSelect?: (location: BiblicalLocation) => void;
}

const JourneyVisualization = ({ 
  currentBook, 
  currentChapter, 
  onLocationSelect 
}: JourneyVisualizationProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const animationRef = useRef<number | null>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<JourneyRoute | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<BiblicalLocation | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [mapViewState, setMapViewState] = useState<MapViewState>({
    center: { lat: 31.5, lng: 35.0 }, // Centered on Holy Land
    zoom: 6,
    selectedRoute: null,
    selectedLocation: null,
    showAllRoutes: false,
    animationSpeed: 1
  });

  // Get relevant journeys for current reading
  const relevantJourneys = currentBook && currentChapter 
    ? getJourneyByBookChapter(currentBook, currentChapter)
    : [];

  // Check maps configuration and initialize
  useEffect(() => {
    const initializeMaps = async () => {
      try {
        // Check if maps service is configured
        const health = await mapsService.checkMapsHealth();
        
        if (!health.configured) {
          setConfigError('Google Maps API key not configured on backend');
          setIsConfigured(false);
          return;
        }

        // Get maps configuration from backend
        const config = await mapsService.getMapsConfig();
        setIsConfigured(true);
        setConfigError(null);

        // Initialize Google Maps with backend configuration
        await initMap(config);
      } catch (error) {
        console.error('Error initializing maps:', error);
        setConfigError('Failed to load maps configuration');
        setIsConfigured(false);
      }
    };

    initializeMaps();
  }, []);

  const initMap = async (config: { apiKey: string; libraries: string[]; version: string }) => {
    const loader = new Loader({
      apiKey: config.apiKey,
      version: config.version,
      libraries: config.libraries
    });

    try {
      await loader.load();
      
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: mapViewState.center,
          zoom: mapViewState.zoom,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          styles: [
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#4A90E2' }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#F5E6D3' }]
            }
          ]
        });

        googleMapRef.current = map;
        setIsLoaded(true);
      }
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      setConfigError('Failed to load Google Maps');
    }
  };

  // Update map when route selection changes
  useEffect(() => {
    if (!googleMapRef.current || !isLoaded) return;

    // Clear existing markers and polylines
    clearMapElements();

    if (selectedRoute) {
      displayRoute(selectedRoute);
    } else if (mapViewState.showAllRoutes) {
      displayAllRoutes();
    }
  }, [selectedRoute, isLoaded, mapViewState.showAllRoutes]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const clearMapElements = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    polylinesRef.current.forEach(polyline => polyline.setMap(null));
    markersRef.current = [];
    polylinesRef.current = [];
  };

  const displayRoute = (route: JourneyRoute) => {
    if (!googleMapRef.current) return;

    const map = googleMapRef.current;
    const bounds = new google.maps.LatLngBounds();

    // Add waypoint markers with labels
    route.waypoints.forEach((location, index) => {
      // Create a custom marker with the location name
      const marker = new google.maps.Marker({
        position: location.coordinates,
        map: map,
        title: location.name,
        label: {
          text: (index + 1).toString(),
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '14px'
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: route.routeColor,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      // Add a custom info window with the location name
      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="font-weight: bold; color: #333;">${location.name}</div>`,
        pixelOffset: new google.maps.Size(0, -10)
      });
      
      // Show the info window by default
      infoWindow.open(map, marker);

      marker.addListener('click', () => {
        setSelectedLocation(location);
        onLocationSelect?.(location);
      });

      markersRef.current.push(marker);
      bounds.extend(location.coordinates);
    });

    // Add route polyline
    const routePath = route.waypoints.map(wp => wp.coordinates);
    const polyline = new google.maps.Polyline({
      path: routePath,
      geodesic: true,
      strokeColor: route.routeColor,
      strokeOpacity: 1.0,
      strokeWeight: 4
    });

    polyline.setMap(map);
    polylinesRef.current.push(polyline);

    // Fit map to route bounds with padding
    map.fitBounds(bounds, 50); // 50px padding
  };

  const displayAllRoutes = () => {
    if (!googleMapRef.current) return;

    const map = googleMapRef.current;
    const bounds = new google.maps.LatLngBounds();

    journeyRoutes.forEach(route => {
      const routePath = route.waypoints.map(wp => wp.coordinates);
      const polyline = new google.maps.Polyline({
        path: routePath,
        geodesic: true,
        strokeColor: route.routeColor,
        strokeOpacity: 0.6,
        strokeWeight: 3
      });

      polyline.setMap(map);
      polylinesRef.current.push(polyline);

      // Add markers for each waypoint with labels
      route.waypoints.forEach((location) => {
        const marker = new google.maps.Marker({
          position: location.coordinates,
          map: map,
          title: location.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6,
            fillColor: route.routeColor,
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 1
          }
        });

        // Add a custom info window with the location name
        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="font-weight: bold; color: #333;">${location.name}</div>`,
          pixelOffset: new google.maps.Size(0, -8)
        });
        
        // Show the info window by default
        infoWindow.open(map, marker);

        marker.addListener('click', () => {
          setSelectedLocation(location);
          onLocationSelect?.(location);
        });

        markersRef.current.push(marker);
        bounds.extend(location.coordinates);
      });
    });

    map.fitBounds(bounds, 50);
  };

  const animateRoute = () => {
    if (!selectedRoute || !googleMapRef.current) return;
    
    // Stop any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsAnimating(true);
    setAnimationProgress(0);
    
    const route = selectedRoute;
    const waypoints = route.waypoints;
    const totalWaypoints = waypoints.length;
    
    // Create a new polyline for animation
    clearMapElements();
    
    const map = googleMapRef.current;
    const bounds = new google.maps.LatLngBounds();
    
    // Add all waypoint markers but make them initially invisible
    const markers: google.maps.Marker[] = [];
    const infoWindows: google.maps.InfoWindow[] = [];
    
    waypoints.forEach((location, index) => {
      const marker = new google.maps.Marker({
        position: location.coordinates,
        map: map,
        title: location.name,
        visible: false,
        label: {
          text: (index + 1).toString(),
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '14px'
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: route.routeColor,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });
      
      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="font-weight: bold; color: #333;">${location.name}</div>`,
        pixelOffset: new google.maps.Size(0, -10)
      });
      
      marker.addListener('click', () => {
        setSelectedLocation(location);
        onLocationSelect?.(location);
      });
      
      markers.push(marker);
      infoWindows.push(infoWindow);
      markersRef.current.push(marker);
      bounds.extend(location.coordinates);
    });
    
    // Create the polyline with no points initially
    const polyline = new google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: route.routeColor,
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
    
    polyline.setMap(map);
    polylinesRef.current.push(polyline);
    
    // Fit map to route bounds
    map.fitBounds(bounds, 50);
    
    // Animation variables
    let currentStep = 0;
    const animationDuration = 5000 / mapViewState.animationSpeed; // 5 seconds total
    const startTime = performance.now();
    
    // Animation function
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      setAnimationProgress(progress);
      
      // Calculate how many waypoints should be visible
      const waypointIndex = Math.min(
        Math.floor(progress * totalWaypoints),
        totalWaypoints - 1
      );
      
      // Update polyline path
      const currentPath = waypoints.slice(0, waypointIndex + 1).map(wp => wp.coordinates);
      polyline.setPath(currentPath);
      
      // Show markers up to current waypoint
      for (let i = 0; i <= waypointIndex; i++) {
        if (!markers[i].getVisible()) {
          markers[i].setVisible(true);
          infoWindows[i].open(map, markers[i]);
          
          // Highlight current location
          if (i === waypointIndex) {
            setSelectedLocation(waypoints[i]);
            map.panTo(waypoints[i].coordinates);
            map.setZoom(8); // Zoom in a bit to see details
          }
        }
      }
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        setIsAnimating(false);
        animationRef.current = null;
      }
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
  };

  const resetAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    setIsAnimating(false);
    setAnimationProgress(0);
    setSelectedLocation(null);
    
    // Redisplay the route normally
    if (selectedRoute) {
      clearMapElements();
      displayRoute(selectedRoute);
    }
  };

  const handleAnimationSpeedChange = (speed: number) => {
    setMapViewState(prev => ({
      ...prev,
      animationSpeed: speed
    }));
  };

  // Show configuration error if maps are not properly set up
  if (!isConfigured || configError) {
    return (
      <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg mr-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-neutral-900">
                Maps Configuration Required
              </h2>
              <p className="text-sm text-neutral-600">
                Google Maps API needs to be configured in the backend
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-medium text-red-800 mb-2">Configuration Error</h3>
            <p className="text-red-700 text-sm mb-4">
              {configError || 'Google Maps API key not configured'}
            </p>
            <div className="text-sm text-red-600">
              <p className="font-medium mb-2">To enable maps:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Get a Google Maps API key from the Google Cloud Console</li>
                <li>Add it to your backend environment variables as GOOGLE_MAPS_API_KEY</li>
                <li>Restart the backend server</li>
                <li>Refresh this page</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg mr-3">
              <Map className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-neutral-900">
                Journey Visualization
              </h2>
              <p className="text-sm text-neutral-600">
                Explore biblical journeys and missionary routes
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMapViewState(prev => ({ ...prev, showAllRoutes: !prev.showAllRoutes }))}
            >
              <Route className="h-4 w-4 mr-2" />
              {mapViewState.showAllRoutes ? 'Hide All' : 'Show All'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Route Selection Panel */}
        <div className="lg:col-span-1 space-y-4">
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
                      onClick={() => setSelectedRoute(journey)}
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
                    onClick={() => setSelectedRoute(journey)}
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

          {/* Animation Controls */}
          {selectedRoute && (
            <div className="border-t border-neutral-200 pt-4">
              <h4 className="font-medium text-neutral-900 mb-3">Animation Controls</h4>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={animateRoute}
                    disabled={isAnimating}
                    className="flex-1"
                  >
                    {isAnimating ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Animating...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Animate Route
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetAnimation}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Animation speed control */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Animation Speed</span>
                    <span>{mapViewState.animationSpeed}x</span>
                  </div>
                  <div className="flex space-x-2">
                    {[0.5, 1, 2, 4].map(speed => (
                      <button
                        key={speed}
                        onClick={() => handleAnimationSpeedChange(speed)}
                        className={`flex-1 py-1 px-2 text-xs rounded ${
                          mapViewState.animationSpeed === speed
                            ? 'bg-primary-100 text-primary-700 font-medium'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
                
                {isAnimating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-neutral-600">
                      <span>Progress</span>
                      <span>{Math.round(animationProgress * 100)}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${animationProgress * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Map Container */}
        <div className="lg:col-span-2">
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

          {/* Selected Location Info */}
          <AnimatePresence>
            {selectedLocation && (
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
                        {selectedLocation.name}
                      </h4>
                    </div>
                    {selectedLocation.modernName && (
                      <p className="text-sm text-neutral-600 mb-2">
                        Modern location: {selectedLocation.modernName}
                      </p>
                    )}
                    <p className="text-sm text-neutral-700 mb-3">
                      {selectedLocation.description}
                    </p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider">
                          Biblical References:
                        </span>
                        <p className="text-sm text-neutral-700">
                          {selectedLocation.biblicalReferences.join(', ')}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-neutral-600 uppercase tracking-wider">
                          Significance:
                        </span>
                        <p className="text-sm text-neutral-700">
                          {selectedLocation.significance}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-neutral-400 hover:text-neutral-600 ml-4"
                  >
                    <Info className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Route Information */}
          {selectedRoute && (
            <div className="mt-4 p-4 bg-sage-50 rounded-lg border border-sage-200">
              <div className="flex items-center mb-3">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: selectedRoute.routeColor }}
                />
                <h4 className="font-heading font-semibold text-neutral-900">
                  {selectedRoute.name}
                </h4>
              </div>
              <p className="text-sm text-neutral-700 mb-3">{selectedRoute.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-neutral-600">Duration:</span>
                  <p className="text-neutral-700">{selectedRoute.estimatedDuration}</p>
                </div>
                <div>
                  <span className="font-medium text-neutral-600">Period:</span>
                  <p className="text-neutral-700">{selectedRoute.biblicalPeriod}</p>
                </div>
              </div>
              <div className="mt-3">
                <span className="font-medium text-neutral-600">Historical Context:</span>
                <p className="text-sm text-neutral-700 mt-1">{selectedRoute.historicalContext}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneyVisualization;