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

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapContainer = memo( ( { events, showMarkers, error, upcomingEvents, showingFavorites } ) => {
    console.log( 'MapContainer Render' );
    const mapContainer = useRef( null );
    const mapRef = useRef( null );
    const { favorites } = useFavorites();

    const eventsToDisplay = useMemo( () => {

        return showingFavorites ? favorites : events;
    }, [ events, showingFavorites, showingFavorites ? favorites : null ] );

    useMapInitialization( mapContainer, mapRef );
    useGlobeAnimation( mapRef );
    useMapBounds( mapRef, eventsToDisplay, showMarkers );


    const mapContent = useMemo( () => (
        <>
            {/* <IntroText /> */ }
            { mapRef.current && (
                <>
                    <MarkerLayer
                        map={ mapRef.current }
                        events={ eventsToDisplay }
                        showMarkers={ showMarkers }
                    />
                    <PopupManager />
                </>
            ) }
        </>
    ), [ mapRef.current, eventsToDisplay, showMarkers ] );

    return useMemo( () => (
        <div ref={ mapContainer } style={ { width: '100%', top: '0', bottom: '0', position: 'absolute' } }>
            {/* <IntroText /> */ }
            { mapContent }
            <UpcomingEvents
                events={ upcomingEvents }
                map={ mapRef.current }
                showingFavorites={ showingFavorites }
                showMarkers={ showMarkers }
            />
        </div>
    ), [ mapContent, upcomingEvents, mapRef.current, showingFavorites, showMarkers ] );
}, ( prev, next ) => {
    if ( prev.showingFavorites !== next.showingFavorites ) {
        return false; 
    }

    // Resto de comparaciones
    return prev.events === next.events &&
        prev.showMarkers === next.showMarkers &&
        prev.upcomingEvents === next.upcomingEvents;
} );

export default MapContainer;
