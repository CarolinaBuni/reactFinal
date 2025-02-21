import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [popupInfo, setPopupInfo] = useState(null);

    const togglePopup = useCallback((info) => {
        setPopupInfo((prev) => (prev?.id === info.id ? null : info)); 
    }, []);

    const closePopup = useCallback(() => setPopupInfo(null), []);

    const value = useMemo(() => ({
        popupInfo,
        togglePopup,
        closePopup
    }), [popupInfo, togglePopup, closePopup]);

    return (
        <PopupContext.Provider value={value}>
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext(PopupContext);
