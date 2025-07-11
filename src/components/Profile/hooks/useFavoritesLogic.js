export const useFavoritesLogic = ( actions, toggleFavorite ) => {
     // Manejar eliminación de favoritos
     const handleShowDeleteConfirm = ( event, e ) => {
          e.stopPropagation();
          actions.setConfirmDelete( event );
     };

     const handleConfirmDelete = ( event ) => {
          toggleFavorite( event );
          actions.setConfirmDelete( null );
     };

     const handleCancelDelete = () => {
          actions.setConfirmDelete( null );
     };

     return {
          handleShowDeleteConfirm,
          handleConfirmDelete,
          handleCancelDelete
     };
};