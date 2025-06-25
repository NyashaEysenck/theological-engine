import { myths } from '../data/myths';
import { doctrines } from '../data/doctrines';
import { bibleConcepts } from '../data/bibleConcepts';
import { scriptureContext } from '../data/scriptureContext';
import { simulateNetworkDelay } from '../utils/helpers';
import { Myth, Doctrine, BibleConcept, ScriptureVerse } from '../types/content';
import { apiClient, ApiError } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';

class ContentService {
  // Myths
  async getMyths(searchTerm?: string): Promise<Myth[]> {
    try {
      // Try backend first
      const params = searchTerm ? { search: searchTerm } : undefined;
      const response = await apiClient.get<Myth[]>(API_ENDPOINTS.CONTENT.MYTHS, params);
      return response;
    } catch (error) {
      console.warn('Backend myths request failed, falling back to mock data:', error);
      
      // Fallback to mock data
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
  }
  
  async getMythById(id: string): Promise<Myth | null> {
    try {
      // Try backend first
      const response = await apiClient.get<Myth>(API_ENDPOINTS.CONTENT.MYTH_BY_ID(id));
      return response;
    } catch (error) {
      console.warn('Backend myth by ID request failed, falling back to mock data:', error);
      
      // Fallback to mock data
      await simulateNetworkDelay();
      return myths.find(myth => myth.id === id) || null;
    }
  }
  
  // Doctrines
  async getDoctrines(searchTerm?: string): Promise<Doctrine[]> {
    try {
      // Try backend first
      const params = searchTerm ? { search: searchTerm } : undefined;
      const response = await apiClient.get<Doctrine[]>(API_ENDPOINTS.CONTENT.DOCTRINES, params);
      return response;
    } catch (error) {
      console.warn('Backend doctrines request failed, falling back to mock data:', error);
      
      // Fallback to mock data
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
  }
  
  async getDoctrineById(id: string): Promise<Doctrine | null> {
    try {
      // Try backend first
      const response = await apiClient.get<Doctrine>(API_ENDPOINTS.CONTENT.DOCTRINE_BY_ID(id));
      return response;
    } catch (error) {
      console.warn('Backend doctrine by ID request failed, falling back to mock data:', error);
      
      // Fallback to mock data
      await simulateNetworkDelay();
      return doctrines.find(doctrine => doctrine.id === id) || null;
    }
  }
  
  // Bible Concepts
  async searchBibleConcepts(query: string): Promise<BibleConcept[]> {
    try {
      // Try backend first
      const response = await apiClient.get<BibleConcept[]>(
        API_ENDPOINTS.CONTENT.BIBLE_CONCEPTS,
        { query }
      );
      return response;
    } catch (error) {
      console.warn('Backend bible concepts search failed, falling back to mock data:', error);
      
      // Fallback to mock data
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
  }
  
  async getBibleConceptById(id: string): Promise<BibleConcept | null> {
    try {
      // Try backend first
      const response = await apiClient.get<BibleConcept>(API_ENDPOINTS.CONTENT.BIBLE_CONCEPT_BY_ID(id));
      return response;
    } catch (error) {
      console.warn('Backend bible concept by ID request failed, falling back to mock data:', error);
      
      // Fallback to mock data
      await simulateNetworkDelay();
      return bibleConcepts.find(concept => concept.id === id) || null;
    }
  }
  
  // Scripture Context
  async getCommonlyMisusedVerses(): Promise<ScriptureVerse[]> {
    try {
      // Try backend first
      const response = await apiClient.get<ScriptureVerse[]>(API_ENDPOINTS.CONTENT.SCRIPTURE_CONTEXT);
      return response;
    } catch (error) {
      console.warn('Backend scripture context request failed, falling back to mock data:', error);
      
      // Fallback to mock data
      await simulateNetworkDelay();
      return scriptureContext;
    }
  }
  
  async getVerseById(id: string): Promise<ScriptureVerse | null> {
    try {
      // Try backend first
      const response = await apiClient.get<ScriptureVerse>(API_ENDPOINTS.CONTENT.SCRIPTURE_BY_ID(id));
      return response;
    } catch (error) {
      console.warn('Backend verse by ID request failed, falling back to mock data:', error);
      
      // Fallback to mock data
      await simulateNetworkDelay();
      return scriptureContext.find(verse => verse.id === id) || null;
    }
  }
}

export const contentService = new ContentService();