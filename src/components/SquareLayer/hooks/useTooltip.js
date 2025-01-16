import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export const useTooltip = (map, layerId, coordinates, event) => {
    useEffect(() => {
        if (!map || !layerId) return;

        let currentPopup = null;

        const handleMouseEnter = () => {
            map.getCanvas().style.cursor = 'pointer';
            map.setPaintProperty(layerId, 'fill-extrusion-opacity', 1);
            
            currentPopup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
                className: 'event-tooltip'
            })
            .setLngLat(coordinates)
            .setHTML(`
                <div>
                    <strong>${event.name}</strong>
                    <br/>
                    ${new Date(event.startDate).toLocaleDateString()}
                </div>
            `)
            .addTo(map);
        };

        const handleMouseLeave = () => {
            map.getCanvas().style.cursor = '';
            map.setPaintProperty(layerId, 'fill-extrusion-opacity', 0.8);
            if (currentPopup) {
                currentPopup.remove();
                currentPopup = null;
            }
        };

        map.on('mouseenter', layerId, handleMouseEnter);
        map.on('mouseleave', layerId, handleMouseLeave);

        return () => {
            map.off('mouseenter', layerId, handleMouseEnter);
            map.off('mouseleave', layerId, handleMouseLeave);
            if (currentPopup) currentPopup.remove();
        };
    }, [map, layerId, coordinates, event]);
}; 