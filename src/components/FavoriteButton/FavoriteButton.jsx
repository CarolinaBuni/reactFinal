import React, { useState } from 'react';
import { useFavorites } from '../../Context/FavoritesContext';
import { useAuth } from '../../Context/AuthContext';
import AuthModal from '../Auth/AuthModal/AuthModal';
import './FavoriteButton.css';

const FavoriteButton = ({ event }) => {
    console.log('🔄 FavoriteButton renderizado');
    const { toggleFavorite, isFavorite } = useFavorites();
    const { isAuthenticated } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    
    const isEventFavorite = isFavorite(event.id);
    
    const handleClick = (e) => {
        e.stopPropagation();
        
        if (isAuthenticated()) {
            toggleFavorite(event);
        } else {
            setShowAuthModal(true);
        }
    };
    
    return (
        <>
            <button 
                className={`favorite-button ${isEventFavorite ? 'active' : ''}`} 
                onClick={handleClick}
            >
                <ion-icon name={isEventFavorite ? "heart" : "heart-outline"}></ion-icon>
            </button>
            
            <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)} 
            />
        </>
    );
};

export default FavoriteButton;