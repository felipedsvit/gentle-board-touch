
import { useState, useEffect, createContext, useContext } from "react";

// Define the user type
interface User {
  id: string;
  email: string;
  name: string;
  company: string;
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, company: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the auth context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth provider component (to be implemented with a real auth system)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    // In a real app, this would verify the token with the server
    const checkAuth = async () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true";
      if (isAuth) {
        // Mock user data - in a real app this would come from the server
        setUser({
          id: "1",
          email: "admin@empresa.com",
          name: "Administrador",
          company: "Mi Empresa",
        });
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call for login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate credentials with the server
      if (email && password) {
        // Mock successful login
        localStorage.setItem("isAuthenticated", "true");
        setUser({
          id: "1",
          email,
          name: "Administrador",
          company: "Mi Empresa",
        });
      } else {
        throw new Error("Credenciales inválidas");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string, company: string) => {
    setLoading(true);
    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would create a new user on the server
      // Mock successful registration
      return;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setUser(null);
  };

  // Value to be provided to the context
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
