import React, { useRef, memo, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import MarkerLayer from "../MarkerLayer/MarkerLayer";
import PopupManager from "../PopupManager/PopupManager";
import IntroText from '../IntroText/IntroText';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import { useMapInitialization } from './hooks/useMapInitialization';
import { useGlobeAnimation } from './hooks/useGlobeAnimation';
import { useMapBounds } from './hooks/useMapBounds';
import { useFavorites } from '../../Context/FavoritesContext';

mapboxgl.accessToken = "pk.eyJ1IjoiY2Fyb3VzaW5oYSIsImEiOiJjbTIxbTh2cWgwcmNrMm9xdDIzbnVvem05In0.pO_vgJgRtaADjpSLFcLTuw";

const MapContainer = memo(({ events, showMarkers, error, upcomingEvents, showingFavorites }) => {
    console.log('MapContainer Render', { showingFavorites });
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const { favorites } = useFavorites();
    
    const eventsToDisplay = useMemo(() => {
        // console.log('Calculando eventsToDisplay:', { showingFavorites, events: events.length, favorites: favorites.length });
        return showingFavorites ? favorites : events;
    }, [events, showingFavorites, showingFavorites ? favorites : null]);

    useMapInitialization(mapContainer, mapRef);
    useGlobeAnimation(mapRef);
    useMapBounds(mapRef, eventsToDisplay, showMarkers);

    const mapContent = useMemo(() => (
        <>
            {/* <IntroText /> */}
            {mapRef.current && (
                <>
                    <MarkerLayer
                        map={mapRef.current}
                        events={eventsToDisplay}
                        showMarkers={showMarkers}
                    />
                    <PopupManager />
                </>
            )}
        </>
    ), [mapRef.current, eventsToDisplay, showMarkers]);

    // if (showingFavorites && (!favorites || favorites.length === 0)) {
    //     console.log('No hay favoritos para mostrar');
    //     // Aquí podrías mostrar un mensaje al usuario
    // }

    return useMemo(() => (
        <div ref={mapContainer} style={{ width: '100%', height: '100vh' }}>
            {/* <IntroText /> */}
            {mapContent}
            <UpcomingEvents
                events={upcomingEvents}
                map={mapRef.current}
            />
        </div>
    ), [mapContent, upcomingEvents, mapRef.current, showingFavorites]);
}, (prev, next) => {
    // Siempre comparar showingFavorites si ha cambiado
    if (prev.showingFavorites !== next.showingFavorites) {
        return false; // Forzar re-render cuando cambia showingFavorites
    }

    // Resto de comparaciones
    return prev.events === next.events &&
           prev.showMarkers === next.showMarkers &&
           prev.upcomingEvents === next.upcomingEvents;
});

export default MapContainer;
