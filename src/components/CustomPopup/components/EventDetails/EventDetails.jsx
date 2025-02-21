import React, { memo } from 'react';
import DetailLine from '../DetailLine/DetailLine';
import './EventDetails.css';

const EventDetails = memo(({ startDate, genreName, venueName, cityName, address }) => {
    return (
        <div className="event-details">
            <DetailLine label="Fecha" value={startDate} />
            <DetailLine label="Género" value={genreName} />
            <DetailLine label="Lugar" value={venueName} />
            <DetailLine label="Ciudad" value={cityName} />
            <DetailLine label="Dirección" value={address} />
        </div>
    );
}, (prev, next) => 
    prev.startDate === next.startDate &&
    prev.genreName === next.genreName &&
    prev.venueName === next.venueName &&
    prev.cityName === next.cityName &&
    prev.address === next.address
);

export default EventDetails; 