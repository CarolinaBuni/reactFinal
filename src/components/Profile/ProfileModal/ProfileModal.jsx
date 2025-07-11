// src/components/Profile/ProfileModal/ProfileModal.jsx
import React from 'react';
import ProfilePage from '../ProfilePage/ProfilePage';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose }) => {
  console.log('🔄 ProfileModal renderizado');
  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <ProfilePage onClose={onClose} />
    </div>
  );
};

export default ProfileModal;