// import React, { memo } from 'react';
// import './UpcomingEvents.css';
// import EventItem from './components/EventItem';
// import { useMapNavigation } from './hooks/useMapNavigation';

// const UpcomingEvents = memo(({ events, map }) => {
//     console.log("UpcomingEvents Render");
    
     
//     if (!events?.length) return null;

//     const handleEventClick = useMapNavigation(map);

//     return (
//         <div className="upcoming-events-container">
//             <h3>Próximos Eventos</h3>
//             <div className="upcoming-events-list">
//                 {events.map(event => (
//                     <EventItem 
//                         key={event.id}
//                         event={event}
//                         onClick={handleEventClick}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }, (prev, next) => {
//     // Comparar si los eventos son realmente los mismos
//     const eventsEqual = 
//         prev.events.length === next.events.length &&
//         prev.events.every((event, index) => event.id === next.events[index].id);
    
//     return eventsEqual && prev.map === next.map;
// });

// export default UpcomingEvents; 

import React, { memo, useState } from 'react';
import './UpcomingEvents.css';
import EventItem from './components/EventItem';
import { useMapNavigation } from './hooks/useMapNavigation';

const UpcomingEvents = memo(({ events, map }) => {
    console.log("UpcomingEvents Render");
    
    // Todos los hooks primero
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 1110);
    const handleEventClick = useMapNavigation(map);
    
    // Después las condiciones
    if (!events?.length) return null;

    const toggleCollapse = () => {
        if (window.innerWidth <= 1110) {
            setIsCollapsed(!isCollapsed);
        }
    };

    return (
        <div className={`upcoming-events-container ${isCollapsed ? 'collapsed' : ''}`}>
            <h3 onClick={toggleCollapse}>Próximos Eventos</h3>
            <div className="upcoming-events-list">
                {events.map(event => (
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
    // Comparar si los eventos son realmente los mismos
    const eventsEqual = 
        prev.events.length === next.events.length &&
        prev.events.every((event, index) => event.id === next.events[index].id);
    
    return eventsEqual && prev.map === next.map;
});

export default UpcomingEvents;