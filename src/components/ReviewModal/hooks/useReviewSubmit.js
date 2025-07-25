import { useState, useCallback, useRef } from 'react';
import reviewService from '../../../services/reviewService';

export const useReviewSubmit = ( event, existingReview, onClose ) => {
     const [ loading, setLoading ] = useState( false );
     const [ error, setError ] = useState( '' );
     const isMountedRef = useRef( true );

     // Cleanup para evitar actualizaciones después del desmontaje
     const cleanup = useCallback( () => {
          isMountedRef.current = false;
     }, [] );

     // Función de validación
     const validateReview = useCallback( ( rating, comment ) => {
          if ( rating === 0 ) {
               return 'Por favor, selecciona una calificación';
          }

          if ( !comment || !comment.trim() ) {
               return 'Por favor, escribe un comentario';
          }

          if ( comment.trim().length < 10 ) {
               return 'El comentario debe tener al menos 10 caracteres';
          }

          return null;
     }, [] );

     // Función para hacer la llamada a la API usando reviewService
     const makeApiCall = useCallback( async ( eventId, rating, comment ) => {
          if ( existingReview ) {
               // Actualizar review existente
               return await reviewService.updateReview( existingReview._id, rating, comment );
          } else {
               // Crear nueva review
               return await reviewService.createReview( eventId, rating, comment );
          }
     }, [ existingReview ] );

     // Función principal de envío
     const submitReview = useCallback( async ( rating, comment ) => {
          // Validar datos
          const validationError = validateReview( rating, comment );
          if ( validationError ) {
               if ( isMountedRef.current ) setError( validationError );
               return false;
          }

          // Iniciar loading
          if ( isMountedRef.current ) {
               setLoading( true );
               setError( '' );
          }

          try {
               const eventId = event._id || event.id;
               const trimmedComment = comment.trim();

               const response = await makeApiCall( eventId, rating, trimmedComment );

               if ( response.success ) {
                    onClose();
                    return true;
               } else {
                    if ( isMountedRef.current ) {
                         setError( response.message || 'Error al guardar la review' );
                    }
                    return false;
               }
          } catch ( err ) {
               console.error( 'Error:', err );
               if ( isMountedRef.current ) {
                    setError( 'Error de conexión. Inténtalo de nuevo.' );
               }
               return false;
          } finally {
               if ( isMountedRef.current ) {
                    setLoading( false );
               }
          }
     }, [ event, validateReview, makeApiCall, onClose ] );

     return {
          loading,
          error,
          submitReview,
          setError,
          cleanup
     };
};