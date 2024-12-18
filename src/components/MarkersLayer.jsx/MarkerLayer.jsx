// MarkersLayer.jsx
import React, { memo, useEffect } from 'react';
import SquareLayer from '../SquareLayer/SquareLayer';


const MarkerLayer = memo( ( { map, events, showMarkers } ) => {

     console.log('MarkerLayer Render Start');
     
     return (
          <>
               { events.map( ( event ) => (
                    <SquareLayer
                         key={ event.id }
                         map={ map }
                         event={ event }
                         showMarkers={ showMarkers }
                    />
               ) ) }
          </>
     );
} );

export default MarkerLayer;