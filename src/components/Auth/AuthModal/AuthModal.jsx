import React, { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import CloseButton from '../../CustomPopup/components/CloseButton/CloseButton';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  console.log('🔄 AuthModal renderizado', {isOpen});
  const [showLogin, setShowLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="auth-modal">
        <CloseButton onClose={onClose} />
        
        {showLogin ? (
          <Login 
            onClose={onClose} 
            onSwitchToRegister={() => setShowLogin(false)} 
          />
        ) : (
          <Register 
            onClose={onClose} 
            onSwitchToLogin={() => setShowLogin(true)} 
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal; 