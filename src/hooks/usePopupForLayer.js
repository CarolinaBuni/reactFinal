// usePopupForLayer.js
import { useMemo } from "react";
// import { PopupContext } from "../../Context/PopupContext";
import {  usePopup } from "../Context/PopupContext";



export const usePopupForLayer = ( layerId ) => {
     const { popupInfo, togglePopup } = usePopup();

     const isPopupActive = useMemo( () => popupInfo?.id === layerId, [ popupInfo, layerId ] );



     return { isPopupActive, togglePopup };
};
