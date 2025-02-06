// PopupContext.jsx

import React, { createContext, useContext, useState, useCallback } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [popupInfo, setPopupInfo] = useState(null);

    const togglePopup = useCallback((info) => {
        setPopupInfo((prev) => (prev?.id === info.id ? null : info)); 
    }, []);

    const closePopup = useCallback(() => setPopupInfo(null), []);

    return (
        <PopupContext.Provider value={{ popupInfo, togglePopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext(PopupContext);
