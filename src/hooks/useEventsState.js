import { useState, useCallback, useMemo } from 'react';

export const useEventsState = () => {
    const [events, setEvents] = useState([]);
    const [showMarkers, setShowMarkers] = useState(false);
    const [showingFavorites, setShowingFavorites] = useState(false);

    // Memoizar los eventos próximos para evitar recálculos innecesarios
    const upcomingEvents = useMemo(() => {
        return events
            .filter(event => new Date(event.startDate) > new Date())
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
            .slice(0, 5);
    }, [events]);

    const handleToggleMarkers = useCallback((showFavorites = false) => {
        setShowMarkers(true);
        setShowingFavorites(showFavorites);
    }, []);

    return {
        events,
        setEvents,
        showMarkers,
        showingFavorites,
        upcomingEvents,
        handleToggleMarkers
    };
}; 