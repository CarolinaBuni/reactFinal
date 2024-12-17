// MapContainer.jsx
import React, { useEffect, useRef, memo } from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyb3VzaW5oYSIsImEiOiJjbTIxbTh2cWgwcmNrMm9xdDIzbnVvem05In0.pO_vgJgRtaADjpSLFcLTuw';

const MapContainer = memo( ( { events } ) => {
     console.log( 'MapContainer Render Start', { events } );

     const mapContainer = useRef( null );
     const mapRef = useRef( null );
     const markerRefs = useRef([]); // Almacenar referencias de marcadores

     useEffect( () => {
          mapRef.current = new mapboxgl.Map( {
               container: mapContainer.current,
               style: 'mapbox://styles/carousinha/cm42ryp6b00wa01sdbeg7gedb',
               center: [ 0, 0 ],  // Establece el centro inicial en la bola del mundo
               zoom: 1.5,       // Zoom inicial para mostrar la bola del mundo
               pitch: 0,        // Pitch inicial sin inclinación
               bearing: 0,

          } );

          mapRef.current.addControl( new mapboxgl.NavigationControl( {
               visualizePitch: true,
          } )
          );

          mapRef.current.scrollZoom.disable();

          mapRef.current.on( 'style.load', () => {
               mapRef.current.setFog( {
                    color: 'rgba(8, 236, 194, 0.548)', // Lower atmosphere
                    'high-color': 'rgb(8, 236, 194)', // Upper atmosphere
                    'horizon-blend': 0.04, // Atmosphere thickness (default 0.2 at low zooms)
                    'space-color': 'rgba(4, 1, 14, 0.959)', // Background color
                    'star-intensity': 0.9 // Background star brightness (default 0.35 at low zoooms )
               } );
          } );

          // Rotación automática del globo
          const secondsPerRevolution = 240; // Revolución cada 240 segundos
          const maxSpinZoom = 5;
          const slowSpinZoom = 3;
          let userInteracting = false;

          function spinGlobe() {
               const zoom = mapRef.current.getZoom();
               if ( !userInteracting && zoom < maxSpinZoom ) {
                    let distancePerSecond = 360 / secondsPerRevolution;
                    if ( zoom > slowSpinZoom ) {
                         const zoomDif = ( maxSpinZoom - zoom ) / ( maxSpinZoom - slowSpinZoom );
                         distancePerSecond *= zoomDif;
                    }
                    const center = mapRef.current.getCenter();
                    center.lng -= distancePerSecond;
                    mapRef.current.easeTo( { center, duration: 1000, easing: ( n ) => n } );
               }
          }

          mapRef.current.on( 'mousedown', () => {
               userInteracting = true;
          } );

          mapRef.current.on( 'dragstart', () => {
               userInteracting = true;
          } );

          mapRef.current.on( 'moveend', () => {
               spinGlobe();
          } );

          spinGlobe();

          return () => {
               mapRef.current.remove();
          };
     }, [] );

     // useEffect( () => {
     //      if ( mapRef.current ) { 
     //           // Aquí puedes agregar marcadores en el mapa usando los eventos
     //           events.forEach( event => {
     //                new mapboxgl.Marker()
     //                     .setLngLat( event.coordinates )
     //                     .addTo( mapRef.current ); // Usa mapRef.current en lugar de mapRef
     //           } );
     //      }
     // }, [ events ] );

     useEffect(() => {
          if (mapRef.current) {
            // Eliminar marcadores existentes
            markerRefs.current.forEach((marker) => marker.remove());
            markerRefs.current = []; // Limpiar el array de referencias
      
            // Crear nuevos marcadores y añadirlos al mapa
            const bounds = new mapboxgl.LngLatBounds();
      
            events.forEach((event) => {
              const marker = new mapboxgl.Marker()
                .setLngLat(event.coordinates)
                .addTo(mapRef.current);
      
              markerRefs.current.push(marker); // Guardar referencia del marcador
              bounds.extend(event.coordinates); // Extender límites
            });
      
            // Centrar y ajustar el mapa si hay eventos
            if (events.length > 0) {
              mapRef.current.fitBounds(bounds, {
                padding: 50,
                maxZoom: 15,
                duration: 1000,
              });
            }
          }
        }, [events]);

     console.log( "MapContainer Render End" );
     return <div ref={ mapContainer } style={ { width: '100%', height: '100vh' } } />;
} );




export default MapContainer;