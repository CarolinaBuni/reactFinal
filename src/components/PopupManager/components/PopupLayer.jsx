import React, { memo } from 'react';
import { usePopup } from '../../../Context/PopupContext';
import PopupManager from '../PopupManager';

const PopupLayer = memo( () => {
     console.log('🔄 PopupLayer renderizado');
     const { popupInfo } = usePopup();
     return popupInfo ? <PopupManager /> : null;
}, (prev, next) => true );

export default PopupLayer;