import React, { useState, useCallback, memo, useRef } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Login = memo(({ onClose, onSwitchToRegister }) => {
  console.log('🔄 Login renderizado');
  
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

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
  }, [login, onClose]);


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
            ref={emailRef}
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
            ref={passwordRef}
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
});

export default Login; 