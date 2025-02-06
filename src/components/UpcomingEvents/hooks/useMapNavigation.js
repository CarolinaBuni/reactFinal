import { useCallback, useEffect, useRef } from 'react';

export const useMapNavigation = (map, showMarkers) => {

    const showMarkersRef = useRef(showMarkers);

    useEffect(() => {
        showMarkersRef.current = showMarkers;
    }, [showMarkers]);
    return useCallback((event) => {
        
        if (!map) {
            console.log('Navigation cancelled: No map available');
            return;
        }

        if (!showMarkersRef.current) {
            console.log('Navigation cancelled: Markers are hidden');
            return;
        }
        
        map.flyTo({
            center: event.coordinates,
            zoom: 15,
            pitch: 60,
            bearing: 0,
            duration: 2000
        });
    }, [map]);
}; 