import { useEffect } from 'react';

// export const useGlobeAnimation = ( mapRef ) => {
//      useEffect( () => {
//           if ( !mapRef.current ) return;

//           let userInteracting = false;

//           const spinGlobe = () => {
//                const secondsPerRevolution = 240;
//                const maxSpinZoom = 5;
//                const slowSpinZoom = 3;
//                const zoom = mapRef.current.getZoom();

//                if ( zoom < maxSpinZoom ) {
//                     let distancePerSecond = 360 / secondsPerRevolution;
//                     if ( zoom > slowSpinZoom ) {
//                          const zoomDif = ( maxSpinZoom - zoom ) / ( maxSpinZoom - slowSpinZoom );
//                          distancePerSecond *= zoomDif;
//                     }
//                     const center = mapRef.current.getCenter();
//                     center.lng -= distancePerSecond;
//                     mapRef.current.easeTo( { center, duration: 1000, easing: ( n ) => n } );
//                }
//           };

//           mapRef.current.on( "mousedown", () => ( userInteracting = true ) );
//           mapRef.current.on( "dragstart", () => ( userInteracting = true ) );
//           mapRef.current.on( "moveend", spinGlobe );

//           spinGlobe();

//           return () => {
//                if ( mapRef.current ) {
//                     mapRef.current.off( "mousedown" );
//                     mapRef.current.off( "dragstart" );
//                     mapRef.current.off( "moveend", spinGlobe );
//                }
//           };
//      }, [ mapRef.current ] );
// }; 
export const useGlobeAnimation = (mapRef) => {
     useEffect(() => {
          if (!mapRef.current) return;

          // The following values can be changed to control rotation speed:
          const secondsPerRevolution = 240;
          const maxSpinZoom = 5;
          const slowSpinZoom = 3;

          let userInteracting = false;
          const spinEnabled = true;

          function spinGlobe() {
               const zoom = mapRef.current.getZoom();
               if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
                    let distancePerSecond = 360 / secondsPerRevolution;
                    if (zoom > slowSpinZoom) {
                         // Slow spinning at higher zooms
                         const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                         distancePerSecond *= zoomDif;
                    }
                    const center = mapRef.current.getCenter();
                    center.lng -= distancePerSecond;
                    // Smoothly animate the map over one second.
                    // When this animation is complete, it calls a 'moveend' event.
                    mapRef.current.easeTo({ center, duration: 1000, easing: (n) => n });
               }
          }

          // Pause spinning on interaction
          mapRef.current.on('mousedown', () => {
               userInteracting = true;
          });

          mapRef.current.on('dragstart', () => {
               userInteracting = true;
          });

          // When animation is complete, start spinning if there is no ongoing interaction
          mapRef.current.on('moveend', () => {
               spinGlobe();
          });

          spinGlobe();

          return () => {
               if (mapRef.current) {
                    mapRef.current.off('mousedown');
                    mapRef.current.off('dragstart');
                    mapRef.current.off('moveend');
               }
          };
     }, []);
};