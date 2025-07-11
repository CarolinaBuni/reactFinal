import React, { useState } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onClose, onSwitchToRegister }) => {
  console.log('🔄 Login renderizado');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    
    try {
      const result = await login({ email, password });
      console.log('Resultado login:', result);
      
      if (result.success) {
        onClose();
      } else {
        setError(result.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="auth-form">
      <h2>Iniciar Sesión</h2>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="tu@email.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••••"
          />
        </div>
        
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Iniciando sesión...' : (
            <>
              <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
            </>
          )}
        </button>
      </form>
      
      <div className="auth-switch">
        ¿No tienes cuenta? <button onClick={onSwitchToRegister}>Regístrate</button>
      </div>
    </div>
  );
};

export default Login; 