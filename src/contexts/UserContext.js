import React, { createContext, useContext, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await fetch(`${apiUrl}auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUserType(null);
      setUserId(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const checkSession = async () => {
    console.log("CheckSession called");

    try {
      const response = await fetch(`${apiUrl}auth/validate`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserType(data.userType);
        setUserId(data.userId);
      } else {
        setUserType(null);
        setUserId(null);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setUserType(null);
      setUserId(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        userId,
        setUserId,
        checkSession,
        loading,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
