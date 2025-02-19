import { useCallback } from 'react';
import { useFavorites } from '../../../Context/FavoritesContext';
import { useEvents } from '../../../Context/EventsContext';

export const useToolbarLogic = () => {
     const { favorites } = useFavorites();
     const {
          events,
          fetchEvents,
          showMarkers,
          showingFavorites,
          handleToggleMarkers
     } = useEvents();

     const handleFetchAndToggleMarkers = useCallback( async () => {
          if ( events.length === 0 ) {
               await fetchEvents();
          }

          if ( showMarkers && !showingFavorites ) {
               handleToggleMarkers( false, false );
          } else {
               handleToggleMarkers( false );
          }
     }, [ events.length, showMarkers, showingFavorites, handleToggleMarkers, fetchEvents ] );

     const handleFavoritesClick = useCallback( () => {
          if ( favorites && favorites.length > 0 ) {
               if ( events.length === 0 ) {
                    fetchEvents().then( () => {
                         handleToggleMarkers( true );
                    } );
               } else {
                    handleToggleMarkers( true );
               }
          }
     }, [ events.length, favorites, fetchEvents, handleToggleMarkers ] );

     return {
          showMarkers,
          showingFavorites,
          handleFetchAndToggleMarkers,
          handleFavoritesClick
     };
};