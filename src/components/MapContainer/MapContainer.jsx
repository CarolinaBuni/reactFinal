// MapContainer.jsx

import React, { useEffect, useRef, memo } from "react";
import mapboxgl from "mapbox-gl";
import MarkerLayer from "../MarkersLayer.jsx/MarkerLayer";

mapboxgl.accessToken = "pk.eyJ1IjoiY2Fyb3VzaW5oYSIsImEiOiJjbTIxbTh2cWgwcmNrMm9xdDIzbnVvem05In0.pO_vgJgRtaADjpSLFcLTuw";

const MapContainer = memo( ( { events, showMarkers } ) => {
     console.log( "MapContainer Render Start", { events, showMarkers } );

     const mapContainer = useRef( null );
     const mapRef = useRef( null );

     useEffect( () => {
          mapRef.current = new mapboxgl.Map( {
               container: mapContainer.current,
               style: "mapbox://styles/carousinha/cm42ryp6b00wa01sdbeg7gedb",
               center: [ 30, 15 ],
               zoom: 1.5,
          } );

          mapRef.current.addControl( new mapboxgl.NavigationControl( { visualizePitch: true } ) );
          mapRef.current.scrollZoom.disable();

          mapRef.current.on( "style.load", () => {
               mapRef.current.setFog( {
                    color: "rgba(8, 236, 194, 0.548)",
                    "high-color": "rgb(8, 236, 194)",
                    "horizon-blend": 0.04,
                    "space-color": "rgba(4, 1, 14, 0.959)",
                    "star-intensity": 0.9,
               } );
          } );

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
               mapRef.current.remove();
          };
     }, [] );

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
     }, [ showMarkers, events ] );

     console.log( "MapContainer Render End" );
     return (
          <div style={ { width: "100%", height: "100vh" } } ref={ mapContainer }>
               { mapRef.current && (
                    <MarkerLayer
                         map={ mapRef.current }
                         events={ events }
                         showMarkers={ showMarkers }
                         key={ `${ events.length }-${ showMarkers }` }
                    />
               ) }
          </div>
     );
} );

export default MapContainer;