import { useEffect } from 'react';

export const usePopupAnimation = (popupInfo) => {
    useEffect(() => {
        if (popupInfo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [popupInfo]);
}; 