import { useState, useCallback } from 'react';

export const usePopupState = () => {
    const [popupInfo, setPopupInfo] = useState(null);

    const handlePopupClose = useCallback(() => {
        setPopupInfo(null);
    }, []);

    const handlePopupOpen = useCallback((event) => {
        setPopupInfo(event);
    }, []);

    return {
        popupInfo,
        handlePopupClose,
        handlePopupOpen
    };
}; 