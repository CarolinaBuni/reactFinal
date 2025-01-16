import React, { memo } from 'react';
import { useFavorites } from '../../Context/FavoritesContext';
import './FavoriteButton.css';

const FavoriteButton = memo(({ event }) => {
     console.log('FavoriteButton Render');
     
     const { toggleFavorite, isFavorite } = useFavorites();
     const isEventFavorite = isFavorite(event.id);

     return (
          <button 
               className={`favorite-button ${isEventFavorite ? 'active' : ''}`}
               onClick={() => toggleFavorite(event)}
          >
               <ion-icon name={isEventFavorite ? "heart" : "heart-outline"}></ion-icon>
          </button>
     );
});

export default FavoriteButton; 