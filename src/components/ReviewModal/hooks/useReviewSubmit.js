import { useState, useCallback, useRef } from 'react';
import reviewService from '../../../services/reviewService';

export const useReviewSubmit = ( event, existingReview, onClose ) => {
     const [ loading, setLoading ] = useState( false );
     const [ error, setError ] = useState( '' );
     const isMountedRef = useRef( true );

     const cleanup = useCallback( () => {
          isMountedRef.current = false;
     }, [] );


     const makeApiCall = useCallback( async ( eventId, rating, comment ) => {
          if ( existingReview ) {

               return await reviewService.updateReview( existingReview._id, rating, comment );
          } else {
               
               return await reviewService.createReview( eventId, rating, comment );
          }
     }, [ existingReview ] );

     const submitReview = useCallback( async ( rating, comment ) => {

          if ( isMountedRef.current ) {
               setLoading( true );
               setError( '' );
          }

          try {
               const eventId = event._id || event.id;
               const trimmedComment = comment.trim();

               const response = await makeApiCall( eventId, rating, trimmedComment );

               if ( response.success ) {
                    const reviewData = response.data || { eventId: eventId, rating, comment };
                    onClose(true, { reviewData, isEdit: !!existingReview });
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
     }, [ event, makeApiCall, onClose ] );

     return {
          loading,
          error,
          submitReview,
          setError,
          cleanup
     };
};