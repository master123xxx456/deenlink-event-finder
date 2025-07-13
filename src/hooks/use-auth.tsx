import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (token: string, userData: any) => void;
  logout: () => void;
  updateUser: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing session on initial load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);

  const login = (token: string, userData: any) => {
    // Add default values for required profile fields
    const userWithDefaults = {
      firstName: userData.firstName || 'User',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      location: userData.location || '',
      bio: userData.bio || '',
      username: userData.username || userData.email?.split('@')[0] || 'user',
      avatar: userData.avatar || '',
      createdAt: userData.createdAt || new Date().toISOString(),
      ...userData // Spread any additional user data
    };

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userWithDefaults));
    setUser(userWithDefaults);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  const updateUser = (userData: any) => {
    setUser(prev => ({
      ...prev,
      ...userData,
      preferences: {
        ...(prev?.preferences || {}),
        ...(userData?.preferences || {})
      }
    }));
    
    // Update localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({
      ...currentUser,
      ...userData
    }));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
