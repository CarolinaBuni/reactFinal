import React from 'react';
import { usePopup } from '../../../Context/PopupContext';
import PopupManager from '../PopupManager';

const PopupLayer = () => {
     console.log('🔄 PopupLayer renderizado');
     const { popupInfo } = usePopup();
     return popupInfo ? <PopupManager /> : null;
};

export default PopupLayer;