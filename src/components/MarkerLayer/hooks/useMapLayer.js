import { useEffect, useState } from 'react';
import { HEIGHT_COLORS, LAYER_CONFIG } from '../constants/layerConfig';

// const useMapLayer = (map, sourceId, layerId, geoJSON, clusterGeoJSON, showMarkers) => {
//      useEffect(() => {
//          console.log('11. useMapLayer effect:', { 
//              mapExists: !!map, 
//              showMarkers, 
//              featuresCount: geoJSON.features.length 
//          });
 
//          if (!map) return;
 
//          if (!map.getSource(sourceId)) {
//              console.log('12. Creando nueva fuente:', sourceId);
//              map.addSource(sourceId, {
//                  type: 'geojson',
//                  data: geoJSON
//              });
//          } else {
//              console.log('13. Actualizando fuente existente:', sourceId);
//              map.getSource(sourceId).setData(geoJSON);
//          }
 
//          if (!map.getLayer(layerId)) {
//              console.log('14. Creando nueva capa:', layerId);
//              map.addLayer({
//                  id: layerId,
//                  type: 'fill-extrusion',
//                  source: sourceId,
//                  paint: {
//                      'fill-extrusion-color': [
//                          'match',
//                          ['get', 'height'],
//                          100, HEIGHT_COLORS[100],
//                          300, HEIGHT_COLORS[300],
//                          600, HEIGHT_COLORS[600],
//                          900, HEIGHT_COLORS[900],
//                          1200, HEIGHT_COLORS[1200],
//                          1500, HEIGHT_COLORS[1500],
//                          HEIGHT_COLORS.default
//                      ],
//                      'fill-extrusion-height': ['get', 'height'],
//                      ...LAYER_CONFIG.paint
//                  },
//                  layout: {
//                      visibility: showMarkers ? 'visible' : 'none'
//                  }
//              });
//          } else {
//              console.log('15. Actualizando visibilidad de capa:', layerId, showMarkers ? 'visible' : 'none');
//              map.setLayoutProperty(layerId, 'visibility', showMarkers ? 'visible' : 'none');
//          }
 
//          return () => {
//              console.log('16. Limpiando efecto useMapLayer');
//              // La limpieza se maneja en otro lugar
//          };
//      }, [map, geoJSON, showMarkers]);
//  };

// export default useMapLayer;


