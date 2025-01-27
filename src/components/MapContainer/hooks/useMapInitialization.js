import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export const useMapInitialization = ( mapContainer, mapRef ) => {
     useEffect( () => {
          mapRef.current = new mapboxgl.Map( {
               container: mapContainer.current,
               style: "mapbox://styles/mapbox/standard",
               center:  [30, 15],
               zoom: 1,
               projection: 'globe',
               dragRotate: true
          } );

          mapRef.current.addControl( new mapboxgl.NavigationControl( { 
               visualizePitch: true,
               showCompass: true,
               
          } ) );

          mapRef.current.on( "style.load", () => {
               mapRef.current.setConfigProperty('basemap', 'lightPreset', 'dusk');
               mapRef.current.setFog( {
                    color: "rgba(8, 236, 194, 0.548)",
                    "high-color": "rgb(8, 236, 194)",
                    "horizon-blend": 0.04,
                    "space-color": "rgba(4, 1, 14, 0.959)",
                    "star-intensity": 0.9,
               } );

                // Añadir efecto de nieve
                const zoomBasedReveal = (value) => {
                    return [
                         'interpolate',
                         ['linear'],
                         ['zoom'],
                         11,
                         0.0,
                         13,
                         value
                    ];
               };

               mapRef.current.setSnow({
                    density: zoomBasedReveal(0.85),
                    intensity: 1.0,
                    'center-thinning': 0.1,
                    direction: [0, 50],
                    opacity: 1.0,
                    color: '#ffffff',
                    'flake-size': 0.71,
                    vignette: zoomBasedReveal(0.3),
                    'vignette-color': '#ffffff'
               });
          } );

          return () => {
               mapRef.current.remove();
          };
     }, [] );

     return mapRef.current;
}; 