import React, { memo } from 'react';
import { useFavorites } from '../../Context/FavoritesContext';
import './FavoriteButton.css';

const FavoriteButton = memo(({ event }) => {
     console.log('FavoriteButton Render');
     
     const { toggleFavorite, isFavorite } = useFavorites();
     const isEventFavorite = isFavorite(event.id);
     const isCancelled = event.status === 'cancelled';; 

     return (
          <button 
               className={`favorite-button ${isEventFavorite ? 'active' : ''} ${isCancelled ? 'disabled' : ''}`}
               onClick={() => !isCancelled && toggleFavorite(event)}
               disabled={isCancelled}
               title={isCancelled ? 'No disponible - Evento cancelado' : 'Guardar en favoritos'}  
          >
               <ion-icon name={isEventFavorite ? "heart" : "heart-outline"}></ion-icon>
          </button>
     );
});

export default FavoriteButton; 