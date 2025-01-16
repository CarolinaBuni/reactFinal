// MarkersLayer.jsx
import React, { memo, useCallback, useMemo } from 'react';
import { usePopup } from "../../Context/PopupContext";
import SquareLayer from '../SquareLayer/SquareLayer';

const MarkerLayer = memo(({ map, events, showMarkers }) => {
     console.log('MarkerLayer Render', { 
          eventsLength: events.length, 
          showMarkers,
          events
     });
     const { togglePopup } = usePopup();
     
     const handleLayerClick = useCallback((event) => {
          togglePopup(event);
     }, [togglePopup]);

     const layers = useMemo(() => 
          events.map(event => (
               <SquareLayer
                    key={event.id}
                    map={map}
                    event={event}
                    showMarkers={showMarkers}
                    onLayerClick={handleLayerClick}
               />
          )), [events, map, showMarkers, handleLayerClick]);

     return <>{layers}</>;
}, (prev, next) => {
     const eventsEqual = 
          prev.events.length === next.events.length &&
          prev.events.every((event, index) => event.id === next.events[index].id);
     
     // console.log('MarkerLayer memo comparison:', { 
     //      eventsEqual, 
     //      showMarkersEqual: prev.showMarkers === next.showMarkers,
     //      mapEqual: prev.map === next.map 
     // });
     
     return eventsEqual && 
            prev.showMarkers === next.showMarkers &&
            prev.map === next.map;
});

export default MarkerLayer;