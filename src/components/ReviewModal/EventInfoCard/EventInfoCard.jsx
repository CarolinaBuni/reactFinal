import './EventInfoCard.css';

const EventInfoCard = ( { event, formatDate } ) => {
     console.log('🔄 EventInfoCard renderizado');
     return (
          <div className="event-info-card">
               <div className="event-info-header">
                    <img
                         src={ event.image || '/default-event-image.jpg' }
                         alt={ event.name }
                         className="event-info-image"
                    />
                    <div className="event-info-details">
                         <h3>{ event.name }</h3>
                         <div className="event-info-date">
                              { formatDate( event.startDate ) }
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default EventInfoCard;