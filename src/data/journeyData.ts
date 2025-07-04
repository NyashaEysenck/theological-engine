import { BiblicalLocation, JourneyRoute } from '../types/journey';

export const biblicalLocations: BiblicalLocation[] = [
  // Exodus Route
  {
    id: 'egypt_goshen',
    name: 'Goshen',
    modernName: 'Nile Delta, Egypt',
    coordinates: { lat: 30.8, lng: 31.3 },
    description: 'The land where the Israelites lived in Egypt before the Exodus',
    biblicalReferences: ['Genesis 45:10', 'Genesis 47:1-6', 'Exodus 8:22'],
    historicalPeriod: 'Patriarchal/Exodus Period',
    significance: 'Starting point of the Exodus journey; place of both blessing and bondage'
  },
  {
    id: 'red_sea',
    name: 'Red Sea Crossing',
    modernName: 'Gulf of Suez/Aqaba',
    coordinates: { lat: 29.5, lng: 32.8 },
    description: 'The miraculous crossing point where God parted the waters',
    biblicalReferences: ['Exodus 14:21-31', 'Psalm 106:9-12'],
    historicalPeriod: 'Exodus Period',
    significance: 'Site of God\'s great deliverance and Pharaoh\'s defeat'
  },
  {
    id: 'mount_sinai',
    name: 'Mount Sinai',
    modernName: 'Jebel Musa, Egypt',
    coordinates: { lat: 28.5, lng: 33.9 },
    description: 'The mountain where Moses received the Ten Commandments',
    biblicalReferences: ['Exodus 19-20', 'Exodus 24:12-18', 'Deuteronomy 4:10-15'],
    historicalPeriod: 'Exodus Period',
    significance: 'Place of covenant-making and law-giving'
  },
  {
    id: 'kadesh_barnea',
    name: 'Kadesh Barnea',
    modernName: 'Ein el-Qudeirat, Israel',
    coordinates: { lat: 30.7, lng: 34.4 },
    description: 'Oasis where Israel spent much of their wilderness wandering',
    biblicalReferences: ['Numbers 13:26', 'Numbers 20:1', 'Deuteronomy 1:46'],
    historicalPeriod: 'Wilderness Period',
    significance: 'Place of rebellion and judgment; turning point in wilderness journey'
  },
  {
    id: 'jericho',
    name: 'Jericho',
    modernName: 'Tell es-Sultan, Palestine',
    coordinates: { lat: 31.9, lng: 35.4 },
    description: 'First city conquered in the Promised Land',
    biblicalReferences: ['Joshua 6:1-27', 'Joshua 2:1-24'],
    historicalPeriod: 'Conquest Period',
    significance: 'Symbol of God\'s power and faithfulness in conquest'
  },

  // Paul's Missionary Journeys
  {
    id: 'antioch_syria',
    name: 'Antioch',
    modernName: 'Antakya, Turkey',
    coordinates: { lat: 36.2, lng: 36.2 },
    description: 'Base of operations for Paul\'s missionary journeys',
    biblicalReferences: ['Acts 11:19-26', 'Acts 13:1-3', 'Acts 14:26-28'],
    historicalPeriod: 'Apostolic Period',
    significance: 'First place believers were called Christians; missionary sending center'
  },
  {
    id: 'cyprus_salamis',
    name: 'Salamis, Cyprus',
    modernName: 'Near Famagusta, Cyprus',
    coordinates: { lat: 35.2, lng: 33.9 },
    description: 'First stop on Paul\'s first missionary journey',
    biblicalReferences: ['Acts 13:4-5'],
    historicalPeriod: 'Apostolic Period',
    significance: 'Beginning of systematic Gentile evangelization'
  },
  {
    id: 'lystra',
    name: 'Lystra',
    modernName: 'Hatunsaray, Turkey',
    coordinates: { lat: 37.6, lng: 32.5 },
    description: 'City where Paul was stoned and left for dead',
    biblicalReferences: ['Acts 14:6-20', 'Acts 16:1-3'],
    historicalPeriod: 'Apostolic Period',
    significance: 'Place of suffering and Timothy\'s hometown'
  },
  {
    id: 'philippi',
    name: 'Philippi',
    modernName: 'Filippoi, Greece',
    coordinates: { lat: 41.0, lng: 24.3 },
    description: 'First European city evangelized by Paul',
    biblicalReferences: ['Acts 16:11-40', 'Philippians 1:1'],
    historicalPeriod: 'Apostolic Period',
    significance: 'Gateway to Europe; Lydia\'s conversion; Paul and Silas imprisoned'
  },
  {
    id: 'athens',
    name: 'Athens',
    modernName: 'Athens, Greece',
    coordinates: { lat: 37.9, lng: 23.7 },
    description: 'Intellectual center where Paul preached at the Areopagus',
    biblicalReferences: ['Acts 17:16-34'],
    historicalPeriod: 'Apostolic Period',
    significance: 'Philosophical engagement with Greek culture'
  },
  {
    id: 'corinth',
    name: 'Corinth',
    modernName: 'Korinthos, Greece',
    coordinates: { lat: 37.9, lng: 22.9 },
    description: 'Major commercial city where Paul spent 18 months',
    biblicalReferences: ['Acts 18:1-18', '1 Corinthians 1:2', '2 Corinthians 1:1'],
    historicalPeriod: 'Apostolic Period',
    significance: 'Strategic ministry center; recipient of two major epistles'
  },
  {
    id: 'ephesus',
    name: 'Ephesus',
    modernName: 'Selçuk, Turkey',
    coordinates: { lat: 37.9, lng: 27.3 },
    description: 'Major city where Paul ministered for three years',
    biblicalReferences: ['Acts 19:1-41', 'Ephesians 1:1', 'Revelation 2:1-7'],
    historicalPeriod: 'Apostolic Period',
    significance: 'Center of Asian ministry; site of great revival and opposition'
  },

  // Jesus's Ministry
  {
    id: 'nazareth',
    name: 'Nazareth',
    modernName: 'Nazareth, Israel',
    coordinates: { lat: 32.7, lng: 35.3 },
    description: 'Jesus\'s hometown where He grew up',
    biblicalReferences: ['Luke 1:26-38', 'Luke 4:16-30', 'Matthew 2:23'],
    historicalPeriod: 'Gospel Period',
    significance: 'Place of Jesus\'s upbringing and early rejection'
  },
  {
    id: 'capernaum',
    name: 'Capernaum',
    modernName: 'Kfar Nahum, Israel',
    coordinates: { lat: 32.9, lng: 35.6 },
    description: 'Jesus\'s ministry headquarters by the Sea of Galilee',
    biblicalReferences: ['Matthew 4:13', 'Mark 2:1', 'Luke 4:31'],
    historicalPeriod: 'Gospel Period',
    significance: 'Center of Galilean ministry; many miracles performed here'
  },
  {
    id: 'jerusalem',
    name: 'Jerusalem',
    modernName: 'Jerusalem, Israel',
    coordinates: { lat: 31.8, lng: 35.2 },
    description: 'Holy city; site of Jesus\'s crucifixion and resurrection',
    biblicalReferences: ['Luke 2:22-38', 'John 2:13-25', 'Luke 23-24'],
    historicalPeriod: 'All Periods',
    significance: 'Center of Jewish worship; site of salvation accomplished'
  }
];

