// import { useEffect } from 'react';

// export const useExtrusion = (map, sourceId, layerId, squareGeoJSON, event, showMarkers) => {
//     useEffect(() => {
//         if (!map || !sourceId || !layerId) return;

//         const colorMap = {
//             100: '#a7f515',
//             300: '#e70f3e',   
//             600: '#f515ea',   
//             900: '#ff4886',   
//             1200: '#1592db',  
//             1500: '#19eeee'    
//         };

//         // Añadir o actualizar la fuente
//         if (!map.getSource(sourceId)) {
//             map.addSource(sourceId, { type: "geojson", data: squareGeoJSON });
//         } else {
//             map.getSource(sourceId).setData(squareGeoJSON);
//         }

//         // Añadir la capa si no existe
//         if (!map.getLayer(layerId)) {
//             map.addLayer({
//                 id: layerId,
//                 type: "fill-extrusion",
//                 source: sourceId,
//                 paint: {
//                     "fill-extrusion-color": colorMap[event.height] || "#ff69b4",
//                     "fill-extrusion-height": ["get", "height"],
//                     "fill-extrusion-base": 0,
//                     "fill-extrusion-opacity": 0.8,
//                     "fill-extrusion-opacity-transition": {
//                         duration: 300,
//                         delay: 0
//                     }
//                 },
//                 layout: {
//                     visibility: showMarkers ? "visible" : "none",
//                 },
//             });
//         }

//         return () => {
//             if (map.getLayer(layerId)) map.removeLayer(layerId);
//             if (map.getSource(sourceId)) map.removeSource(sourceId);
//         };
//     }, [map, sourceId, layerId, squareGeoJSON, event, showMarkers]);
// }; 