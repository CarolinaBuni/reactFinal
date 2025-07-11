import { useState, useCallback, useRef } from 'react';

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

          if ( !comment.trim() ) {
               return 'Por favor, escribe un comentario';
          }

          if ( comment.trim().length < 10 ) {
               return 'El comentario debe tener al menos 10 caracteres';
          }

          return null;
     }, [] );

     // Función para hacer la llamada a la API
     const makeApiCall = useCallback( async ( reviewData ) => {
          let response;

          if ( existingReview ) {
               // Actualizar review existente
               const url = `http://localhost:3000/api/reviews/${ existingReview._id }`;
               response = await fetch( url, {
                    method: 'PUT',
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${ localStorage.getItem( 'accessToken' ) }`
                    },
                    body: JSON.stringify( reviewData )
               } );
          } else {
               // Crear nueva review
               response = await fetch( 'http://localhost:3000/api/reviews', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${ localStorage.getItem( 'accessToken' ) }`
                    },
                    body: JSON.stringify( reviewData )
               } );
          }

          return response;
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
               const reviewData = {
                    eventId: event._id || event.id,
                    rating,
                    comment: comment.trim()
               };

               const response = await makeApiCall( reviewData );
               const data = await response.json();

               if ( response.ok && data.success ) {
                    onClose();
                    return true;
               } else {
                    if ( isMountedRef.current ) {
                         setError( data.message || 'Error al guardar la review' );
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