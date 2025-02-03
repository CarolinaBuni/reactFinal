// // SquareLayer.jsx

// import { memo, useMemo } from "react";
// import mapboxgl from 'mapbox-gl';
// import { useTooltip } from './hooks/useTooltip';
// import { useExtrusion } from './hooks/useExtrusion';
// import { useZoomHandler } from './hooks/useZoomHandler';
// import { useClickHandler } from './hooks/useClickHandler';

// const SquareLayer = memo(({ map, event, showMarkers, onLayerClick }) => {
//      console.log("SquareLayer Render Start");

//      const sourceId = `source-${event.id}`;
//      const layerId = `layer-${event.id}`;
//      const coordinates = event.coordinates;

//      // Función para calcular el desplazamiento basado en el zoom
//      const calculateOffset = (index, totalEvents, zoom) => {
//           const angle = (index * 2 * Math.PI) / totalEvents;
//           // Radio base que se ajusta según el zoom
//           const baseRadius = 0.0002;
//           const zoomFactor = Math.max(0.1, (20 - zoom) / 20); // Ajusta el radio según el zoom
//           const radius = baseRadius * zoomFactor;
          
//           return [
//                Math.cos(angle) * radius,
//                Math.sin(angle) * radius
//           ];
//      };

//      // Calcular las coordenadas y el GeoJSON
//      const { offsetCoordinates, squareGeoJSON } = useMemo(() => {
//           if (!map || !coordinates) return { offsetCoordinates: coordinates, squareGeoJSON: null };

//           const eventsAtSameLocation = map.getStyle().layers
//                .filter(layer => layer.type === 'fill-extrusion')
//                .filter(layer => {
//                     const source = map.getSource(layer.id.replace('layer-', 'source-'));
//                     if (!source) return false;
//                     const sourceData = source._data;
//                     return sourceData.geometry.coordinates[0][0][0] === coordinates[0] &&
//                            sourceData.geometry.coordinates[0][0][1] === coordinates[1];
//                });

//           const currentZoom = map.getZoom();
//           const index = eventsAtSameLocation.length;
//           const [offsetX, offsetY] = calculateOffset(index, index + 1, currentZoom);
//           const newOffsetCoordinates = [
//                coordinates[0] + offsetX,
//                coordinates[1] + offsetY
//           ];

//           const newSquareGeoJSON = {
//                type: "Feature",
//                geometry: {
//                     type: "Polygon",
//                     coordinates: [[
//                          [newOffsetCoordinates[0] - 0.0005, newOffsetCoordinates[1] - 0.0005],
//                          [newOffsetCoordinates[0] + 0.0005, newOffsetCoordinates[1] - 0.0005],
//                          [newOffsetCoordinates[0] + 0.0005, newOffsetCoordinates[1] + 0.0005],
//                          [newOffsetCoordinates[0] - 0.0005, newOffsetCoordinates[1] + 0.0005],
//                          [newOffsetCoordinates[0] - 0.0005, newOffsetCoordinates[1] - 0.0005],
//                     ]],
//                },
//                properties: { 
//                     height: event.height,
//                     name: event.name,
//                     date: event.startDate
//                },
//           };

//           return { offsetCoordinates: newOffsetCoordinates, squareGeoJSON: newSquareGeoJSON };
//      }, [map, coordinates, event]);

//      // Usar todos los hooks
//      useTooltip(map, layerId, offsetCoordinates, event);
//      useExtrusion(map, sourceId, layerId, squareGeoJSON, event, showMarkers);
//      useZoomHandler(map, sourceId, coordinates, squareGeoJSON, calculateOffset);
//      useClickHandler(map, layerId, event, onLayerClick);

//      return null;
// });

// export default SquareLayer;