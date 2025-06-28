import { User } from '../types/user';
import { simulateNetworkDelay } from '../utils/helpers';
import { users } from '../data/users';
import { apiClient, ApiError } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';

// Demo user for testing
const demoUser: User = {
  id: 'demo123',
  username: 'DemoUser',
  email: 'demo@example.com',
  createdAt: new Date().toISOString(),
};

class AuthService {
  private storageKey = 'micaiah_auth_user';
  private tokenKey = 'micaiah_auth_token';

  async login(email: string, password: string): Promise<User> {
    try {
      // Try backend first
      const response = await apiClient.post<{ accessToken: string; tokenType: string }>(
        API_ENDPOINTS.AUTH.LOGIN,
        { email, password }
      );

      // Store token
      localStorage.setItem(this.tokenKey, response.accessToken);

      // Get user info
      const user = await this.getCurrentUser();
      if (user) {
        this.setCurrentUser(user);
        return user;
      }
      
      throw new Error('Failed to get user information');
    } catch (error) {
      console.warn('Backend login failed, falling back to mock data:', error);
      
      // Fallback to mock authentication
      await simulateNetworkDelay();

      // For demo login
      if (email === 'demo@example.com' && password === 'password123') {
        this.setCurrentUser(demoUser);
        return demoUser;
      }

      // Check against simulated user database
      const user = users.find(u => u.email === email);

      if (!user) {
        throw new Error('User not found');
      }

      // In a real app, we would check password hash here
      // For simulation, we'll accept any password for existing users
      
      this.setCurrentUser(user);
      return user;
    }
  }

  async register(username: string, email: string, password: string): Promise<User> {
    try {
      // Try backend first
      const response = await apiClient.post<User>(
        API_ENDPOINTS.AUTH.REGISTER,
        { username, email, password }
      );

      this.setCurrentUser(response);
      return response;
    } catch (error) {
      console.warn('Backend registration failed, falling back to mock data:', error);
      
      // Fallback to mock registration
      await simulateNetworkDelay();

      // Check if user already exists
      const existingUser = users.find(u => u.email === email);

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        username,
        email,
        createdAt: new Date().toISOString(),
      };

      // In a real app, we would save to database and hash the password
      // For simulation, we'll just return the new user
      
      this.setCurrentUser(newUser);
      return newUser;
    }
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.tokenKey);
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem(this.tokenKey);
    
    if (token) {
      try {
        // Try to get user from backend
        const user = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
        return user;
      } catch (error) {
        console.warn('Failed to get user from backend:', error);
        // Remove invalid token
        localStorage.removeItem(this.tokenKey);
      }
    }

    // Fallback to localStorage
    const userJson = localStorage.getItem(this.storageKey);
    
    if (!userJson) {
      return null;
    }
    
    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem(this.tokenKey);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export const authService = new AuthService();