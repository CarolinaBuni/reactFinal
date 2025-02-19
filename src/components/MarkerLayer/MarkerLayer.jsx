import React, { memo, useMemo, useEffect, useState, useCallback, useRef } from 'react';
import { usePopup } from "../../Context/PopupContext";
import { createGeoJSONFeature } from './utils/createGeoJSONFeature';
import useMarkerEvents from './hooks/useMarkerEvents';
import useMapLayer from './hooks/useMapLayer';
import { useEvents } from '../../Context/EventsContext';


const MarkerLayer = memo( ( { map } ) => {
    console.log( 'MarkerLayer Render', Date.now() );
    const { togglePopup } = usePopup();
    const { showMarkers, filteredUpcomingEvents } = useEvents();
    const tooltipRef = useRef(null);

    const sourceId = 'events-source';
    const layerId = 'events-layer';

    const handlePopupToggle = useCallback((event) => {
        togglePopup(event);
    }, [togglePopup]);

    const geoJSON = useMemo(() => ({
        type: 'FeatureCollection',
        features: filteredUpcomingEvents.map(createGeoJSONFeature)
    }), [filteredUpcomingEvents]);

    useMarkerEvents( map, layerId, filteredUpcomingEvents, handlePopupToggle, geoJSON, tooltipRef );
    useMapLayer( map, sourceId, layerId, geoJSON, showMarkers );

    return null;
}, (prev, next) => {
    console.log('MarkerLayer memo check', {
        mapEqual: prev.map === next.map,
        showMarkersEqual: prev.showMarkers === next.showMarkers,
    });
    return prev.map === next.map &&
    prev.showMarkers === next.showMarkers &&
    prev.filteredUpcomingEvents === next.filteredUpcomingEvents;
} );

export default MarkerLayer;