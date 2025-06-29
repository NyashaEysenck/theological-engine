import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Navigation, Play, Pause, RotateCcw, Info, MapPin, Route, AlertCircle } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import { JourneyRoute, BiblicalLocation, MapViewState } from '../../types/journey';
import { journeyRoutes, getJourneyByBookChapter } from '../../data/journeyData';
import { mapsService } from '../../services/mapsService';
import Button from '../common/Button';
import MapConfigError from './journey/MapConfigError';
import RouteSelector from './journey/RouteSelector';
import MapContainer from './journey/MapContainer';
import LocationDetails from './journey/LocationDetails';
import RouteDetails from './journey/RouteDetails';
import AnimationControls from './journey/AnimationControls';

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
          setConfigError('Google Maps API key not configured');
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
    return <MapConfigError />;
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
          <RouteSelector 
            relevantJourneys={relevantJourneys}
            journeyRoutes={journeyRoutes}
            selectedRoute={selectedRoute}
            onRouteSelect={setSelectedRoute}
          />

          {/* Animation Controls */}
          {selectedRoute && (
            <AnimationControls
              isAnimating={isAnimating}
              animationProgress={animationProgress}
              animationSpeed={mapViewState.animationSpeed}
              onAnimate={animateRoute}
              onReset={resetAnimation}
              onSpeedChange={handleAnimationSpeedChange}
            />
          )}
        </div>

        {/* Map Container */}
        <div className="lg:col-span-2">
          <MapContainer 
            mapRef={mapRef}
            isLoaded={isLoaded}
            isConfigured={isConfigured}
          />

          {/* Selected Location Info */}
          <AnimatePresence>
            {selectedLocation && (
              <LocationDetails 
                location={selectedLocation} 
                onClose={() => setSelectedLocation(null)} 
              />
            )}
          </AnimatePresence>

          {/* Route Information */}
          {selectedRoute && (
            <RouteDetails route={selectedRoute} />
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneyVisualization;