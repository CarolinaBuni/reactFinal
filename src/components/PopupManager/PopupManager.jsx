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
});

export default PopupManager;
