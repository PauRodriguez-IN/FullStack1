import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { forgotPassword, error, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const result = await forgotPassword(email);
    
    if (result.success) {
      setMessage(result.message);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) clearError();
    if (message) setMessage('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Restablecer Contraseña</h2>
          <p>Ingresa tu email para recibir las instrucciones</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading || message}
          >
            {loading ? 'Enviando...' : 'Enviar Instrucciones'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Recordaste tu contraseña?{' '}
            <Link to="/login" className="auth-link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
