import React, { memo } from 'react';
import './CustomPopup.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import EventHeader from './components/EventHeader/EventHeader.jsx';
import EventDetails from './components/EventDetails/EventDetails.jsx';
import CloseButton from './components/CloseButton/CloseButton.jsx';
import CancelledBanner from '../CancelledBanner/CancelledBanner.jsx';
import PupupImage from './components/PupupImage/PupupImage.jsx';
import PopupLink from './components/PopupLink/PopupLink.jsx';

const CustomPopup = memo(({ popupInfo, onClose }) => {
    if (!popupInfo) return null;

    const isCancelled = popupInfo.status === 'cancelled';
    const {
        name, startDate, genreName, venueName, cityName, address, image, url,
    } = popupInfo;

    return (
        <div className="custom-popup-container">
            {isCancelled && <CancelledBanner />}
            <CloseButton onClose={onClose} />
            <FavoriteButton event={popupInfo} />
            <PupupImage image={image} name={name} />
            <EventHeader name={name} />
            <EventDetails 
                startDate={startDate}
                genreName={genreName}
                venueName={venueName}
                cityName={cityName}
                address={address}
            />
            <PopupLink url={url} />
        </div>
    );
}, (prev, next) => {
    return prev.popupInfo?.id === next.popupInfo?.id;
});

export default CustomPopup;