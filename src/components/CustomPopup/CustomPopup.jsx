import React from 'react';
import './CustomPopup.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import EventHeader from './components/EventHeader/EventHeader.jsx';
import EventDetails from './components/EventDetails/EventDetails.jsx';

const CustomPopup = ({ popupInfo, onClose }) => {
    console.log('CustomPopup Render');
    
    if (!popupInfo) return null;

    const {
        name, startDate, genreName, venueName, cityName, address, image, url,
    } = popupInfo;

    return (
        <div className="custom-popup-container">
            <button className="close-button" onClick={onClose}>&times;</button>
            <FavoriteButton event={popupInfo} />
            <img src={image} alt={`Imagen de ${name}`} className="popup-image" />
            <EventHeader name={name} />
            <EventDetails 
                startDate={startDate}
                genreName={genreName}
                venueName={venueName}
                cityName={cityName}
                address={address}
            />
            <a href={url} target="_blank" rel="noopener noreferrer" className="popup-link">
                Más información
            </a>
        </div>
    );
};

export default CustomPopup;