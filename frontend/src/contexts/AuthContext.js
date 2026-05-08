import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const USER_KEY = 'ecom_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(USER_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setAuthLoading(false);
  }, []);

  const saveUser = (userData) => {
    setUser(userData);
    window.localStorage.setItem(USER_KEY, JSON.stringify(userData));
  };

  const parseResponse = async (response) => {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return { message: text || 'Server returned an invalid response.' };
    }
  };

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const payload = await parseResponse(response);
    if (!response.ok) {
      throw new Error(payload.message || 'Login failed');
    }

    saveUser(payload.user);
    return payload.user;
  };

  const register = async (name, email, password) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const payload = await parseResponse(response);
    if (!response.ok) {
      throw new Error(payload.message || 'Registration failed');
    }

    return payload.message;
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
