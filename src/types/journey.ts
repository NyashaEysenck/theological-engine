export interface BiblicalLocation {
  id: string;
  name: string;
  modernName?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  biblicalReferences: string[];
  historicalPeriod: string;
  significance: string;
}

export interface JourneyRoute {
  id: string;
  name: string;
  description: string;
  type: 'missionary' | 'exodus' | 'conquest' | 'exile' | 'ministry' | 'pilgrimage';
  character: string;
  biblicalPeriod: string;
  relatedBooks: string[];
  relatedChapters: { bookId: string; chapters: number[] }[];
  waypoints: BiblicalLocation[];
  routeColor: string;
  estimatedDuration?: string;
  historicalContext: string;
}

export interface JourneyProgress {
  routeId: string;
  completedWaypoints: string[];
  unlockedSegments: number;
  lastUpdated: string;
}

export interface MapViewState {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  selectedRoute: string | null;
  selectedLocation: string | null;
  showAllRoutes: boolean;
  animationSpeed: number;
}