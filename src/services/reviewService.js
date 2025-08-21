import { fetchWithAuth } from './authService';

const reviewService = {
     // Obtener reseñas de un evento
     getEventReviews: async ( eventId ) => {
          try {
               return await fetchWithAuth( `/reviews/event/${ eventId }` );
          } catch ( error ) {
               console.error( 'Error al obtener reseñas del evento:', error );
               return { success: false, data: [] };
          }
     },

     // Obtener reseñas del usuario
     getUserReviews: async () => {
          try {
               return await fetchWithAuth( '/reviews/user' );
          } catch ( error ) {
               console.error( 'Error al obtener reseñas del usuario:', error );
               return { success: false, data: [] };
          }
     },

     // Crear una reseña
     createReview: async ( eventId, rating, comment ) => {
          try {
               return await fetchWithAuth( '/reviews', {
                    method: 'POST',
                    body: JSON.stringify( {
                         eventId,
                         rating,
                         comment
                    } )
               } );
          } catch ( error ) {
               console.error( 'Error al crear reseña:', error );
               return { success: false, message: error.message };
          }
     },

     // Actualizar una reseña
     updateReview: async ( reviewId, rating, comment ) => {
          try {
               return await fetchWithAuth( `/reviews/${ reviewId }`, {
                    method: 'PUT',
                    body: JSON.stringify( {
                         rating,
                         comment
                    } )
               } );
          } catch ( error ) {
               console.error( 'Error al actualizar reseña:', error );
               return { success: false, message: error.message };
          }
     },

     // Eliminar una reseña
     deleteReview: async ( reviewId ) => {
          try {
               return await fetchWithAuth( `/reviews/${ reviewId }`, {
                    method: 'DELETE'
               } );
          } catch ( error ) {
               console.error( 'Error al eliminar reseña:', error );
               return { success: false, message: error.message };
          }
     }
};

export default reviewService;