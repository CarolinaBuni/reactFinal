import React, { memo, useState } from 'react';
import './UpcomingEvents.css';
import EventItem from './components/EventItem';
import { useMapNavigation } from './hooks/useMapNavigation';
import { useFavorites } from '../../Context/FavoritesContext';

const UpcomingEvents = memo(({ events, map, showingFavorites, showMarkers }) => {
    console.log("UpcomingEvents Render"); 
    
    // Todos los hooks primero
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 1110);
    const handleEventClick = useMapNavigation(map, showMarkers);
    const { favorites } = useFavorites();

    // Filtra eventos según la vista actual
    const visibleEvents = showingFavorites 
        ? events.filter(event => favorites.some(fav => fav.id === event.id))
        : events;

    if (!visibleEvents?.length) return null;

    const toggleCollapse = () => {
        if (window.innerWidth <= 1110) {
            setIsCollapsed(!isCollapsed);
        }
    };

    return (
        <div className={`upcoming-events-container ${isCollapsed ? 'collapsed' : ''}`}>
            <h3 onClick={toggleCollapse}>Próximos Eventos</h3>
            <div className="upcoming-events-list">
                {visibleEvents.map(event => (
                    <EventItem 
                        key={event.id}
                        event={event}
                        onClick={() => {
                            handleEventClick(event);
                            if (window.innerWidth <= 1110) {
                                setIsCollapsed(true);
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
}, (prev, next) => {

    const eventsEqual = 
        prev.events.length === next.events.length &&
        prev.events.every((event, index) => event.id === next.events[index].id);
    
    return eventsEqual && 
        prev.map === next.map &&
        prev.showingFavorites === next.showingFavorites &&
        prev.showMarkers === next.showMarkers;
});

export default UpcomingEvents;