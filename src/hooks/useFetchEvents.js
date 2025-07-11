import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { authService } from "../services/authService";

const useFetchEvents = () => {
    console.log('🔄 useFetchEvents renderizado');
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const isMountedRef = useRef(true);

    // Cleanup para evitar actualizaciones después del desmontaje
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Función para procesar los eventos recibidos del backend
    const processEvents = useCallback((eventsData) => {
        if (!isMountedRef.current) return;
        
        const heights = [100, 300, 600, 900, 1200, 1500];

        const fetchedEvents = eventsData.map((event) => {
            const randomHeight = heights[Math.floor(Math.random() * heights.length)];
            
            // Verificar que existan las coordenadas
            if (!event.coordinates || !event.coordinates.lat || !event.coordinates.lng) {
                console.warn(`Coordenadas inválidas para el evento ${event._id}`);
                return null;
            }

            // Asegurarse de que las coordenadas estén en el formato correcto
            const coordinates = [parseFloat(event.coordinates.lng), parseFloat(event.coordinates.lat)];
            
            // Usar la fecha original del evento sin ajustes
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
                
                // Comparación eficiente por longitud e IDs
                if (prevEvents.length !== newEvents.length) return newEvents;
                if (prevEvents.length === 0) return newEvents;
                
                const areEqual = prevEvents.every((prev, index) => 
                    prev.id === newEvents[index]?.id
                );
                
                return areEqual ? prevEvents : newEvents;
            });
        }
    }, []);

    // Función para buscar eventos por texto
    const searchEvents = useCallback(async (query, filters = {}) => {
        if (isMountedRef.current) {
            setLoading(true);
        }
        
        try {
            // Preparar parámetros de búsqueda
            const queryParams = new URLSearchParams({ q: query });
            
            // Añadir filtros adicionales
            if (filters.category) queryParams.append('category', filters.category);
            if (filters.genre) queryParams.append('genre', filters.genre);
            if (filters.location) queryParams.append('city', filters.location);
            if (filters.dateFrom) queryParams.append('startDate', filters.dateFrom);
            if (filters.dateTo) queryParams.append('endDate', filters.dateTo);
            
            // Realizar la petición
            const response = await fetch(`https://pulse-back-qjhc-7bdtxskek-powermbas-projects.vercel.app/api/events/search?${queryParams.toString()}`, {
                headers: authService.isAuthenticated() ? { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } : {}
            });
            
            if (!response.ok) throw new Error(`Error en la búsqueda: ${response.status}`);
            
            const result = await response.json();
            
            if (!result.success || !result.data) throw new Error("Formato de respuesta inesperado");
            
            // Procesar los eventos recibidos solo si el componente está montado
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
    }, [processEvents]);

    const fetchEvents = useCallback(async (params = {}) => {
        if (isMountedRef.current) {
            setLoading(true);
        }
        
        try {
            // Construir la URL con los parámetros
            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                queryParams.append(key, value);
            });
            
            const queryString = queryParams.toString();
            const url = `https://pulse-back-qjhc-7bdtxskek-powermbas-projects.vercel.app/api/events${queryString ? `?${queryString}` : ''}`;
            
            // Preparar headers con token si el usuario está autenticado
            const headers = {};
            if (authService.isAuthenticated()) {
                const token = localStorage.getItem('accessToken');
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await fetch(url, { headers });
            
            if (!response.ok) {
                throw new Error(`Error fetching events: ${response.status}`);
            }

            const result = await response.json();
            
            if (!result.success || !result.data) {
                throw new Error("Formato de respuesta inesperado");
            }
            
            // Procesar los eventos recibidos solo si el componente está montado
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
    }, [processEvents]);

    return useMemo(() => ({
        events,
        error,
        loading,
        fetchEvents,
        searchEvents
    }), [events, error, loading, fetchEvents, searchEvents]);
};

export default useFetchEvents;