import { useEffect } from 'react';
import { debounce } from 'lodash';

const useMarkerEvents = ( map, layerId, events, setActiveEvent, togglePopup, geoJSON ) => {
     useEffect( () => {
          if ( !map ) return;

          const handleClick = ( e ) => {
               const feature = e.features[ 0 ];
               const event = events.find( evt => evt.id === feature.properties.id );
               if ( event ) togglePopup( event );
          };

          const handleMouseEnter = ( e ) => {
               map.getCanvas().style.cursor = 'pointer';
               const feature = e.features[ 0 ];
               const event = events.find( evt => evt.id === feature.properties.id );
               if ( event ) {
                    setActiveEvent( event );
               }
          };

          const handleMouseLeave = () => {
               map.getCanvas().style.cursor = '';
               setActiveEvent( null );
          };

          const handleZoom = debounce( () => {
               if ( map.getSource( 'events-source' ) ) {
                    map.getSource( 'events-source' ).setData( geoJSON );
               }
          }, 100 );

          map.on( 'click', layerId, handleClick );
          map.on( 'mouseenter', layerId, handleMouseEnter );
          map.on( 'mouseleave', layerId, handleMouseLeave );
          map.on( 'zoom', handleZoom );

          return () => {
               map.off( 'click', layerId, handleClick );
               map.off( 'mouseenter', layerId, handleMouseLeave );
               map.off( 'mouseleave', layerId, handleMouseLeave );
               map.off( 'zoom', handleZoom );
               handleZoom.cancel();
          };
     }, [ map, layerId, events, setActiveEvent, togglePopup, geoJSON ] );

};

export default useMarkerEvents;