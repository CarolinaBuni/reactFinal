// SquareLayer.jsx

import { useEffect } from "react";

const SquareLayer = ( { map, event, showMarkers } ) => {
     console.log( "SquareLayer Render Start" );

     const sourceId = `source-${ event.id }`;
     const layerId = `layer-${ event.id }`;
     const coordinates = event.coordinates;

     useEffect( () => {
          if ( !map || !coordinates ) return;

          const colorMap = {
               300: "#ff5733",
               600: "#33ff57",
               900: "#ff4886",
               1200: "#3357ff",
          };

          const createLayerAndSource = () => {
               const squareGeoJSON = {
                    type: "Feature",
                    geometry: {
                         type: "Polygon",
                         coordinates: [
                              [
                                   [ coordinates[ 0 ] - 0.0005, coordinates[ 1 ] - 0.0005 ],
                                   [ coordinates[ 0 ] + 0.0005, coordinates[ 1 ] - 0.0005 ],
                                   [ coordinates[ 0 ] + 0.0005, coordinates[ 1 ] + 0.0005 ],
                                   [ coordinates[ 0 ] - 0.0005, coordinates[ 1 ] + 0.0005 ],
                                   [ coordinates[ 0 ] - 0.0005, coordinates[ 1 ] - 0.0005 ],
                              ],
                         ],
                    },
                    properties: { height: event.height || 300 },
               };

               if ( !map.getSource( sourceId ) ) {
                    map.addSource( sourceId, { type: "geojson", data: squareGeoJSON } );
               } else {
                    map.getSource( sourceId ).setData( squareGeoJSON );
               }

               if ( !map.getLayer( layerId ) ) {
                    map.addLayer( {
                         id: layerId,
                         type: "fill-extrusion",
                         source: sourceId,
                         paint: {
                              "fill-extrusion-color": colorMap[ event.height ] || "#ff69b4",
                              "fill-extrusion-height": [ "get", "height" ],
                              "fill-extrusion-base": 0,
                              "fill-extrusion-opacity": 0.8,
                         },
                         layout: {
                              visibility: showMarkers ? "visible" : "none",
                         },
                    } );
               }
          };

          createLayerAndSource();
          map.on( "style.load", createLayerAndSource );

          return () => {
               map.off( "style.load", createLayerAndSource );
               if ( map.getLayer( layerId ) ) map.removeLayer( layerId );
               if ( map.getSource( sourceId ) ) map.removeSource( sourceId );
          };
     }, [ map, event, showMarkers ] );

     return null;
};

export default SquareLayer;