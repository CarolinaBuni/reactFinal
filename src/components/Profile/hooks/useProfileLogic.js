import { fetchWithAuth } from "../../../services/authService";
import { useCallback } from "react";


export const useProfileLogic = ( state, actions, user, updateUser, deleteAccount, onClose ) => {
     // EDICIÓN DE PERFIL
     const handleStartEdit = useCallback( () => {
          actions.setEditFormData( {
               username: state.profile.userDetails?.username || user.username || '',
               email: state.profile.userDetails?.email || user.email || '',
               avatar: state.profile.userDetails?.avatar || user.avatar || ''
          } );
          actions.setEditing( true );
          actions.setEditError( '' );
          actions.setEditSuccess( false );
     }, [ state.profile.userDetails, user, actions.setEditFormData, actions.setEditing, actions.setEditError, actions.setEditSuccess ] );

     const handleEditChange = useCallback( ( e ) => {
          const { name, value } = e.target;
          actions.updateEditField( name, value );
     }, [ actions.updateEditField ] );

     const handleAvatarSelect = useCallback( ( avatarUrl ) => {
          actions.updateEditField( 'avatar', avatarUrl );
     }, [ actions.updateEditField ] );

     const handleEditSubmit = useCallback( async ( e ) => {
          e.preventDefault();
          actions.setEditLoading( true );
          actions.setEditError( '' );

          try {
               const response = await fetchWithAuth( '/users/update', {
                    method: 'PUT',
                    body: JSON.stringify( state.profile.editFormData )
               } );

               if ( response.success ) {
                    actions.setEditSuccess( true );
                    setTimeout( () => {
                         handleProfileUpdate( response.data );
                    }, 1000 );
               } else {
                    actions.setEditError( response.message || 'Error al actualizar el perfil' );
               }
          } catch ( err ) {
               actions.setEditError( 'Error al actualizar el perfil' );
          } finally {
               actions.setEditLoading( false );
          }
     }, [ state.profile.editFormData, actions.setEditLoading, actions.setEditError, actions.setEditSuccess, actions.setUserDetails, actions.setEditing, updateUser ] );

     // Actualización del perfil
     const handleProfileUpdate = useCallback( ( updatedUser ) => {
          actions.setUserDetails( updatedUser );
          updateUser( updatedUser );
          actions.setEditing( false );
     }, [ actions.setUserDetails, updateUser, actions.setEditing ] );


     const handleStartReviewEdit = useCallback((review) => {
          actions.setEditingReview(review);    
     }, [actions.setEditingReview]);

     const handleDeleteAccount = useCallback( async () => {
          actions.setDeleteLoading( true );
          actions.setDeleteError( '' );

          try {
               const response = await deleteAccount();
               if ( response.success ) {
                    onClose();
               } else {
                    actions.setDeleteError( response.message || 'Error al eliminar la cuenta' );
               }
          } catch ( error ) {
               actions.setDeleteError( 'Error al eliminar la cuenta. Inténtalo de nuevo.' );
          } finally {
               actions.setDeleteLoading( false );
          }
     }, [ actions.setDeleteLoading, actions.setDeleteError, deleteAccount, onClose ] );

     return {
          handleStartEdit,
          handleEditChange,
          handleAvatarSelect,
          handleEditSubmit,
          handleStartReviewEdit,
          handleDeleteAccount,
     }
};