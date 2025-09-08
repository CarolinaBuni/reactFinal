import React, { useState } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import { getRandomAvatar } from '../../../utils/avatars';
import FormField from '../FormField/FormField';
import '../Auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Register = ({ onClose, onSwitchToLogin }) => {
  console.log('🔄 Register renderizado');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      return 'Por favor, completa todos los campos obligatorios';
    }
    
    if (formData.password !== formData.confirmPassword) {
      return 'Las contraseñas no coinciden';
    }
    
    if (formData.password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    const { confirmPassword, ...userData } = formData;
    userData.avatar = getRandomAvatar();
    
    const result = await register(userData);
    
    if (result.success) {
      onClose();
    } else {
      setError(result.message);
    }
  };

  const fields = [
    { icon: faUser, label: 'Nombre de usuario', type: 'text', name: 'username', placeholder: 'Nombre de usuario' },
    { icon: faEnvelope, label: 'Email', type: 'email', name: 'email', placeholder: 'tu@email.com' },
    { icon: faLock, label: 'Contraseña', type: 'password', name: 'password', placeholder: '••••••••' },
    { icon: faLock, label: 'Confirmar contraseña', type: 'password', name: 'confirmPassword', placeholder: '••••••••' }
  ];

  return (
    <div className="auth-form">
      <h2>Crear Cuenta</h2>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            icon={field.icon}
            label={field.label}
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            disabled={loading}
            placeholder={field.placeholder}
          />
        ))}
        
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Registrando...' : (
            <>
              <FontAwesomeIcon icon={faUserPlus} /> Registrarse
            </>
          )}
        </button>
      </form>
      
      <div className="auth-switch">
        ¿Ya tienes cuenta? <button onClick={onSwitchToLogin}>Inicia sesión</button>
      </div>
    </div>
  );
};

export default Register; 