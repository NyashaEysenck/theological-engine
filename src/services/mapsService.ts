import { apiClient } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';

interface MapsConfig {
  apiKey: string;
  libraries: string[];
  version: string;
}

interface MapsHealth {
  configured: boolean;
  status: 'ready' | 'missing_api_key';
}

class MapsService {
  private config: MapsConfig | null = null;
  private isConfigured: boolean = false;

  async getMapsConfig(): Promise<MapsConfig> {
    try {
      if (this.config) {
        return this.config;
      }

      const config = await apiClient.get<MapsConfig>(API_ENDPOINTS.MAPS.CONFIG);
      this.config = config;
      this.isConfigured = true;
      return config;
    } catch (error) {
      console.error('Failed to get maps configuration:', error);
      throw new Error('Google Maps API not configured on backend');
    }
  }

  async checkMapsHealth(): Promise<MapsHealth> {
    try {
      const health = await apiClient.get<MapsHealth>(API_ENDPOINTS.MAPS.HEALTH);
      this.isConfigured = health.configured;
      return health;
    } catch (error) {
      console.error('Failed to check maps health:', error);
      return {
        configured: false,
        status: 'missing_api_key'
      };
    }
  }

  isReady(): boolean {
    return this.isConfigured;
  }

  clearConfig(): void {
    this.config = null;
    this.isConfigured = false;
  }
}

export const mapsService = new MapsService();