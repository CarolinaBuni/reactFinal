import React, { memo } from 'react';

const EventItem = memo( ( { event, onClick } ) => {
     // console.log( "EventItem Render" );

     return (
          <div
               className="upcoming-event-item"
               onClick={ () => onClick( event ) }
          >
               <img src={ event.image } alt={ event.name } />
               <div className="event-info">
                    <h4>{ event.name }</h4>
                    <p className="event-date">{ event.startDate }</p>
                    <p className="event-venue">{ event.venueName }</p>
               </div>
          </div>
     );
}, ( prev, next ) => prev.event.id === next.event.id );

export default EventItem; 