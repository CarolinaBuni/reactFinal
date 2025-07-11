import React, { memo, useState } from 'react';
import './UpcomingEvents.css';
import EventItem from './components/EventItem';
import { useMapNavigation } from './hooks/useMapNavigation';
import { useEvents } from '../../Context/EventsContext';

const UpcomingEvents = memo(({ events, map, showMarkers }) => {
    console.log('🔄 UpcomingEvents renderizado');
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 1110);
    const handleEventClick = useMapNavigation(map, showMarkers);
    const { searchQuery } = useEvents();

    const toggleCollapse = () => {
        if (window.innerWidth <= 1110) {
            setIsCollapsed(!isCollapsed);
        }
    };

    return (
        <div className={`upcoming-events-container ${isCollapsed ? 'collapsed' : ''}`}>
            <h3 onClick={toggleCollapse}>
                {searchQuery ? `Resultados para "${searchQuery}"` : 'Próximos Eventos'}
            </h3>
            <div className="upcoming-events-list">
                {events?.length > 0 ? (
                    events.map(event => (
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
                    ))
                ) : (
                    <div className="no-events-message">
                        {searchQuery ? (
                            <>
                                <p>No se encontraron eventos para "{searchQuery}"</p>
                                <p className="search-suggestion">Intenta con términos más generales o revisa los filtros</p>
                            </>
                        ) : (
                            <p>No hay eventos próximos disponibles</p>
                        )}
                    </div>
                )}
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