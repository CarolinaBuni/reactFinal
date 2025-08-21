import { useEffect } from 'react';

export const useGlobeAnimation = (mapRef) => {
     useEffect(() => {
          if (!mapRef.current) return;

     // Control rotation speed
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
                         const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                         distancePerSecond *= zoomDif;
                    }
                    const center = mapRef.current.getCenter();
                    center.lng -= distancePerSecond;
                    mapRef.current.easeTo({ center, duration: 1000, easing: (n) => n });
               }
          }
          // Pausar spinning al interactuar
          mapRef.current.on('mousedown', () => {
               userInteracting = true;
          });

          mapRef.current.on('dragstart', () => {
               userInteracting = true;
          });

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