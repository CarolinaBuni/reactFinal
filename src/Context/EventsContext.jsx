import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import useFetchEvents from '../hooks/useFetchEvents';

const EventsContext = createContext();

export const EventsProvider = ( { children } ) => {
     const { events, error, fetchEvents } = useFetchEvents();
     const [ showMarkers, setShowMarkers ] = useState( false );
     const [ showingFavorites, setShowingFavorites ] = useState( false );

     const upcomingEvents = useMemo( () => {
          const now = new Date();
          return events
               .filter( event => new Date( event.startDate ) > now )
               .sort( ( a, b ) => new Date( a.startDate ) - new Date( b.startDate ) );
     }, [ events ] );

     const handleToggleMarkers = useCallback( ( showFavorites = false, show = true ) => {
          setShowingFavorites( showFavorites );
          setShowMarkers( show );
     }, [] );

     const value = {
          events,
          error,
          fetchEvents,
          showMarkers,
          showingFavorites,
          upcomingEvents,
          handleToggleMarkers
     };

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