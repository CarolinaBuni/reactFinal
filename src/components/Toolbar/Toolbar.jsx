// src/components/Toolbar/Toolbar.jsx
import React, { useCallback, useRef } from 'react';
import './Toolbar.css';
import { useToolbarLogic } from './hooks/useToolbarLogic';
import { useAuth } from '../../Context/AuthContext';
import AuthModal from '../Auth/AuthModal/AuthModal';
import ProfileModal from '../Profile/ProfileModal/ProfileModal';
import EventHistory from '../EventHistory/EventHistory';
import ReviewModal from '../ReviewModal/ReviewModal';
import { useModalReducer } from './hooks/useModalReducer';

const Toolbar = () => {
    console.log('🔄 Toolbar renderizado');
    const menuRef = useRef( null );
    const {
        showMarkers,
        showingFavorites,
        handleFetchAndToggleMarkers,
        handleFavoritesClick
    } = useToolbarLogic();

    const { isAuthenticated } = useAuth();
    const { state: modalState, actions: modalActions } = useModalReducer();

    const toggleMenu = useCallback( () => {
        menuRef.current.classList.toggle( 'active' );
    }, [] );

    const handleAuthClick = useCallback( () => {
        if ( isAuthenticated() ) {
            modalActions.openProfile();
        } else {
            modalActions.openAuth();
        }
    }, [ isAuthenticated, modalActions ] );

    const handleHistoryClick = useCallback( () => {
        if ( isAuthenticated() ) {
            modalActions.openHistory();
        } else {
            modalActions.openAuth();
        }
    }, [ isAuthenticated, modalActions ] );

    const handleReviewClick = useCallback( ( event, existingReview = null ) => {
        modalActions.openReview( event, existingReview );
    }, [ modalActions ] );

    const handleReviewModalClose = useCallback( ( success = false ) => {
        modalActions.closeAll();

        if ( success ) {
            // Opcional: mostrar notificación de éxito
            console.log( 'Review guardada exitosamente' );
        }
    }, [ modalActions ] );

    

    return (
        <>
            <div className="navigation">
                <div className="menuTogle" ref={ menuRef } onClick={ toggleMenu }>
                    <i></i>
                </div>
                <div className="menu">
                    <ul>
                        <li style={ { '--i': '0.1s' } }>
                            <a
                                href="#"
                                onClick={ handleFetchAndToggleMarkers }
                                className={ showMarkers && !showingFavorites ? 'active' : '' }
                            >
                                <ion-icon name="musical-notes-outline"></ion-icon>
                            </a>
                        </li>

                        <li style={ { '--i': '0.2s' } }>
                            <a
                                href="#"
                                onClick={ handleHistoryClick }
                                className=""
                            >
                                <ion-icon name="time-outline"></ion-icon>
                            </a>
                        </li>
                        <li></li>
                        <li></li>
                        <li style={ { '--i': '0.3s' } }>
                            <a
                                href="#"
                                onClick={ handleFavoritesClick }
                                className={ showingFavorites ? 'active' : '' }
                            >
                                <ion-icon name="heart-outline"></ion-icon>
                            </a>
                        </li>
                        <li style={ { '--i': '0.4s' } }>
                            <a
                                href="#"
                                onClick={ handleAuthClick }
                                className={ isAuthenticated() ? 'active' : '' }
                            >
                                <ion-icon name={ isAuthenticated() ? "person" : "person-outline" }></ion-icon>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {modalState.showAuthModal && (
                <AuthModal
                    isOpen={ modalState.showAuthModal }
                    onClose={ modalActions.closeAll }
                />
            )}

            {modalState.showProfileModal && (
                <ProfileModal
                    isOpen={ modalState.showProfileModal }
                    onClose={ modalActions.closeAll }
                />
            )}

            {modalState.showEventHistory && (
                <EventHistory
                    isOpen={ modalState.showEventHistory }
                    onClose={ modalActions.closeAll }
                    onReviewClick={ handleReviewClick }
                />
            )}

            {modalState.showReviewModal && (
                <ReviewModal
                    isOpen={ modalState.showReviewModal }
                    onClose={ handleReviewModalClose }
                    event={ modalState.selectedEvent }
                    existingReview={ modalState.selectedReview }
                />
            )}
        </>
    );
};

export default Toolbar;
