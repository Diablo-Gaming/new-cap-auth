import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Automatically check token on app load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser({ token }); // optionally decode and store more user info
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setUser({ token });
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate('/login');
  };

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);