import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export const useMapInitialization = ( mapContainer, mapRef ) => {
     useEffect( () => {
          mapRef.current = new mapboxgl.Map( {
               container: mapContainer.current,
               style: "mapbox://styles/carousinha/cm42ryp6b00wa01sdbeg7gedb",
               center: [ 30, 15 ],
               zoom: 1.5,
          } );

          mapRef.current.addControl( new mapboxgl.NavigationControl( { visualizePitch: true } ) );

          mapRef.current.on( "style.load", () => {
               mapRef.current.setFog( {
                    color: "rgba(8, 236, 194, 0.548)",
                    "high-color": "rgb(8, 236, 194)",
                    "horizon-blend": 0.04,
                    "space-color": "rgba(4, 1, 14, 0.959)",
                    "star-intensity": 0.9,
               } );
          } );

          return () => {
               mapRef.current.remove();
          };
     }, [] );

     return mapRef.current;
}; 