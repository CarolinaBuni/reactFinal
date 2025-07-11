// export const createGeoJSONFeature = ( event ) => ( {
//      type: 'Feature',
//      geometry: {
//           type: 'Polygon',
//           coordinates: [ [
//                [ event.coordinates[ 0 ] - 0.0005, event.coordinates[ 1 ] - 0.0005 ],
//                [ event.coordinates[ 0 ] + 0.0005, event.coordinates[ 1 ] - 0.0005 ],
//                [ event.coordinates[ 0 ] + 0.0005, event.coordinates[ 1 ] + 0.0005 ],
//                [ event.coordinates[ 0 ] - 0.0005, event.coordinates[ 1 ] + 0.0005 ],
//                [ event.coordinates[ 0 ] - 0.0005, event.coordinates[ 1 ] - 0.0005 ],
//           ] ]
//      },
//      properties: {
//           id: event.id,
//           height: event.height,
//           name: event.name,
//           date: event.startDate
//      }
// } );


export const createGeoJSONFeature = (event) => {
    //  console.log('9. Creando GeoJSON para evento:', {
    //      id: event.id,
    //      name: event.name,
    //      coordinates: event.coordinates
    //  });
     
     // Verificar que las coordenadas sean un array de longitud 2
     if (!Array.isArray(event.coordinates) || event.coordinates.length !== 2) {
         console.error('10. Formato de coordenadas incorrecto:', event.coordinates);
         // Intentar recuperar si es posible
         const coordinates = Array.isArray(event.coordinates) 
             ? event.coordinates 
             : [event.coordinates?.lng || 0, event.coordinates?.lat || 0];
         
         console.log('10.1 Coordenadas recuperadas:', coordinates);
         
         return {
             type: 'Feature',
             geometry: {
                 type: 'Polygon',
                 coordinates: [[
                     [coordinates[0] - 0.0005, coordinates[1] - 0.0005],
                     [coordinates[0] + 0.0005, coordinates[1] - 0.0005],
                     [coordinates[0] + 0.0005, coordinates[1] + 0.0005],
                     [coordinates[0] - 0.0005, coordinates[1] + 0.0005],
                     [coordinates[0] - 0.0005, coordinates[1] - 0.0005],
                 ]]
             },
             properties: {
                 id: event.id,
                 height: event.height,
                 name: event.name,
                 date: event.startDate
             }
         };
     }
     
     return {
         type: 'Feature',
         geometry: {
             type: 'Polygon',
             coordinates: [[
                 [event.coordinates[0] - 0.0005, event.coordinates[1] - 0.0005],
                 [event.coordinates[0] + 0.0005, event.coordinates[1] - 0.0005],
                 [event.coordinates[0] + 0.0005, event.coordinates[1] + 0.0005],
                 [event.coordinates[0] - 0.0005, event.coordinates[1] + 0.0005],
                 [event.coordinates[0] - 0.0005, event.coordinates[1] - 0.0005],
             ]]
         },
         properties: {
             id: event.id,
             height: event.height,
             name: event.name,
             date: event.startDate
         }
     };
 };

// Nueva función para crear puntos (círculos)
export const createPointFeature = (event) => {
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: event.coordinates
        },
        properties: {
            id: event.id,
            height: event.height,
            name: event.name,
            date: event.startDate
        }
    };
};