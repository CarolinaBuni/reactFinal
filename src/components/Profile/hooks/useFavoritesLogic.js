import { useCallback } from "react";

export const useFavoritesLogic = ( actions, toggleFavorite ) => {
     // Manejar eliminación de favoritos
     const handleShowDeleteConfirm = useCallback( ( event, e ) => {
          e.stopPropagation();
          actions.setConfirmDelete( event );
     }, [ actions.setConfirmDelete ] );

     const handleConfirmDelete = useCallback( ( event ) => {
          toggleFavorite( event );
          actions.setConfirmDelete( null );
     }, [ actions.setConfirmDelete ] );

     const handleCancelDelete = useCallback( () => {
          actions.setConfirmDelete( null );
     }, [ actions.setConfirmDelete ] );

     return {
          handleShowDeleteConfirm,
          handleConfirmDelete,
          handleCancelDelete
     };
};