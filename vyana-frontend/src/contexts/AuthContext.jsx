import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../api/axios";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("vyana_token"));

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("vyana_user");
    const storedToken = localStorage.getItem("vyana_token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        localStorage.removeItem("vyana_user");
        localStorage.removeItem("vyana_token");
      }
    }

    setLoading(false);
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const userData = {
        id: res.data.userId,
        name: res.data.name,
        email: email,
        role: "user",
      };

      setUser(userData);
      setToken(res.data.token);

      localStorage.setItem("vyana_user", JSON.stringify(userData));
      localStorage.setItem("vyana_token", res.data.token);

      toast.success("Login successful");
      setLoading(false);
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      setLoading(false);
      return { success: false };
    }
  };

  // 📝 SIGNUP
  const signup = async ({ name, email, password }) => {
    setLoading(true);
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Account created successfully. Please login.");
      setLoading(false);
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      setLoading(false);
      return { success: false };
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("vyana_user");
    localStorage.removeItem("vyana_token");
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
