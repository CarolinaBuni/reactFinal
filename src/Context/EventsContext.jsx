import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import useFetchEvents from '../hooks/useFetchEvents';
import { useFavorites } from './FavoritesContext';

const EventsContext = createContext();

export const EventsProvider = ( { children } ) => {
     const { events, error, fetchEvents } = useFetchEvents();
     const [ showMarkers, setShowMarkers ] = useState( false );
     const [ showingFavorites, setShowingFavorites ] = useState( false );
     const { favorites } = useFavorites();

     const upcomingEvents = useMemo( () => {
          if ( !events.length ) return [];

          const now = new Date();
          return events
               .filter( event => new Date( event.startDate ) > now )
               .sort( ( a, b ) => new Date( a.startDate ) - new Date( b.startDate ) );
     }, [ events ] );

     const filteredUpcomingEvents = useMemo( () => {
          if ( !upcomingEvents.length ) return [];

          if ( showingFavorites ) {
               const favoriteIds = new Set( favorites.map( fav => fav.id ) );
               return upcomingEvents.filter( event => favoriteIds.has( event.id ) );
          }
          return upcomingEvents;
     }, [ upcomingEvents, showingFavorites, favorites ] );

     const handleToggleMarkers = useCallback( ( showFavorites = false, show = true ) => {
          setShowingFavorites( showFavorites );
          setShowMarkers( show );
     }, [] );

     const value = useMemo( () => ( {
          events,
          error,
          fetchEvents,
          showMarkers,
          showingFavorites,
          upcomingEvents,
          filteredUpcomingEvents,
          handleToggleMarkers
     } ), [
          events,
          error,
          fetchEvents,
          showMarkers,
          showingFavorites,
          upcomingEvents,
          filteredUpcomingEvents,
          handleToggleMarkers
     ] );


     return (
          <EventsContext.Provider value={ value }>
               { children }
          </EventsContext.Provider>
     );
};

export const useEvents = () => {
     const context = useContext( EventsContext );
     if ( !context ) {
          throw new Error( 'useEvents must be used within an EventsProvider' );
     }
     return context;
};