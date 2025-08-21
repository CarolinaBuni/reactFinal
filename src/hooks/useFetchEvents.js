import { useState, useCallback, useRef, useEffect } from "react";
import eventService from "../services/eventService";


const useFetchEvents = () => {
    console.log('🔄 useFetchEvents renderizado');
    
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const processEvents = useCallback((eventsData) => {
        if (!isMountedRef.current) return;
        
        const heights = [100, 300, 600, 900, 1200, 1500];

        const fetchedEvents = eventsData.map((event) => {
            const randomHeight = heights[Math.floor(Math.random() * heights.length)];
 
            
            if (!event.coordinates || !event.coordinates.lat || !event.coordinates.lng) {
                console.warn(`Coordenadas inválidas para el evento ${event._id}`);
                return null;
            }

            const coordinates = [parseFloat(event.coordinates.lng), parseFloat(event.coordinates.lat)];
            
            const eventDate = new Date(event.startDate);

            return {
                id: event._id || event.ticketmasterId,
                name: event.name,
                coordinates: coordinates, 
                height: randomHeight,
                startDate: eventDate.toISOString().split('T')[0],
                classificationName: event.category || '',
                genreName: event.genre || '',
                subGenreName: event.subgenre || '',
                promoterName: event.promoter || '',
                priceRanges: event.price ? [{
                    min: event.price.min,
                    max: event.price.max,
                    currency: "EUR"
                }] : [],
                venueName: event.venue?.name || '',
                cityName: event.venue?.city || '',
                address: event.venue?.address || '',
                image: event.image || event.secondaryImage || 'https://picsum.photos/500/300?random=' + Math.floor(Math.random() * 1000),
                secondaryImage: event.secondaryImage || event.image || '',
                url: event.url || '',
                status: event.status || '',
            };
        });

        if (isMountedRef.current) {
            setEvents(prevEvents => {
                const newEvents = fetchedEvents.filter(Boolean);
                
                if (prevEvents.length !== newEvents.length) return newEvents;
                if (prevEvents.length === 0 && newEvents.length === 0) return prevEvents; 
                
                const areEqual = prevEvents.every((prev, index) => 
                    prev.id === newEvents[index]?.id
                );
                
                return areEqual ? prevEvents : newEvents;
            });
        }
    }, []);

    // Función para buscar eventos por texto
    // const searchEvents = useCallback(async (query, filters = {}) => {
    //     if (isMountedRef.current) {
    //         setLoading(true);
    //     }
        
    //     try {
    //         const queryParams = new URLSearchParams({ q: query });
            
    //         //  filtros adicionales
    //         if (filters.category) queryParams.append('category', filters.category);
    //         if (filters.genre) queryParams.append('genre', filters.genre);
    //         if (filters.location) queryParams.append('city', filters.location);
    //         if (filters.dateFrom) queryParams.append('startDate', filters.dateFrom);
    //         if (filters.dateTo) queryParams.append('endDate', filters.dateTo);
            
    //         const result = await fetchWithAuth(`/events/search?${queryParams.toString()}`);
            
    //         if (!result.success || !result.data) throw new Error("Formato de respuesta inesperado");

    //         if (isMountedRef.current) {
    //             processEvents(result.data);
    //         }
            
    //     } catch (err) {
    //         if (isMountedRef.current) {
    //             setError("Error en la búsqueda de eventos");
    //         }
    //         console.error('Error details:', err);
    //     } finally {
    //         if (isMountedRef.current) {
    //             setLoading(false);
    //         }
    //     }
    // }, []);

        // Función para buscar eventos por texto
        const searchEvents = useCallback(async (query, filters = {}) => {
            if (isMountedRef.current) {
                setLoading(true);
            }
            
            try {
                const result = await eventService.searchEvents(query, filters);
                
                if (!result.success || !result.data) throw new Error("Formato de respuesta inesperado");
    
                if (isMountedRef.current) {
                    processEvents(result.data);
                }
                
            } catch (err) {
                if (isMountedRef.current) {
                    setError("Error en la búsqueda de eventos");
                }
                console.error('Error details:', err);
            } finally {
                if (isMountedRef.current) {
                    setLoading(false);
                }
            }
        }, []);

    // const fetchEvents = useCallback(async (params = {}) => {
    //     if (isMountedRef.current) {
    //         setLoading(true);
    //     }
        
    //     try {
    //         const queryParams = new URLSearchParams();
    //         Object.entries(params).forEach(([key, value]) => {
    //             queryParams.append(key, value);
    //         });
            
    //         const queryString = queryParams.toString();
    //         const url = `/events${queryString ? `?${queryString}` : ''}`;

    //         const result = await fetchWithAuth(url);
            
    //         if (!result.success || !result.data) {
    //             throw new Error("Formato de respuesta inesperado");
    //         }
            
    //         if (isMountedRef.current) {
    //             processEvents(result.data);
    //         }

    //     } catch (err) {
    //         if (isMountedRef.current) {
    //             setError("Error fetching events");
    //         }
    //         console.error('Error details:', err);
    //     } finally {
    //         if (isMountedRef.current) {
    //             setLoading(false);
    //         }
    //     }
    // }, []);

    const fetchEvents = useCallback(async (params = {}) => {
        if (isMountedRef.current) {
            setLoading(true);
        }
        
        try {
            const result = await eventService.fetchEvents(params);
            
            if (!result.success || !result.data) {
                throw new Error("Formato de respuesta inesperado");
            }
            
            if (isMountedRef.current) {
                processEvents(result.data);
            }

        } catch (err) {
            if (isMountedRef.current) {
                setError("Error fetching events");
            }
            console.error('Error details:', err);
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, []);
    return {
    events,
    error,
    loading,
    fetchEvents,
    searchEvents
};
};

export default useFetchEvents;