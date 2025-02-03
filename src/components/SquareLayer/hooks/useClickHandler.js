// import { useEffect } from 'react';

// export const useClickHandler = (map, layerId, event, onLayerClick) => {
//     useEffect(() => {
//         if (!map || !layerId) return;

//         const handleClick = () => onLayerClick(event);
//         map.on("click", layerId, handleClick);

//         return () => {
//             map.off("click", layerId, handleClick);
//         };
//     }, [map, layerId, event, onLayerClick]);
// }; 