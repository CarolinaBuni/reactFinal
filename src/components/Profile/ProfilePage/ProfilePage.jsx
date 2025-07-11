// src/components/Profile/ProfilePage/ProfilePage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import { useFavorites } from '../../../Context/FavoritesContext';
import { authService } from '../../../services/authService';
import { useProfileLogic } from '../hooks/useProfileLogic';
import CloseButton from '../../CustomPopup/components/CloseButton/CloseButton';
import './ProfilePage.css';
import ReviewsList from '../ReviewsList/ReviewsList';
import reviewService from '../../../services/reviewService';
import { useProfileReducer } from '../hooks/useProfileReducer';
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';
import EditProfileForm from '../EditProfileForm/EditProfileForm';
import FavoritesTab from '../FavoritesTab/FavoritesTab';
import ReviewModal from '../../ReviewModal/ReviewModal';
import InfoTab from '../InfoTab/InfoTab';
import ProfileTabs from '../ProfileTabs/ProfileTabs';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import { useFavoritesLogic } from '../hooks/useFavoritesLogic';
import { useDeleteLogic } from '../hooks/useDeleteLogic';
import { useReviewsLogic } from '../hooks/useReviewsLogic';

const ProfilePage = ( { onClose } ) => {
  console.log('🔄 ProfilePage renderizado');
  const { user, logout, updateUser, deleteAccount } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const { state, actions } = useProfileReducer();
  const {
    handleStartEdit,
    handleEditChange,
    handleAvatarSelect,
    handleEditSubmit,
    handleStartReviewEdit,
    handleDeleteAccount
  } = useProfileLogic(state, actions, user, updateUser, deleteAccount, onClose);

  const {
    handleShowDeleteConfirm,
    handleConfirmDelete,
    handleCancelDelete
  } = useFavoritesLogic(actions, toggleFavorite);

  const {
    startDeleteSequence,
    cancelDeleteSequence
  } = useDeleteLogic(actions);

  const {
    handleShowDeleteConfirm: handleShowDeleteConfirmReview,
    handleConfirmDelete: handleConfirmDeleteReview,
    handleCancelDelete: handleCancelDeleteReview
  } = useReviewsLogic(actions);

  // Obtener detalles completos del usuario
  useEffect( () => {
    let isMounted = true;

    const fetchUserDetails = async () => {
      if ( user ) {
        actions.setLoading( true );
        try {
          const response = await authService.getProfile();
          if ( response.success && isMounted ) {
            actions.setUserDetails( response.data );
          }

          const reviewsResponse = await reviewService.getUserReviews();
          if ( reviewsResponse.success && isMounted ) {
            actions.setReviewCount( reviewsResponse.data.length );
          }
        } catch ( error ) {
          console.error( 'Error al obtener detalles del usuario:', error );
        } finally {
          if ( isMounted ) {
            actions.setLoading( false );
          }
        }
      }
    };

    fetchUserDetails();

    return () => {
      isMounted = false;
    };
  }, [ user ] );

  // Formatear fechas
  const formatDate = ( dateString ) => {
    if ( !dateString ) return 'N/A';
    const date = new Date( dateString );
    return date.toLocaleDateString( 'es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    } );
  };

  // Manejar reviews
  const handleSetReviewCount = ( count ) => {
    actions.setReviewCount( count );
  };

  if ( !user ) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <h2>Perfil de Usuario</h2>
          <CloseButton onClose={ onClose } />
        </div>
        <div className="profile-content">
          <p>Debes iniciar sesión para ver tu perfil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Perfil de Usuario</h2>
        <CloseButton onClose={ onClose } />
      </div>

      <ProfileHeader
        user={user}
        userDetails={state.profile.userDetails}
        formatDate={formatDate}
      />

      <ProfileTabs
        activeTab={state.ui.activeTab}
        favoritesCount={favorites.length}
        reviewCount={state.reviews.reviewCount}
        onTabChange={actions.setActiveTab}
      />


      <div className="profile-content">
        {/* PESTAÑA INFORMACIÓN */}
        {state.ui.activeTab === 'info' && !state.ui.isEditing && (
          <InfoTab
            userDetails={state.profile.userDetails}
            user={user}
            loading={state.ui.loading}
            formatDate={formatDate}
            onStartEdit={handleStartEdit}
            onLogout={() => {
              logout();
              onClose();
            }}
            onShowDeleteConfirm={() => actions.setShowDeleteConfirm(true)}
          />
        )}

        {/* FORMULARIO DE EDICIÓN */ }
        { state.ui.activeTab === 'info' && state.ui.isEditing && (
          <EditProfileForm
            formData={ state.profile.editFormData }
            loading={ state.ui.editLoading }
            error={ state.ui.editError }
            success={ state.ui.editSuccess }
            onSubmit={ handleEditSubmit }
            onChange={ handleEditChange }
            onAvatarSelect={ handleAvatarSelect }
            onCancel={ () => actions.setEditing( false ) }
          />
        ) }

        {/* PESTAÑA FAVORITOS */ }
        { state.ui.activeTab === 'favorites' && (
          <FavoritesTab
            favorites={ favorites }
            formatDate={ formatDate }
            confirmDelete={ state.favorites.confirmDelete }
            onShowDeleteConfirm={ handleShowDeleteConfirm }
            onConfirmDelete={ handleConfirmDelete }
            onCancelDelete={ handleCancelDelete }
          />
        ) }

        {/* PESTAÑA REVIEWS */ }
        { state.ui.activeTab === 'reviews' && !state.reviews.editingReview && (
          <div className="profile-reviews-tab">
            <div className="info-header">
              <h4>Mis Reviews</h4>
            </div>
            <ReviewsList
              onEdit={ handleStartReviewEdit }
              onSetCount={ handleSetReviewCount }
              onShowDeleteConfirm={ handleShowDeleteConfirmReview }
            />
          </div>
        ) }

        { state.ui.activeTab === 'reviews' && state.reviews.editingReview && (
          <ReviewModal
            isOpen={ true }
            onClose={ () => actions.setEditingReview( null ) }
            event={ state.reviews.editingReview.event }
            existingReview={ state.reviews.editingReview }
          />
        ) }
      </div>

      {/* Confirmación para favoritos */ }
      { state.favorites.confirmDelete && (
        <div className="mobile-confirm-dialog">
          <div className="mobile-confirm-content">
            <p>¿Estás seguro de que quieres eliminar "{ state.favorites.confirmDelete.name }" de tus favoritos?</p>
            <div className="mobile-confirm-buttons">
              <button onClick={ () => handleConfirmDelete( state.favorites.confirmDelete ) }>Eliminar</button>
              <button onClick={ handleCancelDelete }>Cancelar</button>
            </div>
          </div>
        </div>
      ) }

      {/* Confirmación para reviews */ }
      { state.reviews.confirmDeleteReview && (
        <div className="mobile-confirm-dialog">
          <div className="mobile-confirm-content">
            <p>¿Estás seguro de que quieres eliminar la review de "{ state.reviews.confirmDeleteReview.review.event?.name }"?</p>
            <div className="mobile-confirm-buttons">
              <button onClick={ () => handleConfirmDeleteReview( state.reviews.confirmDeleteReview ) }>Eliminar</button>
              <button onClick={ handleCancelDeleteReview }>Cancelar</button>
            </div>
          </div>
        </div>
      ) }

      <DeleteAccountModal
        showModal={ state.deleteAccount.showDeleteConfirm }
        deletePhase={ state.deleteAccount.deletePhase }
        deleteProgress={ state.deleteAccount.deleteProgress }
        matrixCode={ state.deleteAccount.matrixCode }
        deleteError={ state.deleteAccount.deleteError }
        deleteLoading={ state.deleteAccount.deleteLoading }
        onStartSequence={ startDeleteSequence }
        onCancel={ cancelDeleteSequence }
        onDeleteAccount={ handleDeleteAccount }
        onSetMatrixCode={ actions.setMatrixCode }
        onSetDeleteProgress={ actions.setDeleteProgress }
      />
    </div>
  );
};

export default ProfilePage;