import React, { useState, useCallback, memo } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import CloseButton from '../../CustomPopup/components/CloseButton/CloseButton';
import './AuthModal.css';

const AuthModal = memo(({ isOpen, onClose }) => {
  console.log('🔄 AuthModal renderizado', {isOpen});
  const [showLogin, setShowLogin] = useState(true);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const handleSwitchToRegister = useCallback(() => setShowLogin(false), []);
  const handleSwitchToLogin = useCallback(() => setShowLogin(true), []);

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal">
        <CloseButton onClose={onClose} />
        
        {showLogin ? (
          <Login 
            onClose={onClose} 
            onSwitchToRegister={handleSwitchToRegister} 
          />
        ) : (
          <Register 
            onClose={onClose} 
            onSwitchToLogin={handleSwitchToLogin} 
          />
        )}
      </div>
    </div>
  );
});

export default AuthModal; 

