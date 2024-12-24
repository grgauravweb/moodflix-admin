import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const login = (token) => {
    const decodedUser = jwtDecode(token); // Decode the JWT token
    setUser(decodedUser);
    localStorage.setItem('user', JSON.stringify(decodedUser));
    localStorage.setItem('token', token); // Store the token
  };

  // Memoize the logout function with useCallback
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove token
    navigate('/login'); // Redirect to login page after logout
  }, [navigate]); // 'navigate' is stable, so it doesn’t need to be a dependency

  // Optional: Automatically log out if token is expired
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token');
      const { exp } = jwtDecode(token);
      const expirationTime = exp * 1000; // Convert to milliseconds
      const timeout = expirationTime - Date.now();

      if (timeout > 0) {
        const timer = setTimeout(() => logout(), timeout);
        return () => clearTimeout(timer);
      } else {
        logout();
      }
    }
  }, [user, logout]); // Add 'logout' to the dependency array (memoized)

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
