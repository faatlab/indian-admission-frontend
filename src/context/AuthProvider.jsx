// src/context/AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import { authenticate } from "../api/auth";

export const AuthContext = createContext();

function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(localStorage.getItem("authToken"));
   const [isAuthenticated, setIsAuthenticated] = useState(!!token);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const verifyUser = async () => {
         try {
            const res = await authenticate();
            setUser(res.student_id);
            setIsAuthenticated(true);
         } catch (err) {
            console.error("Auth failed:", err);
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem("authToken");
            setToken(null);
         } finally {
            setLoading(false);
         }
      };

      verifyUser();
   }, [token, isAuthenticated]);

   const login = (userData, jwtToken) => {
      localStorage.setItem("authToken", jwtToken);
      setUser(userData);
      setToken(jwtToken);
      setIsAuthenticated(true);
   };

   const logout = () => {
      localStorage.removeItem("authToken");
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
   };

   return (
      <AuthContext.Provider
         value={{
            user,
            token,
            isAuthenticated,
            login,
            logout,
            loading,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export default AuthProvider;
