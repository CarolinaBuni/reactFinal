
import React, { useRef, memo, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import MarkerLayer from "../MarkerLayer/MarkerLayer";
import 'mapbox-gl/dist/mapbox-gl.css';
import IntroText from '../IntroText/IntroText';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import FilterBar from '../FilterBar/FilterBar'; 
import { useMapInitialization } from './hooks/useMapInitialization';
import { useGlobeAnimation } from './hooks/useGlobeAnimation';
import { useMapBounds } from './hooks/useMapBounds';
import { useEvents } from '../../Context/EventsContext';

import PopupLayer from "../PopupManager/components/PopupLayer";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapContainer = memo(() => {
    console.log('🔄 MapContainer renderizado');
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const { showMarkers, showingFavorites, filteredUpcomingEvents } = useEvents();



    useMapInitialization(mapContainer, mapRef);
    useGlobeAnimation(mapRef);
    useMapBounds(mapRef, filteredUpcomingEvents, showMarkers, showingFavorites);

    // Memoizo el mapa 
    const map = useMemo(() => mapRef.current, [mapRef.current]);
    const mapContent = useMemo(() => (
        <>
            {map && (
                <>
                    <MarkerLayer map={map} />
                    <PopupLayer />
                </>
            )}
        </>
    ), [map]);

    return useMemo(() => (
        <div ref={mapContainer} style={{ width: '100%', top: '0', bottom: '0', position: 'absolute' }}>
            {<IntroText />}
            {/* Añadimos el componente FilterBar cuando se muestran los marcadores */}
            {showMarkers && <FilterBar />}
            {mapContent}
            {showMarkers && ( 
                <UpcomingEvents
                    events={filteredUpcomingEvents}
                    map={mapRef.current}
                    showingFavorites={showingFavorites}
                    showMarkers={showMarkers}
                />
            )}
        </div>
    ), [mapContent, filteredUpcomingEvents, mapRef.current, showingFavorites, showMarkers]);
}, (prev, next) => {
    return prev.showMarkers === next.showMarkers &&
        prev.showingFavorites === next.showingFavorites &&
        prev.filteredUpcomingEvents === next.filteredUpcomingEvents;
});

export default MapContainer;