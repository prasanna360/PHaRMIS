import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '@/types';
import { demoUser } from '@/data/demoData';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  signup: (fullName: string, email: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('pharmis_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email: string) => {
    const u = { ...demoUser, email, fullName: demoUser.fullName };
    setUser(u);
    localStorage.setItem('pharmis_user', JSON.stringify(u));
  };

  const signup = (fullName: string, email: string) => {
    const u = { ...demoUser, fullName, email };
    setUser(u);
    localStorage.setItem('pharmis_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pharmis_user');
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('pharmis_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
