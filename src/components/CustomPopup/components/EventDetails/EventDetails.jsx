import React, { memo } from 'react';
import DetailLine from '../DetailLine/DetailLine';
import './EventDetails.css';

const EventDetails = memo( ( { startDate, genreName, venueName, cityName, address, status } ) => {
    console.log( '🔄 EventDetails renderizado' );
    // Función para verificar si un valor es válido para mostrar
    const isValidValue = ( value ) => {
        return value &&
            value !== 'undefined' &&
            value !== 'Undefined' &&
            value !== 'null' &&
            value.toString().trim() !== '';
    };

    // Función para formatear el status en español
    const getStatusText = ( status ) => {
        const statusMap = {
            'onsale': '🎫 En venta',
            'offsale': '🚫 No disponible',
            'cancelled': '❌ Cancelado',
            'postponed': '⏳ Pospuesto',
            'rescheduled': '📅 Reprogramado'
        };
        return statusMap[ status ] || status;
    };

    return (
        <div className="event-details">
            <DetailLine label="Fecha" value={ startDate } />
            { isValidValue( status ) && <DetailLine label="Estado" value={ getStatusText( status ) } /> }
            { isValidValue( genreName ) && <DetailLine label="Género" value={ genreName } /> }
            { isValidValue( venueName ) && <DetailLine label="Lugar" value={ venueName } /> }
            { isValidValue( cityName ) && <DetailLine label="Ciudad" value={ cityName } /> }
            { isValidValue( address ) && <DetailLine label="Dirección" value={ address } /> }
        </div>
    );
}, ( prev, next ) =>
    prev.startDate === next.startDate &&
    prev.genreName === next.genreName &&
    prev.venueName === next.venueName &&
    prev.cityName === next.cityName &&
    prev.address === next.address &&
    prev.status === next.status
);

export default EventDetails; 