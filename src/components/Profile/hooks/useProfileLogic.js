import { authService, fetchWithAuth } from "../../../services/authService";
import reviewService from "../../../services/reviewService";

export const useProfileLogic = ( state, actions, user, updateUser, deleteAccount, onClose ) => {
     // FUNCIONES PARA EDICIÓN DE PERFIL
     const handleStartEdit = () => {
          actions.setEditFormData( {
               username: state.profile.userDetails?.username || user.username || '',
               email: state.profile.userDetails?.email || user.email || '',
               avatar: state.profile.userDetails?.avatar || user.avatar || ''
          } );
          actions.setEditing( true );
          actions.setEditError( '' );
          actions.setEditSuccess( false );
     };

     const handleEditChange = ( e ) => {
          const { name, value } = e.target;
          actions.updateEditField( name, value );
     };

     const handleAvatarSelect = ( avatarUrl ) => {
          actions.updateEditField( 'avatar', avatarUrl );
     };

     const handleEditSubmit = async ( e ) => {
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
     };

     // Manejar actualización del perfil
     const handleProfileUpdate = ( updatedUser ) => {
          actions.setUserDetails( updatedUser );
          updateUser( updatedUser );
          actions.setEditing( false );
     };

     // FUNCIONES PARA REVIEW INLINE
     const handleStartReviewEdit = ( review ) => {
          actions.setEditingReview( review );
          actions.setReviewFormData( {
               rating: review ? review.rating : 0,
               comment: review ? review.comment : ''
          } );
          actions.setReviewError( '' );
          actions.setReviewSuccess( '' );
     };



     const handleDeleteAccount = async () => {
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
     };
     return {
          handleStartEdit,
          handleEditChange,
          handleAvatarSelect,
          handleEditSubmit,
          handleStartReviewEdit,
          handleDeleteAccount,
     }
};