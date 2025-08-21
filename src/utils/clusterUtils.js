// Función para agrupar eventos por región
export const createClusterData = ( events ) => {
     const clusters = {};

     // Agrupar eventos por región
     events.forEach( event => {
          const region = event.cityName || 'Unknown'; 

          if ( !clusters[ region ] ) {
               clusters[ region ] = {
                    events: [],
                    coordinates: [ 0, 0 ], 
                    count: 0
               };
          }

          clusters[ region ].events.push( event );
          clusters[ region ].count++;
     } );

     // Calcular centro de masa para cada región
     Object.keys( clusters ).forEach( region => {
          const cluster = clusters[ region ];
          let totalLng = 0, totalLat = 0;

          cluster.events.forEach( event => {
               totalLng += event.coordinates[ 0 ];
               totalLat += event.coordinates[ 1 ];
          } );

          cluster.coordinates = [
               totalLng / cluster.events.length,
               totalLat / cluster.events.length
          ];
     } );

     // Convertir a GeoJSON
     const features = Object.entries( clusters ).map( ( [ region, data ] ) => ( {
          type: 'Feature',
          geometry: {
               type: 'Point',
               coordinates: data.coordinates
          },
          properties: {
               region,
               count: data.count,
               eventIds: data.events.map( e => e.id )
          }
     } ) );

     return {
          type: 'FeatureCollection',
          features
     };
};