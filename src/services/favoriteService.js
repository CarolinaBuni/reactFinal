import { fetchWithAuth } from './authService';

const favoriteService = {
  // Añadir un evento a favoritos
  addFavorite: async (eventId) => {
    try {
      const response = await fetchWithAuth('/favorites', {
        method: 'POST',
        body: JSON.stringify({ eventId })
      });
      return response;
    } catch (error) {
      console.error('Error al añadir favorito:', error);
      return { success: false, message: error.message };
    }
  },
  
  // Eliminar un evento de favoritos
  removeFavorite: async (eventId) => {
    try {
      const response = await fetchWithAuth(`/favorites/${eventId}`, {
        method: 'DELETE'
      });
      return response;
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      return { success: false, message: error.message };
    }
  },
  
  // Obtener todos los favoritos del usuario
  getUserFavorites: async () => {
    try {
      return await fetchWithAuth('/favorites');
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      return { success: false, data: [] };
    }
  },
  
  // Comprobar si un evento es favorito
  checkFavorite: async (eventId) => {
    try {
      const response = await fetchWithAuth(`/favorites/${eventId}/check`);
      return response;
    } catch (error) {
      console.error('Error al verificar favorito:', error);
      return { success: false, isFavorite: false };
    }
  }
};

export default favoriteService;