export const journeyRoutes: JourneyRoute[] = [
  {
    id: 'exodus_route',
    name: 'The Exodus Journey',
    description: 'The miraculous journey of Israel from Egyptian bondage to the Promised Land',
    type: 'exodus',
    character: 'Moses and the Israelites',
    biblicalPeriod: '1446-1406 BC (traditional dating)',
    relatedBooks: ['exodus', 'leviticus', 'numbers', 'deuteronomy'],
    relatedChapters: [
      { bookId: 'exodus', chapters: [12, 13, 14, 15, 16, 17, 18, 19, 20] },
      { bookId: 'numbers', chapters: [10, 11, 12, 13, 14, 20, 21] },
      { bookId: 'deuteronomy', chapters: [1, 2, 3, 8, 34] }
    ],
    waypoints: [
      biblicalLocations.find(l => l.id === 'egypt_goshen')!,
      biblicalLocations.find(l => l.id === 'red_sea')!,
      biblicalLocations.find(l => l.id === 'mount_sinai')!,
      biblicalLocations.find(l => l.id === 'kadesh_barnea')!,
      biblicalLocations.find(l => l.id === 'jericho')!
    ],
    routeColor: '#dc2626',
    estimatedDuration: '40 years',
    historicalContext: 'God\'s deliverance of His people from slavery and formation as a nation'
  },
  {
    id: 'paul_first_journey',
    name: 'Paul\'s First Missionary Journey',
    description: 'Paul and Barnabas\'s pioneering mission to Cyprus and Asia Minor',
    type: 'missionary',
    character: 'Paul and Barnabas',
    biblicalPeriod: 'AD 46-48',
    relatedBooks: ['acts'],
    relatedChapters: [
      { bookId: 'acts', chapters: [13, 14] }
    ],
    waypoints: [
      biblicalLocations.find(l => l.id === 'antioch_syria')!,
      biblicalLocations.find(l => l.id === 'cyprus_salamis')!,
      biblicalLocations.find(l => l.id === 'lystra')!
    ],
    routeColor: '#2563eb',
    estimatedDuration: '2 years',
    historicalContext: 'First systematic evangelization of Gentiles; establishment of churches in Asia Minor'
  },
  {
    id: 'paul_second_journey',
    name: 'Paul\'s Second Missionary Journey',
    description: 'Paul\'s mission that brought the Gospel to Europe',
    type: 'missionary',
    character: 'Paul, Silas, and Timothy',
    biblicalPeriod: 'AD 49-52',
    relatedBooks: ['acts'],
    relatedChapters: [
      { bookId: 'acts', chapters: [15, 16, 17, 18] }
    ],
    waypoints: [
      biblicalLocations.find(l => l.id === 'antioch_syria')!,
      biblicalLocations.find(l => l.id === 'lystra')!,
      biblicalLocations.find(l => l.id === 'philippi')!,
      biblicalLocations.find(l => l.id === 'athens')!,
      biblicalLocations.find(l => l.id === 'corinth')!
    ],
    routeColor: '#059669',
    estimatedDuration: '3 years',
    historicalContext: 'Gospel reaches Europe; major churches established in Greece'
  },
  {
    id: 'paul_third_journey',
    name: 'Paul\'s Third Missionary Journey',
    description: 'Paul\'s extended ministry in Ephesus and final visit to established churches',
    type: 'missionary',
    character: 'Paul and companions',
    biblicalPeriod: 'AD 53-57',
    relatedBooks: ['acts'],
    relatedChapters: [
      { bookId: 'acts', chapters: [18, 19, 20] }
    ],
    waypoints: [
      biblicalLocations.find(l => l.id === 'antioch_syria')!,
      biblicalLocations.find(l => l.id === 'ephesus')!,
      biblicalLocations.find(l => l.id === 'corinth')!,
      biblicalLocations.find(l => l.id === 'philippi')!
    ],
    routeColor: '#7c3aed',
    estimatedDuration: '4 years',
    historicalContext: 'Consolidation of churches; major epistles written; preparation for Jerusalem'
  },
  {
    id: 'jesus_ministry',
    name: 'Jesus\'s Ministry Journey',
    description: 'Key locations in Jesus\'s earthly ministry',
    type: 'ministry',
    character: 'Jesus Christ',
    biblicalPeriod: 'AD 30-33',
    relatedBooks: ['matthew', 'mark', 'luke', 'john'],
    relatedChapters: [
      { bookId: 'matthew', chapters: [4, 5, 6, 7, 8, 9] },
      { bookId: 'mark', chapters: [1, 2, 3, 4, 5, 6] },
      { bookId: 'luke', chapters: [4, 5, 6, 7, 8, 9] },
      { bookId: 'john', chapters: [1, 2, 3, 4, 5, 6] }
    ],
    waypoints: [
      biblicalLocations.find(l => l.id === 'nazareth')!,
      biblicalLocations.find(l => l.id === 'capernaum')!,
      biblicalLocations.find(l => l.id === 'jerusalem')!
    ],
    routeColor: '#ea580c',
    estimatedDuration: '3.5 years',
    historicalContext: 'The incarnate Son of God\'s earthly ministry, death, and resurrection'
  }
];

export const getJourneyByBookChapter = (bookId: string, chapter: number): JourneyRoute[] => {
  return journeyRoutes.filter(route => 
    route.relatedChapters.some(rc => 
      rc.bookId === bookId && rc.chapters.includes(chapter)
    )
  );
};

export const getLocationsByJourney = (journeyId: string): BiblicalLocation[] => {
  const journey = journeyRoutes.find(j => j.id === journeyId);
  return journey ? journey.waypoints : [];
};