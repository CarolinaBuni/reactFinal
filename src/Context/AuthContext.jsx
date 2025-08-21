//src/Context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log('🔄 AuthProvider renderizado');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Verificar si hay un usuario autenticado al cargar
  useEffect(() => {
    console.log('🔍 AuthContext useEffect ejecutado');
    let isMounted = true;
    
    const checkAuth = async () => {
      try {

        if (authService.isAuthenticated()) {
          const response = await authService.getProfile();
          if (response.success && isMounted) {
            setUser(response.data.user || response.data);
          }
        }
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        authService.logout();
      }
    };

    checkAuth();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Función para iniciar sesión
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('AuthContext login con:', credentials);
      const response = await authService.login(credentials);
      console.log('AuthContext respuesta login:', response);
      
      if (response.success) {
        const userProfile = await authService.getProfile();
        if (userProfile.success) {
          setUser(userProfile.data);
        } else {
          setUser({
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            avatar: response.data.user.avatar,
            role: response.data.user.role
          });
        }
        return { success: true };
      } else {
        setError(response.message || 'Error desconocido');
        return { success: false, message: response.message || 'Error desconocido' };
      }
    } catch (err) {
      console.error('Error en login (AuthContext):', err);
      const message = err.message || 'Error al iniciar sesión';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para registrarse 
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      
      if (response.success) {
        setUser(response.data.user);
        return { success: true };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (err) {
      const message = err.message || 'Error al registrarse';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para eliminar cuenta 
  const deleteAccount = useCallback(async () => {
    try {
      const response = await authService.deleteAccount();
      if (response.success) {
        setUser(null);
      }
      return response;
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      return { success: false, message: error.message };
    }
  }, []);

  // Función para actualizar usuario 
  const updateUser = useCallback((userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  }, []);

  // Función para cerrar sesión 
  const logout = useCallback(() => {
    setUser(null);
    authService.logout();
  }, []);

  // Función isAuthenticated 
  const isAuthenticated = useCallback(() => {
    return authService.isAuthenticated();
  }, []);

  const value = useMemo(() => ({
    user,
    login,
    register,
    logout,
    updateUser,
    deleteAccount,
    isAuthenticated
  }), [user, login, register, logout, updateUser, deleteAccount, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};