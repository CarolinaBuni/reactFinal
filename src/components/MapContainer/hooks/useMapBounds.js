import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export const useMapBounds = ( mapRef, events, showMarkers, showingFavorites ) => {
     useEffect( () => {
          if ( showMarkers && mapRef.current && events.length > 0 ) {
               const bounds = new mapboxgl.LngLatBounds();
               events.forEach( ( event ) => bounds.extend( event.coordinates ) );

               // Detectar si es dispositivo móvil
               const isMobile = window.innerWidth <= 480;

               mapRef.current.fitBounds( bounds, {
                    padding: 50,
                    maxZoom: isMobile ? 14 : 13,
                    duration: 1000,
               } ).once( "moveend", () => {
                    mapRef.current.easeTo( {
                         pitch: 65,        
                         bearing: 0,
                         duration: 1000,
                    } );
               } );
          }
     }, [ showMarkers, events, showingFavorites ] );
}; 