export interface Myth {
  id: string;
  title: string;
  popularPerception: string;
  biblicalCounterArgument: {
    scripturalRefutation: string;
    contextualExplanation: string;
    soundDoctrine: string;
    supportingScriptures: string[];
  };
  category: string;
  tags: string[];
}

export interface Doctrine {
  id: string;
  title: string;
  summary: string;
  biblicalDefinition: string;
  keyScriptures: string[];
  commonMisunderstandings: string[];
  category: string;
}

export interface BibleConcept {
  id: string;
  title: string;
  description: string;
  biblicalNuance: string;
  commonAbuses: string[];
  balancedPerspective: string;
  relevantScriptures: string[];
}

export interface ScriptureVerse {
  id: string;
  reference: string;
  verse: string;
  commonMisuse: string;
  paragraph: string;
  chapterContext: string;
  bookTheme: string;
  properInterpretation: string;
}