export const createGeoJSONFeature = ( event ) => {

    if ( !Array.isArray( event.coordinates ) || event.coordinates.length !== 2 ) {
        console.error( '10. Formato de coordenadas incorrecto:', event.coordinates );

        const coordinates = Array.isArray( event.coordinates )
            ? event.coordinates
            : [ event.coordinates?.lng || 0, event.coordinates?.lat || 0 ];

        console.log( '10.1 Coordenadas recuperadas:', coordinates );

        return {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [ [
                    [ coordinates[ 0 ] - 0.0005, coordinates[ 1 ] - 0.0005 ],
                    [ coordinates[ 0 ] + 0.0005, coordinates[ 1 ] - 0.0005 ],
                    [ coordinates[ 0 ] + 0.0005, coordinates[ 1 ] + 0.0005 ],
                    [ coordinates[ 0 ] - 0.0005, coordinates[ 1 ] + 0.0005 ],
                    [ coordinates[ 0 ] - 0.0005, coordinates[ 1 ] - 0.0005 ],
                ] ]
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
    };
};

// Función para crear puntos (círculos)
export const createPointFeature = ( event ) => {
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