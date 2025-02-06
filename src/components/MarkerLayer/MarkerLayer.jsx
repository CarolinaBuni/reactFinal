import React, { memo, useMemo, useEffect, useState } from 'react';
import { usePopup } from "../../Context/PopupContext";
import { createGeoJSONFeature } from './utils/createGeoJSONFeature';
import EventPopup from './components/EventPopup';
import useMarkerEvents from './hooks/useMarkerEvents'; 
import useMapLayer from './hooks/useMapLayer';

const MarkerLayer = memo( ( { map, events, showMarkers } ) => {
    console.log( 'MarkerLayer Render' );
    const { togglePopup } = usePopup();
    const [ activeEvent, setActiveEvent ] = useState( null ); 

    const sourceId = 'events-source';
    const layerId = 'events-layer';

    const geoJSON = useMemo( () => ( {
        type: 'FeatureCollection',
        features: events.map( createGeoJSONFeature )
    } ), [ events ] );

    useMarkerEvents( map, layerId, events, setActiveEvent, togglePopup, geoJSON );
    useMapLayer( map, sourceId, layerId, geoJSON, showMarkers );


    return (
        <>
            { activeEvent && (
                <EventPopup
                    map={ map }
                    event={ activeEvent }
                    closePopup={ () => setActiveEvent( null ) }
                />
            ) }
        </>
    );
} );

export default MarkerLayer;