import React, { memo } from 'react';
import '../../App.css';
import MapContainer from '../MapContainer/MapContainer';
import Toolbar from '../Toolbar/Toolbar';
import { EventsProvider } from '../../Context/EventsContext';

const AppContent = memo( () => {
     console.log( 'AppContent Render' );

     return (
          <EventsProvider>
          <div className="app-container">
               <MapContainer/>
               <Toolbar/>
          </div>
          </EventsProvider>
     );
} );

export default AppContent;