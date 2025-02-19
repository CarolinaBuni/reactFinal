import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const useMarkerEvents = ( map, layerId, events, togglePopup, geoJSON, tooltipRef ) => {
    useEffect( () => {
        if ( !map ) return;

        const handleClick = ( e ) => {
            const feature = e.features[ 0 ];
            const event = events.find( evt => evt.id === feature.properties.id );
            if ( event ) {
                if ( tooltipRef.current ) {
                    tooltipRef.current.remove();
                }
                togglePopup( event ); 
            }
        };

        const handleMouseEnter = ( e ) => {
            map.getCanvas().style.cursor = 'pointer';
            const feature = e.features[ 0 ];
            const event = events.find( evt => evt.id === feature.properties.id );

            if ( event ) {
                tooltipRef.current = new mapboxgl.Popup( {
                    closeButton: false,
                    closeOnClick: false,
                    className: 'event-tooltip'
                } )
                    .setLngLat( event.coordinates )
                    .setHTML( `
                            <div>
                                <strong>${ event.name }</strong><br/>
                                ${ event.startDate }
                            </div>
                        `)
                    .addTo( map );
            }
        };

        const handleMouseLeave = () => {
            map.getCanvas().style.cursor = '';
            if ( tooltipRef.current ) {
                tooltipRef.current.remove();
                tooltipRef.current = null;
            }
        };

        map.on( 'click', layerId, handleClick );
        map.on( 'mouseenter', layerId, handleMouseEnter );
        map.on( 'mouseleave', layerId, handleMouseLeave );

        return () => {
            map.off( 'click', layerId, handleClick );
            map.off( 'mouseenter', layerId, handleMouseEnter );
            map.off( 'mouseleave', layerId, handleMouseLeave );
            if ( tooltipRef.current ) {
                tooltipRef.current.remove();
            }
        };
    }, [ map, layerId, events, togglePopup, geoJSON ] );
};

export default useMarkerEvents;