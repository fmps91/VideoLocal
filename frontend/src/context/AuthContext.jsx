// context/AuthContext.js
import { createContext, useContext, useState } from 'react';
import { post } from "../api/axios";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = no logueado
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await post('/api/auth/login', { username, password }, {
        withCredentials: true, // 🔐 Cookies si usas sesión
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      setUser(response.data); // 👈 Guardas el usuario
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
    // También podrías hacer un POST a /logout si es necesario
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
