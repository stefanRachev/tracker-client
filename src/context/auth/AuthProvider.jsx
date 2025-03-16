// AuthContext.jsx
import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("accessToken", authToken);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
  }, []);

  const isAuthenticated = !!token;

  const checkExpiredAccessToken = useCallback(async () => {
    if (!token) {
      logout();
      return null;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to check expired token");
      }

      const data = await response.json();
      const { accessToken: newAccessToken } = data;

      setToken(newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
      setIsLoading(false);
      return newAccessToken;
    } catch (error) {
      console.error("Error checking expired token:", error);
      setIsLoading(false);
      logout();
      return null;
    }
  }, [token, logout]);

  const validateToken = useCallback(async () => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const timeToExpire = decodedToken.exp - currentTime;

        if (timeToExpire <= 0) {
          const newAccessToken = await checkExpiredAccessToken();
          if (!newAccessToken) {
            console.log("Failed to refresh token. Logging out...");
            logout();
            return;
          }
          setToken(newAccessToken);
          localStorage.setItem("accessToken", newAccessToken);
          return;
        }

        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/validate-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Invalid token");
        }

        const { user } = await response.json();
        setUser(user);
        setIsLoading(false);
      } catch (error) {
        console.error("Token validation failed:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    }
  }, [token, logout, checkExpiredAccessToken]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        logout,
        login,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
