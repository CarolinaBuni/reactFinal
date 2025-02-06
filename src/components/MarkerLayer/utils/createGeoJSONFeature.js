// Función helper fuera del componente
export const createGeoJSONFeature = ( event ) => ( {
     type: 'Feature',
     geometry: {
          type: 'Polygon',
          coordinates: [ [
               [ event.coordinates[ 0 ] - 0.0005, event.coordinates[ 1 ] - 0.0005 ],
               [ event.coordinates[ 0 ] + 0.0005, event.coordinates[ 1 ] - 0.0005 ],
               [ event.coordinates[ 0 ] + 0.0005, event.coordinates[ 1 ] + 0.0005 ],
               [ event.coordinates[ 0 ] - 0.0005, event.coordinates[ 1 ] + 0.0005 ],
               [ event.coordinates[ 0 ] - 0.0005, event.coordinates[ 1 ] - 0.0005 ],
          ] ]
     },
     properties: {
          id: event.id,
          height: event.height,
          name: event.name,
          date: event.startDate
     }
} );