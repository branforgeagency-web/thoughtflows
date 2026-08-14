import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem("tf_admin_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const data = res.data.data;
      localStorage.setItem("tf_admin_token", data.token);
      localStorage.setItem("tf_admin_user", JSON.stringify(data));
      setAdmin(data);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("tf_admin_token");
    localStorage.removeItem("tf_admin_user");
    setAdmin(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("tf_admin_token");
    if (!token) setAdmin(null);
  }, []);

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
