import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export const useMapBounds = ( mapRef, events, showMarkers, showingFavorites ) => {
     useEffect( () => {
          if ( showMarkers && mapRef.current && events.length > 0 ) {
               const bounds = new mapboxgl.LngLatBounds();
               events.forEach( ( event ) => bounds.extend( event.coordinates ) );

               mapRef.current.fitBounds( bounds, {
                    padding: 50,
                    maxZoom: 15,
                    duration: 1000,
               } ).once( "moveend", () => {
                    mapRef.current.easeTo( {
                         pitch: 60,
                         bearing: 0,
                         duration: 1000,
                    } );
               } );
          }
     }, [ showMarkers, events, showingFavorites ] );
}; 