const useMapLayer = (map, sourceId, layerId, geoJSON, circleGeoJSON, clusterGeoJSON, showMarkers) => {
    const [currentZoom, setCurrentZoom] = useState(1);
    
    useEffect(() => {
        if (!map) return;
        
        // Listener para cambios de zoom
        const handleZoomChange = () => {
            const zoom = map.getZoom();
            setCurrentZoom(zoom);
        };

        map.on('zoomend', handleZoomChange);
        
        const addOrUpdateLayers = () => {
            try {
                // FUENTE PRINCIPAL - eventos individuales
                if (!map.getSource(sourceId)) {
                    map.addSource(sourceId, {
                        type: 'geojson',
                        data: geoJSON
                    });
                } else {
                    map.getSource(sourceId).setData(geoJSON);
                }

                // FUENTE CLUSTERS
                const clusterSourceId = sourceId + '-clusters';
                if (!map.getSource(clusterSourceId)) {
                    map.addSource(clusterSourceId, {
                        type: 'geojson',
                        data: clusterGeoJSON
                    });
                } else {
                    map.getSource(clusterSourceId).setData(clusterGeoJSON);
                }

                // ✅ AÑADIR ESTO - FUENTE CÍRCULOS (PUNTOS)
                const circleSourceId = sourceId + '-circles';
                if (!map.getSource(circleSourceId)) {
                    map.addSource(circleSourceId, {
                        type: 'geojson',
                        data: circleGeoJSON
                    });
                } else {
                    map.getSource(circleSourceId).setData(circleGeoJSON);
                }

                // CAPA 1: CLUSTERS (zoom ≤ 8)
                const clusterLayerId = layerId + '-clusters';
                if (!map.getLayer(clusterLayerId)) {
                    map.addLayer({
                        id: clusterLayerId,
                        type: 'circle',
                        source: clusterSourceId,
                        paint: {
                            'circle-radius': [
                                'interpolate', ['linear'], ['get', 'count'],
                                5, 20,   // 5 eventos = radio 20px
                                50, 40,  // 50 eventos = radio 40px
                                100, 60, // 100 eventos = radio 60px
                                200, 80  // 200+ eventos = radio 80px
                            ],
                            'circle-color': [
                                'interpolate', ['linear'], ['get', 'count'],
                                5, '#4ecdc4',   // Pocos eventos = azul claro
                                25, '#f39c12',  // Medios = naranja
                                50, '#e74c3c'   // Muchos = rojo
                            ],
                            'circle-opacity': 0.8,
                            'circle-stroke-width': 3,
                            'circle-stroke-color': '#ffffff'
                        },
                        layout: {
                            visibility: (showMarkers && currentZoom <= 8) ? 'visible' : 'none'
                        }
                    });
                    
                    // Etiquetas de clusters
                    map.addLayer({
                        id: clusterLayerId + '-labels',
                        type: 'symbol',
                        source: clusterSourceId,
                        layout: {
                            'text-field': ['get', 'count'],
                            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                            'text-size': 14,
                            visibility: (showMarkers && currentZoom <= 8) ? 'visible' : 'none'
                        },
                        paint: {
                            'text-color': '#ffffff'
                        }
                    });
                }

                // CAPA 2: CÍRCULOS INDIVIDUALES (zoom 8-12)
                const circleLayerId = layerId + '-circles';
                if (!map.getLayer(circleLayerId)) {
                    map.addLayer({
                        id: circleLayerId,
                        type: 'circle',
                        source: circleSourceId,
                        paint: {
                            'circle-radius': 6,
                            'circle-color': [
                                'match', ['get', 'height'],
                                100, HEIGHT_COLORS[100],
                                300, HEIGHT_COLORS[300],
                                600, HEIGHT_COLORS[600],
                                900, HEIGHT_COLORS[900],
                                1200, HEIGHT_COLORS[1200],
                                1500, HEIGHT_COLORS[1500],
                                HEIGHT_COLORS.default
                            ],
                            'circle-stroke-width': 2,
                            'circle-stroke-color': '#ffffff'
                        },
                        layout: {
                            visibility: (showMarkers && currentZoom > 8 && currentZoom <= 12) ? 'visible' : 'none'
                        }
                    });
                }

                // CAPA 3: EXTRUSIONES 3D (zoom > 12)
                const extrusionLayerId = layerId + '-extrusions';
                if (!map.getLayer(extrusionLayerId)) {
                    map.addLayer({
                        id: extrusionLayerId,
                        type: 'fill-extrusion',
                        source: sourceId,
                        paint: {
                            'fill-extrusion-color': [
                                'match', ['get', 'height'],
                                100, HEIGHT_COLORS[100],
                                300, HEIGHT_COLORS[300],
                                600, HEIGHT_COLORS[600],
                                900, HEIGHT_COLORS[900],
                                1200, HEIGHT_COLORS[1200],
                                1500, HEIGHT_COLORS[1500],
                                HEIGHT_COLORS.default
                            ],
                            'fill-extrusion-height': ['get', 'height'],
                            ...LAYER_CONFIG.paint
                        },
                        layout: {
                            visibility: (showMarkers && currentZoom > 12) ? 'visible' : 'none'
                        }
                    });
                }

                // ACTUALIZAR VISIBILIDAD SEGÚN ZOOM
                const clusterVis = (showMarkers && currentZoom <= 8) ? 'visible' : 'none';
                const circleVis = (showMarkers && currentZoom > 8 && currentZoom <= 12) ? 'visible' : 'none';
                const extrusionVis = (showMarkers && currentZoom > 12) ? 'visible' : 'none';

                
                
                map.setLayoutProperty(clusterLayerId, 'visibility', clusterVis);
                map.setLayoutProperty(clusterLayerId + '-labels', 'visibility', clusterVis);
                map.setLayoutProperty(circleLayerId, 'visibility', circleVis);
                map.setLayoutProperty(extrusionLayerId, 'visibility', extrusionVis);

            } catch (error) {
                console.error('Error configurando capas:', error);
            }
        };

        if (map.isStyleLoaded()) {
            addOrUpdateLayers();
        } else {
            map.once('load', addOrUpdateLayers);
        }

        return () => {
            map.off('zoomend', handleZoomChange);
            map.off('load', addOrUpdateLayers);
        };
    }, [map, geoJSON, clusterGeoJSON, showMarkers, currentZoom, sourceId, layerId, circleGeoJSON]);
};

export default useMapLayer;

