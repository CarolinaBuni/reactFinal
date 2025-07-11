import React from 'react';
import { DEFAULT_AVATARS } from '../../../utils/avatars';
import './EditProfileForm.css';

const EditProfileForm = ({
  formData,
  loading,
  error,
  success,
  onSubmit,
  onChange,
  onAvatarSelect,
  onCancel
}) => {
  console.log('🔄 EditProfileForm renderizado');
  return (
    <div className="edit-profile-form">
      <h3>Editar Perfil</h3>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">¡Perfil actualizado correctamente!</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username || ''}
            onChange={onChange}
            required
            placeholder="Tu nombre de usuario"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={onChange}
            required
            placeholder="tu@email.com"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Avatar</label>
          <div className="avatar-preview">
            <img 
              src={formData.avatar || DEFAULT_AVATARS[0]} 
              alt="Avatar Preview"
              onError={(e) => { e.target.src = DEFAULT_AVATARS[0]; }}
            />
          </div>
          
          <div className="avatar-options">
            {DEFAULT_AVATARS.map((avatar, index) => (
              <div 
                key={index}
                className={`avatar-option ${formData.avatar === avatar ? 'selected' : ''}`}
                onClick={() => !loading && onAvatarSelect(avatar)}
              >
                <img src={avatar} alt={`Avatar ${index + 1}`} />
              </div>
            ))}
          </div>
          
          <div className="custom-avatar">
            <label htmlFor="customAvatar">URL personalizada</label>
            <input
              type="url"
              id="customAvatar"
              name="avatar"
              value={formData.avatar || ''}
              onChange={onChange}
              placeholder="https://..."
              disabled={loading}
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <button 
            type="button" 
            className="cancel-button" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;