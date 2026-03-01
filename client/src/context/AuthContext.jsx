import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  const checkAuth = useCallback(async () => {
    if (authChecked && admin) return admin;

    try {
      setLoading(true);
      const { data: response } = await axios.get(`${API_URL}/auth/profile`, {
        withCredentials: true,
      });

      if (response.success && response.data) {
        setAdmin(response.data);
        setAuthChecked(true);
        return response.data;
      } else {
        setAdmin(null);
        setAuthChecked(true);
        return null;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setAdmin(null);
      setAuthChecked(true);
      return null;
    } finally {
      setLoading(false);
    }
  }, [authChecked, admin]);

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      const { data: response } = await axios.post(
        `${API_URL}/auth/login`,
        credentials,
        { withCredentials: true },
      );

      if (response.success && response.data) {
        setAdmin(response.data);
        setAuthChecked(true);
      }
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAdmin(null);
      setAuthChecked(false);
    }
  }, []);

  const refreshAdmin = useCallback(async () => {
    setAuthChecked(false);
    return checkAuth();
  }, [checkAuth]);

  const value = {
    admin,
    loading,
    authChecked,
    isAuthenticated: !!admin,
    checkAuth,
    login,
    logout,
    refreshAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
