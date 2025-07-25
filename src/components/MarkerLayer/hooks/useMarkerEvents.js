import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const useMarkerEvents = ( map, layerId, events, togglePopup, geoJSON, tooltipRef ) => {
    useEffect( () => {
        if ( !map ) return;

        // const handleClick = ( e ) => {
        //     const feature = e.features[ 0 ];
        //     const event = events.find( evt => evt.id === feature.properties.id );
        //     if ( event ) {
        //         if ( tooltipRef.current ) {
        //             tooltipRef.current.remove();
        //         }
        //         togglePopup( event ); 
        //     }
        // };

        const handleClick = ( e ) => {
            const feature = e.features[ 0 ];

            // Si es un cluster, hacer zoom a la región
            if ( feature.properties.region ) {
                console.log( `🎯 Click en cluster: ${ feature.properties.region } (${ feature.properties.count } eventos)` );

                // Hacer zoom a la región
                map.easeTo( {
                    center: feature.geometry.coordinates,
                    zoom: 10,
                    duration: 500
                } );
                return;
            }

            // Si es un evento individual, mostrar popup
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

        // map.on( 'click', layerId, handleClick );
        // map.on( 'mouseenter', layerId, handleMouseEnter );
        // map.on( 'mouseleave', layerId, handleMouseLeave );

        // Eventos para clusters
        map.on( 'click', layerId + '-clusters', handleClick );
        map.on( 'mouseenter', layerId + '-clusters', () => map.getCanvas().style.cursor = 'pointer' );
        map.on( 'mouseleave', layerId + '-clusters', () => map.getCanvas().style.cursor = '' );

        // Eventos para círculos individuales
        map.on( 'click', layerId + '-circles', handleClick );
        map.on( 'mouseenter', layerId + '-circles', handleMouseEnter );
        map.on( 'mouseleave', layerId + '-circles', handleMouseLeave );

        // Eventos para extrusiones 3D
        map.on( 'click', layerId + '-extrusions', handleClick );
        map.on( 'mouseenter', layerId + '-extrusions', handleMouseEnter );
        map.on( 'mouseleave', layerId + '-extrusions', handleMouseLeave );

        return () => {
            // map.off( 'click', layerId, handleClick );
            // map.off( 'mouseenter', layerId, handleMouseEnter );
            // map.off( 'mouseleave', layerId, handleMouseLeave );
            map.off( 'click', layerId + '-circles', handleClick );
            map.off( 'mouseenter', layerId + '-circles', handleMouseEnter );
            map.off( 'mouseleave', layerId + '-circles', handleMouseLeave );
            map.off( 'click', layerId + '-extrusions', handleClick );
            map.off( 'mouseenter', layerId + '-extrusions', handleMouseEnter );
            map.off( 'mouseleave', layerId + '-extrusions', handleMouseLeave );
            map.off( 'click', layerId + '-clusters', handleClick );
            map.off( 'mouseenter', layerId + '-clusters' );
            map.off( 'mouseleave', layerId + '-clusters' );
            if ( tooltipRef.current ) {
                tooltipRef.current.remove();
            }
        };
    }, [ map, layerId, events, togglePopup, geoJSON ] );
};

export default useMarkerEvents;