import { useEffect } from 'react';

export const useZoomHandler = (map, sourceId, coordinates, squareGeoJSON, calculateOffset) => {
    useEffect(() => {
        if (!map || !coordinates || !squareGeoJSON) return;

        const handleZoom = () => {
            const newZoom = map.getZoom();
            const index = map.getStyle().layers.filter(layer => layer.type === 'fill-extrusion').length;
            const [newOffsetX, newOffsetY] = calculateOffset(index, index + 1, newZoom);
            const newOffsetCoordinates = [
                coordinates[0] + newOffsetX,
                coordinates[1] + newOffsetY
            ];

            if (map.getSource(sourceId)) {
                map.getSource(sourceId).setData({
                    ...squareGeoJSON,
                    geometry: {
                        ...squareGeoJSON.geometry,
                        coordinates: [[
                            [newOffsetCoordinates[0] - 0.0005, newOffsetCoordinates[1] - 0.0005],
                            [newOffsetCoordinates[0] + 0.0005, newOffsetCoordinates[1] - 0.0005],
                            [newOffsetCoordinates[0] + 0.0005, newOffsetCoordinates[1] + 0.0005],
                            [newOffsetCoordinates[0] - 0.0005, newOffsetCoordinates[1] + 0.0005],
                            [newOffsetCoordinates[0] - 0.0005, newOffsetCoordinates[1] - 0.0005],
                        ]]
                    }
                });
            }
        };

        map.on('zoom', handleZoom);

        return () => {
            map.off('zoom', handleZoom);
        };
    }, [map, sourceId, coordinates, squareGeoJSON, calculateOffset]);
}; 