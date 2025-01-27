// App.jsx
import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import './App.css';
import MapContainer from './components/MapContainer/MapContainer';
import Toolbar from './components/Toolbar/Toolbar';
import useFetchEvents from './hooks/useFetchEvents';
import { PopupProvider } from './Context/PopupContext';
import { FavoritesProvider, useFavorites } from './Context/FavoritesContext';



const AppContent = memo(() => {
    console.log('AppContent Render');
    
    const { events, error, fetchEvents } = useFetchEvents();
    const [showMarkers, setShowMarkers] = useState(false);
    const [showingFavorites, setShowingFavorites] = useState(false);
    const { favorites } = useFavorites();

    // useEffect(() => {
    //     console.log('App detectó cambio en favoritos:', favorites);
    // }, [favorites]);

    const upcomingEvents = useMemo(() => {
        const now = new Date();
        return events
            .filter(event => new Date(event.startDate) > now)
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
            .slice(0, 5);
    }, [events]);

    const handleToggleMarkers = useCallback((showFavorites = false, show = true) => {
        setShowingFavorites(showFavorites);
        setShowMarkers(show);
    }, []);

    return (
        <div className="app-container">
            <MapContainer
                events={events}
                showMarkers={showMarkers}
                error={error}
                upcomingEvents={upcomingEvents}
                showingFavorites={showingFavorites}
            />
            <Toolbar
                onFetchEvents={fetchEvents}
                onToggleMarkers={handleToggleMarkers}
                showMarkers={showMarkers}
                events={events}
                showingFavorites={showingFavorites}
            />
        </div>
     
    );
});

const App = () => (
    <FavoritesProvider>
        <PopupProvider>
            <AppContent />
        </PopupProvider>
    </FavoritesProvider>
);

export default App;