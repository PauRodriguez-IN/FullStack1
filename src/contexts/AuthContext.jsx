import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Configurar axios con base URL
axios.defaults.baseURL = 'http://localhost:5000/api';

// Estado inicial
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null
};

// Reducer para manejar el estado
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    
    default:
      return state;
  }
};

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Configurar interceptor de axios para incluir token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [state.token]);

  // Función para verificar si el usuario está autenticado al cargar la app
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('/auth/profile');
      dispatch({ type: 'SET_USER', payload: response.data.data.user });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Token inválido' });
    }
  };

  // Cargar usuario al montar el componente
  useEffect(() => {
    loadUser();
  }, []);

  // Función de login
  const login = async (emailOrUsername, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const response = await axios.post('/auth/login', {
        emailOrUsername,
        password
      });

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data
      });

      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      return { success: false, message };
    }
  };

  // Función de registro
  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const response = await axios.post('/auth/register', userData);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: response.data.data
      });

      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Error al registrarse';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      return { success: false, message };
    }
  };

  // Función de logout
  const logout = () => {
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: 'LOGOUT' });
  };

  // Función para solicitar restablecimiento de contraseña
  const forgotPassword = async (email) => {
    try {
      dispatch({ type: 'CLEAR_ERROR' });
      
      const response = await axios.post('/auth/forgot-password', { email });
      
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Error al solicitar restablecimiento';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      return { success: false, message };
    }
  };

  // Función para restablecer contraseña
  const resetPassword = async (token, password) => {
    try {
      dispatch({ type: 'CLEAR_ERROR' });
      
      const response = await axios.post(`/auth/reset-password/${token}`, { password });
      
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Error al restablecer contraseña';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    clearError: () => dispatch({ type: 'CLEAR_ERROR' })
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
