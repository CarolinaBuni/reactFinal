import { useCallback } from "react";

export const useDeleteLogic = ( actions ) => {
     const startDeleteSequence = useCallback( () => {
          actions.setDeletePhase( 1 );
          setTimeout( () => actions.setDeletePhase( 2 ), 3000 );
     }, [ actions ] );

     const cancelDeleteSequence = useCallback( () => {
          actions.setDeletePhase( 0 );
          actions.setDeleteProgress( 0 );
          actions.setShowDeleteConfirm( false );
     }, [ actions ] );

     return {
          startDeleteSequence,
          cancelDeleteSequence
     };
};