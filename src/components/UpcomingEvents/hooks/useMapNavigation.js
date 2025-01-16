import { useCallback } from 'react';

export const useMapNavigation = (map) => {
    return useCallback((event) => {
        if (!map) return;
        
        map.flyTo({
            center: event.coordinates,
            zoom: 15,
            pitch: 60,
            bearing: 0,
            duration: 2000
        });
    }, [map]);
}; 