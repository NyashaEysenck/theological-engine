import { myths } from '../data/myths';
import { doctrines } from '../data/doctrines';
import { bibleConcepts } from '../data/bibleConcepts';
import { scriptureContext } from '../data/scriptureContext';
import { simulateNetworkDelay } from '../utils/helpers';
import { Myth, Doctrine, BibleConcept, ScriptureVerse } from '../types/content';

class ContentService {
  // Myths
  async getMyths(searchTerm?: string): Promise<Myth[]> {
    await simulateNetworkDelay();
    
    if (!searchTerm) {
      return myths;
    }
    
    const normalized = searchTerm.toLowerCase();
    return myths.filter(myth => 
      myth.title.toLowerCase().includes(normalized) || 
      myth.popularPerception.toLowerCase().includes(normalized)
    );
  }
  
  async getMythById(id: string): Promise<Myth | null> {
    await simulateNetworkDelay();
    return myths.find(myth => myth.id === id) || null;
  }
  
  // Doctrines
  async getDoctrines(searchTerm?: string): Promise<Doctrine[]> {
    await simulateNetworkDelay();
    
    if (!searchTerm) {
      return doctrines;
    }
    
    const normalized = searchTerm.toLowerCase();
    return doctrines.filter(doctrine => 
      doctrine.title.toLowerCase().includes(normalized) || 
      doctrine.summary.toLowerCase().includes(normalized)
    );
  }
  
  async getDoctrineById(id: string): Promise<Doctrine | null> {
    await simulateNetworkDelay();
    return doctrines.find(doctrine => doctrine.id === id) || null;
  }
  
  // Bible Concepts
  async searchBibleConcepts(query: string): Promise<BibleConcept[]> {
    await simulateNetworkDelay();
    
    if (!query) {
      return [];
    }
    
    const normalized = query.toLowerCase();
    return bibleConcepts.filter(concept => 
      concept.title.toLowerCase().includes(normalized) || 
      concept.description.toLowerCase().includes(normalized)
    );
  }
  
  async getBibleConceptById(id: string): Promise<BibleConcept | null> {
    await simulateNetworkDelay();
    return bibleConcepts.find(concept => concept.id === id) || null;
  }
  
  // Scripture Context
  async getCommonlyMisusedVerses(): Promise<ScriptureVerse[]> {
    await simulateNetworkDelay();
    return scriptureContext;
  }
  
  async getVerseById(id: string): Promise<ScriptureVerse | null> {
    await simulateNetworkDelay();
    return scriptureContext.find(verse => verse.id === id) || null;
  }
}

export const contentService = new ContentService();