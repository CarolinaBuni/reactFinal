import { fetchWithAuth } from './authService';

const eventService = {
  // Obtener todos los eventos
  getAllEvents: async (params = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, value);
    });
    
    const queryString = queryParams.toString();
    const url = `/events${queryString ? `?${queryString}` : ''}`;
    
    return fetchWithAuth(url);
  },
  
  // Obtener un evento por su ID
  getEventById: async (id) => {
    return fetchWithAuth(`/events/${id}`);
  },
  // Obtener eventos pasados
  getPastEvents: async () => {
    return fetchWithAuth('/events/past');
  },

  searchEvents: async (query, filters = {}) => {
    const queryParams = new URLSearchParams({ q: query });
  
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.genre) queryParams.append('genre', filters.genre);
    if (filters.location) queryParams.append('city', filters.location);     
    if (filters.dateFrom) queryParams.append('startDate', filters.dateFrom);  
    if (filters.dateTo) queryParams.append('endDate', filters.dateTo);        
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
  
    return fetchWithAuth(`/events/search?${queryParams.toString()}`);
  },

  // Obtener eventos con parámetros
  fetchEvents: async (params = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, value);
    });
    const queryString = queryParams.toString();
    const url = `/events${queryString ? `?${queryString}` : ''}`;
    return fetchWithAuth(url);
  }
};

export default eventService;