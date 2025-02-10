import React, { memo } from 'react';
import CustomPopup from '../CustomPopup/CustomPopup';
import { usePopupAnimation } from './hooks/usePopupAnimation';
import { usePopup } from '../../Context/PopupContext';

const PopupManager = memo(() => {
    console.log( 'PopupManager Render' );
    const { popupInfo, closePopup } = usePopup();
    usePopupAnimation(popupInfo);

    return popupInfo ? (
        <CustomPopup 
            popupInfo={popupInfo} 
            onClose={closePopup}
        />
    ) : null;
}, (prev, next) => {
    return prev.popupInfo?.id === next.popupInfo?.id;
});

export default PopupManager;
