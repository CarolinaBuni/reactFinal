import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';


export const useMapBounds = ( mapRef, events, showMarkers, showingFavorites ) => {
    useEffect( () => {
        if ( showMarkers && mapRef.current && events.length > 0 ) {
            const bounds = new mapboxgl.LngLatBounds();

            // Función para determinar la región principal
const getMainRegion = (events) => {
    const spain = events.filter(e => e.coordinates[0] > -10 && e.coordinates[0] < 5);
    const usa = events.filter(e => e.coordinates[0] < -50);
    
    // Devolver la región con más eventos
    return spain.length >= usa.length ? spain : usa;
};

// Usar solo eventos de la región principal
const mainRegionEvents = getMainRegion(events);
console.log(`🗺️ Centrando en: ${mainRegionEvents.length > 0 && mainRegionEvents[0].coordinates[0] > -10 ? 'España' : 'Los Ángeles'} (${mainRegionEvents.length} eventos)`);

mainRegionEvents.forEach((event) => {
    bounds.extend(event.coordinates);
});

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