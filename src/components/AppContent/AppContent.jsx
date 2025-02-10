import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import '../../App.css';
import MapContainer from '../MapContainer/MapContainer';
import Toolbar from '../Toolbar/Toolbar';
import useFetchEvents from '../../hooks/useFetchEvents';
import { EventsProvider } from '../../Context/EventsContext';

const AppContent = memo( () => {
     console.log( 'AppContent Render' );

     // const { events, error, fetchEvents } = useFetchEvents();
     // const [ showMarkers, setShowMarkers ] = useState( false );
     // const [ showingFavorites, setShowingFavorites ] = useState( false );
     // // const { favorites } = useFavorites();

     // const upcomingEvents = useMemo( () => {
     //      const now = new Date();
     //      return events
     //           .filter( event => new Date( event.startDate ) > now )
     //           .sort( ( a, b ) => new Date( a.startDate ) - new Date( b.startDate ) );
     // }, [ events ] );

     // const handleToggleMarkers = useCallback( ( showFavorites = false, show = true ) => {
     //      setShowingFavorites( showFavorites );
     //      setShowMarkers( show );
     // }, [] );

     return (
          <EventsProvider>
          <div className="app-container">
               <MapContainer
                    // events={ events }
                    // showMarkers={ showMarkers }
                    // error={ error }
                    // upcomingEvents={ upcomingEvents }
                    // showingFavorites={ showingFavorites }
               />
               <Toolbar
                    // onFetchEvents={ fetchEvents }
                    // onToggleMarkers={ handleToggleMarkers }
                    // showMarkers={ showMarkers }
                    // events={ events }
                    // showingFavorites={ showingFavorites }
               />
          </div>
          </EventsProvider>

     );
} );

export default AppContent;