// src/services/eventService.js

import { fetchWithAuth } from './authService';

const eventService = {
  // Obtener todos los eventos
  getAllEvents: async (params = {}) => {
    // Convertir parámetros a string de consulta
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
  }
};

export default eventService;