import { API_CONFIG, buildApiUrl } from '../config/api';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = buildApiUrl(endpoint);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      console.log(`Making API request to: ${url}`, {
        method: options.method || 'GET',
        headers: options.headers
      });

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status
        );
      }

      const data = await response.json();
      console.log("Response data:", data);
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error instanceof Error) {
        console.error("API request error:", error);
        if (error.name === 'AbortError') {
          throw new ApiError('Request timeout', 408, 'TIMEOUT');
        }
        throw new ApiError(error.message, 0, 'NETWORK_ERROR');
      }
      
      throw new ApiError('Unknown error occurred', 0, 'UNKNOWN_ERROR');
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(buildApiUrl(endpoint));
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, value);
        }
      });
    }
    
    const queryString = url.searchParams.toString();
    const fullEndpoint = endpoint + (queryString ? `?${queryString}` : '');
    console.log(`GET request to: ${fullEndpoint}`);
    
    return this.request<T>(fullEndpoint);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    console.log(`POST request to: ${endpoint}`, data);
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    console.log(`PUT request to: ${endpoint}`, data);
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    console.log(`DELETE request to: ${endpoint}`);
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // Check if backend is available
  async healthCheck(): Promise<boolean> {
    try {
      console.log("Performing health check");
      await this.get('/health');
      console.log("Health check successful");
      return true;
    } catch (error) {
      console.warn('Backend health check failed:', error);
      return false;
    }
  }
}

export const apiClient = new ApiClient();