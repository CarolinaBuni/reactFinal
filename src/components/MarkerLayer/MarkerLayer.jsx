import { memo, useMemo, useCallback, useRef } from 'react';
import { usePopup } from "../../Context/PopupContext";
import { createGeoJSONFeature, createPointFeature } from './utils/createGeoJSONFeature';
import useMarkerEvents from './hooks/useMarkerEvents';
import useMapLayer from './hooks/useMapLayer';
import { useEvents } from '../../Context/EventsContext';
import { createClusterData } from '../../utils/clusterUtils';

const MarkerLayer = memo( ( { map } ) => {
    console.log('🔄 MarkerLayer renderizado');
    const { togglePopup } = usePopup();
    const { showMarkers, filteredUpcomingEvents } = useEvents();
    const tooltipRef = useRef( null );
    const sourceId = 'events-source';
    const layerId = 'events-layer';

    const handlePopupToggle = useCallback( ( event ) => {
        togglePopup( event );
    }, [ togglePopup ] );

    // GeoJSON para extrusiones (polígonos)
    const geoJSON = useMemo( () => ( {
        type: 'FeatureCollection',
        features: filteredUpcomingEvents.map( createGeoJSONFeature )
    } ), [ filteredUpcomingEvents ] );

    // GeoJSON para círculos (puntos)
    const circleGeoJSON = useMemo( () => ( {
        type: 'FeatureCollection',
        features: filteredUpcomingEvents.map( createPointFeature )
    } ), [ filteredUpcomingEvents ] );

    const clusterGeoJSON = useMemo(() => 
        createClusterData(filteredUpcomingEvents), 
        [filteredUpcomingEvents]
    );

    useMarkerEvents( map, layerId, filteredUpcomingEvents, handlePopupToggle, geoJSON, tooltipRef );
    useMapLayer( map, sourceId, layerId, geoJSON, circleGeoJSON, clusterGeoJSON, showMarkers );

    return null;
}, ( prev, next ) => {
    return prev.map === next.map;
} );

export default MarkerLayer;