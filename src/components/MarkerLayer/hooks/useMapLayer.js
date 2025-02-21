import { useEffect } from 'react';
import { HEIGHT_COLORS, LAYER_CONFIG } from '../constants/layerConfig';

const useMapLayer = ( map, sourceId, layerId, geoJSON, showMarkers ) => {
     useEffect( () => {
          if ( !map ) return;
          if ( !map.getSource( sourceId ) ) {
               map.addSource( sourceId, {
                    type: 'geojson',
                    data: geoJSON
               } );
          } else {
               map.getSource( sourceId ).setData( geoJSON );
          }

          if ( !map.getLayer( layerId ) ) {
               map.addLayer( {
                    id: layerId,
                    type: 'fill-extrusion',
                    source: sourceId,
                    paint: {
                         'fill-extrusion-color': [
                              'match',
                              [ 'get', 'height' ],
                              100, HEIGHT_COLORS[ 100 ],
                              300, HEIGHT_COLORS[ 300 ],
                              600, HEIGHT_COLORS[ 600 ],
                              900, HEIGHT_COLORS[ 900 ],
                              1200, HEIGHT_COLORS[ 1200 ],
                              1500, HEIGHT_COLORS[ 1500 ],
                              HEIGHT_COLORS.default
                         ],
                         'fill-extrusion-height': [ 'get', 'height' ],
                         ...LAYER_CONFIG.paint
                    },
                    layout: {
                         visibility: showMarkers ? 'visible' : 'none'
                    }
               } );
          }

          return () => {
               if ( map.getLayer( layerId ) ) map.removeLayer( layerId );
               if ( map.getSource( sourceId ) ) map.removeSource( sourceId );
          };
     }, [ map, geoJSON, showMarkers ] );
};

export default useMapLayer;