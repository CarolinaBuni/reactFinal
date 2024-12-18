import React, { createContext, useContext, useState } from 'react';

const  PopupContext = createContext();

export const PopupProvider = ({children }) => {
     const [popupInfo, setPopupInfo] = useState(null);

     const togglePopup = (info) => setPopupInfo(info);
     const closePopup = () => setPopupInfo(null);

     return (
          <PopupContext.Provider value={{ popupInfo, togglePopup, closePopup}}>
               {children}
          </PopupContext.Provider>
     )
};

export const usePopup = () => useContext(PopupProvider);