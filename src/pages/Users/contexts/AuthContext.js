import { createContext, useContext, useState } from "react";

// Create an authentication context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app with
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to simulate a login
  const login = (userData) => {
    setUser(userData);
  };

  // Function to simulate a logout
  const logout = () => {
    setUser(null);
  };

  // Context value
  const authContextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
