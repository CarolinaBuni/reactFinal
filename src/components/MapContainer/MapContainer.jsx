// MapContainer.jsx

import React, { useEffect, useRef, memo } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyb3VzaW5oYSIsImEiOiJjbTIxbTh2cWgwcmNrMm9xdDIzbnVvem05In0.pO_vgJgRtaADjpSLFcLTuw';

const MapContainer = memo( ( { events, showMarkers } ) => {
     console.log( 'MapContainer Render Start', { events, showMarkers } );

     const mapContainer = useRef( null );
     const mapRef = useRef( null );
     const markerRefs = useRef( [] );

     useEffect( () => {
          // Inicializar el mapa
          mapRef.current = new mapboxgl.Map( {
               container: mapContainer.current,
               style: 'mapbox://styles/carousinha/cm42ryp6b00wa01sdbeg7gedb',
               center: [ 0, 0 ],
               zoom: 1.5,
               pitch: 0,
               bearing: 0,
          } );

          mapRef.current.addControl( new mapboxgl.NavigationControl( { visualizePitch: true } ) );
          mapRef.current.scrollZoom.disable();

          return () => {
               mapRef.current.remove();
          };
     }, [] );

     useEffect( () => {
          if ( !mapRef.current ) return;

          // Eliminar marcadores anteriores
          markerRefs.current.forEach( ( marker ) => marker.remove() );
          markerRefs.current = [];

          // Si showMarkers es true, añadir marcadores
          if ( showMarkers ) {
               const bounds = new mapboxgl.LngLatBounds();

               events.forEach( ( event ) => {
                    const marker = new mapboxgl.Marker().setLngLat( event.coordinates ).addTo( mapRef.current );
                    markerRefs.current.push( marker );
                    bounds.extend( event.coordinates );
               } );

               if ( events.length > 0 ) {
                    mapRef.current.fitBounds( bounds, {
                         padding: 50,
                         maxZoom: 15,
                         duration: 1000,
                         pitch: 60,
                         bearing: 0,
                    } );
               }
          }
     }, [ events, showMarkers ] );

     console.log( 'MapContainer Render End' );
     return <div ref={ mapContainer } style={ { width: '100%', height: '100vh' } } />;
} );

export default MapContainer;