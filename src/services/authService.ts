import { User } from '../types/user';
import { simulateNetworkDelay } from '../utils/helpers';
import { users } from '../data/users';

// Demo user for testing
const demoUser: User = {
  id: 'demo123',
  username: 'DemoUser',
  email: 'demo@example.com',
  createdAt: new Date().toISOString(),
};

class AuthService {
  private storageKey = 'micaiah_auth_user';

  async login(email: string, password: string): Promise<User> {
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

  async register(username: string, email: string, password: string): Promise<User> {
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

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  async getCurrentUser(): Promise<User | null> {
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
}

export const authService = new AuthService();