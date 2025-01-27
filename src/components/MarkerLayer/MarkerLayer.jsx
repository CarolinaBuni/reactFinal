// MarkersLayer.jsx
import React, { memo, useCallback, useMemo, useEffect } from 'react';
import { usePopup } from "../../Context/PopupContext";
import SquareLayer from '../SquareLayer/SquareLayer';

const MarkerLayer = memo(({ map, events, showMarkers }) => {
     console.log('MarkerLayer Render', { 
          eventsLength: events.length, 
          showMarkers,
          events
     });
     const { togglePopup } = usePopup();
     
     const handleLayerClick = useCallback((event) => {
          togglePopup(event);
     }, [togglePopup]);

     const layers = useMemo(() => 
          events.map(event => (
               <SquareLayer
                    key={event.id}
                    map={map}
                    event={event}
                    showMarkers={showMarkers}
                    onLayerClick={handleLayerClick}
               />
          )), [events, map, showMarkers, handleLayerClick]);

     // En lugar de crear una fuente por evento, crear una única fuente con todos los eventos
     const geoJSON = useMemo(() => ({
          type: 'FeatureCollection',
          features: events.map(event => ({
               type: 'Feature',
               geometry: {
                    type: 'Polygon',
                    coordinates: [[/* ... */]]
               },
               properties: {
                    id: event.id,
                    height: event.height,
                    name: event.name,
                    date: event.startDate
               }
          }))
     }), [events]);

     // Crear una única capa para todas las extrusiones
     useEffect(() => {
          if (!map) return;

          const sourceId = 'events-source';
          const layerId = 'events-layer';

          if (!map.getSource(sourceId)) {
               map.addSource(sourceId, {
                    type: 'geojson',
                    data: geoJSON
               });
          } else {
               map.getSource(sourceId).setData(geoJSON);
          }

          if (!map.getLayer(layerId)) {
               map.addLayer({
                    id: layerId,
                    type: 'fill-extrusion',
                    source: sourceId,
                    paint: {
                         'fill-extrusion-color': [
                              'match',
                              ['get', 'height'],
                              100, '#a7f515',
                              300, '#e70f3e',
                              600, '#f515ea',
                              900, '#ff4886',
                              1200, '#1592db',
                              1500, '#19eeee',
                              '#ff69b4' // default color
                         ],
                         'fill-extrusion-height': ['get', 'height'],
                         'fill-extrusion-base': 0,
                         'fill-extrusion-opacity': 0.8
                    },
                    layout: {
                         visibility: showMarkers ? 'visible' : 'none'
                    }
               });
          }

          return () => {
               if (map.getLayer(layerId)) map.removeLayer(layerId);
               if (map.getSource(sourceId)) map.removeSource(sourceId);
          };
     }, [map, geoJSON, showMarkers]);

     return <>{layers}</>;
}, (prev, next) => {
     const eventsEqual = 
          prev.events.length === next.events.length &&
          prev.events.every((event, index) => event.id === next.events[index].id);
     
     // console.log('MarkerLayer memo comparison:', { 
     //      eventsEqual, 
     //      showMarkersEqual: prev.showMarkers === next.showMarkers,
     //      mapEqual: prev.map === next.map 
     // });
     
     return eventsEqual && 
            prev.showMarkers === next.showMarkers &&
            prev.map === next.map;
});

export default MarkerLayer;