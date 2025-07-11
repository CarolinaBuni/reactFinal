import React, { memo } from 'react';
import '../../App.css';
import MapContainer from '../MapContainer/MapContainer';
import Toolbar from '../Toolbar/Toolbar';

const AppContent = memo( () => {
     console.log('🔄 AppContent renderizado');
     return (
          <div className="app-container">
               <MapContainer/>
               <Toolbar/>
          </div>
     );
} );

export default AppContent;