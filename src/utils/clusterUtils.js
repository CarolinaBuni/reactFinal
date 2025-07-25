// Función para agrupar eventos por región
export const createClusterData = ( events ) => {
     const clusters = {};

     // Función para determinar la región
     const getRegion = ( cityName ) => {
          if ( !cityName ) return 'Unknown';

          const city = cityName.toLowerCase();
          if ( city.includes( 'angeles' ) || city.includes( 'hollywood' ) ||
               city.includes( 'inglewood' ) || city.includes( 'anaheim' ) ||
               city.includes( 'long beach' ) || city.includes( 'burbank' ) ) {
               return 'Los Angeles';
          }
          if ( city.includes( 'madrid' ) ) return 'Madrid';
          if ( city.includes( 'barcelona' ) ) return 'Barcelona';
          return cityName; // Otras ciudades mantienen su nombre
     };

     // Agrupar eventos por región
     events.forEach( event => {
          const region = getRegion( event.cityName );

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