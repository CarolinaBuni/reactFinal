import reviewService from '../../../services/reviewService';

export const useReviewsLogic = ( actions ) => {
     // Eliminación de reviews
     const handleShowDeleteConfirm = ( review, e, onDeleted ) => {
          e.stopPropagation();
          actions.setConfirmDeleteReview( { review, onDeleted } );
     };

     const handleConfirmDelete = async ( reviewData ) => {
          try {
               const response = await reviewService.deleteReview( reviewData.review._id );
               if ( response.success ) {
                    reviewData.onDeleted( reviewData.review._id );
               }
          } catch ( error ) {
               console.error( "Error al eliminar review:", error );
          }
          actions.setConfirmDeleteReview( null );
     };

     const handleCancelDelete = () => {
          actions.setConfirmDeleteReview( null );
     };

     return {
          handleShowDeleteConfirm,
          handleConfirmDelete,
          handleCancelDelete
     };
}; 