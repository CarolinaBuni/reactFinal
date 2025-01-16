import { useEffect } from 'react';

export const useGlobeAnimation = ( mapRef ) => {
     useEffect( () => {
          if ( !mapRef.current ) return;

          let userInteracting = false;

          const spinGlobe = () => {
               const secondsPerRevolution = 240;
               const maxSpinZoom = 5;
               const slowSpinZoom = 3;
               const zoom = mapRef.current.getZoom();

               if ( zoom < maxSpinZoom ) {
                    let distancePerSecond = 360 / secondsPerRevolution;
                    if ( zoom > slowSpinZoom ) {
                         const zoomDif = ( maxSpinZoom - zoom ) / ( maxSpinZoom - slowSpinZoom );
                         distancePerSecond *= zoomDif;
                    }
                    const center = mapRef.current.getCenter();
                    center.lng -= distancePerSecond;
                    mapRef.current.easeTo( { center, duration: 1000, easing: ( n ) => n } );
               }
          };

          mapRef.current.on( "mousedown", () => ( userInteracting = true ) );
          mapRef.current.on( "dragstart", () => ( userInteracting = true ) );
          mapRef.current.on( "moveend", spinGlobe );

          spinGlobe();

          return () => {
               if ( mapRef.current ) {
                    mapRef.current.off( "mousedown" );
                    mapRef.current.off( "dragstart" );
                    mapRef.current.off( "moveend", spinGlobe );
               }
          };
     }, [ mapRef.current ] );
}; 