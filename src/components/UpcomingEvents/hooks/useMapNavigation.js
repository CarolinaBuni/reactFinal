import { useCallback, useEffect, useRef } from 'react';

export const useMapNavigation = (map, showMarkers) => {

    const showMarkersRef = useRef(showMarkers);

    useEffect(() => {
        showMarkersRef.current = showMarkers;
    }, [showMarkers]);
    return useCallback((event) => {
        
        if (!map || !showMarkersRef.current) {
            console.log('Navigation cancelled: No map or markers are hidden');
            return;
        }

        // Detectar si es dispositivo móvil
        const isMobile = window.innerWidth <= 480;
        
        map.flyTo({
            center: event.coordinates,
            zoom: isMobile ? 16 : 15,     
            pitch: isMobile ? 70 : 60,    
            bearing: 0,
            duration: 800
        });
    }, [map]);
}; 