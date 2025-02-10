import React, { memo, useMemo, useEffect, useState, useCallback, useRef } from 'react';
import { usePopup } from "../../Context/PopupContext";
import { createGeoJSONFeature } from './utils/createGeoJSONFeature';
import EventPopup from './components/EventPopup';
import useMarkerEvents from './hooks/useMarkerEvents';
import useMapLayer from './hooks/useMapLayer';
import { useEvents } from '../../Context/EventsContext';
import { useFavorites } from '../../Context/FavoritesContext';

const MarkerLayer = memo( ( { map } ) => {
    console.log( 'MarkerLayer Render' );
    const { togglePopup } = usePopup();
    const { events, showMarkers, showingFavorites } = useEvents();
    const { favorites } = useFavorites();
    const tooltipRef = useRef(null);

    const sourceId = 'events-source';
    const layerId = 'events-layer';

    // Usamos la misma lógica que en MapContainer
    const eventsToDisplay = useMemo(() => {
        return showingFavorites ? favorites : events;
    }, [events, showingFavorites, favorites]);

    const geoJSON = useMemo( () => ( {
        type: 'FeatureCollection',
        features: eventsToDisplay.map( createGeoJSONFeature )
    } ), [ eventsToDisplay ] );

    // const handleSetActiveEvent = useCallback( ( event ) => {
    //     setActiveEvent( event );
    // }, [] );


    useMarkerEvents( map, layerId, eventsToDisplay, togglePopup, geoJSON, tooltipRef );
    useMapLayer( map, sourceId, layerId, geoJSON, showMarkers );


    // // Memorizamos el EventPopup
    // const eventPopup = useMemo( () => (
    //     activeEvent && (
    //         <EventPopup
    //             map={ map }
    //             event={ activeEvent }
    //             closePopup={ () => handleSetActiveEvent( null ) }
    //         />
    //     )
    // ), [ activeEvent, map ] );


    return null;
} );

export default MarkerLayer;