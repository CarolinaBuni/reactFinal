import React, { useState } from 'react';
import './EventHistoryCard.css';
import { formatDate } from '../../../utils/formatDate';

const EventHistoryCard = ( { event, onReviewClick, onViewAllReviews } ) => {
    const [ loading, setLoading ] = useState( false );
    const [ imageLoaded, setImageLoaded ] = useState( false );
    const [ imageError, setImageError ] = useState( false );

    const hasReview = event.hasReview || false;
    const userReview = event.userReview || null;

    const handleReviewAction = () => {
        setLoading( true );
        onReviewClick( event, userReview );
        setTimeout( () => setLoading( false ), 1000 );
    };

    const getStatusInfo = () => {
        if ( event.status === 'cancelled' ) {
            return {
                text: 'Cancelado',
                class: 'cancelled',
                icon: 'close-circle'
            };
        }
        return {
            text: 'Finalizado',
            class: 'completed',
            icon: 'checkmark-circle'
        };
    };

    const renderStars = ( rating ) => {
        if ( !rating ) return null;

        return [ ...Array( 5 ) ].map( ( _, i ) => {
            const isFilled = i < rating;
            return (
                <ion-icon
                    key={ i }
                    name={ isFilled ? "star" : "star-outline" }
                    className={ isFilled ? "filled" : "empty" }
                />
            );
        } );
    };

    const statusInfo = getStatusInfo();

    return (
        <div className={ `event-history-card ${ statusInfo.class }` }>
            <div className="card-image-container">
                { !imageLoaded && !imageError && (
                    <div className="image-placeholder">
                        <ion-icon name="image-outline"></ion-icon>
                    </div>
                ) }
                <img
                    src={ event.image || '/default-event-image.jpg' }
                    alt={ event.name }
                    className={ `card-image ${ imageLoaded ? 'loaded' : '' }` }
                    onLoad={ () => setImageLoaded( true ) }
                    onError={ () => {
                        setImageError( true );
                        setImageLoaded( true );
                    } }
                    style={ { display: imageError ? 'none' : 'block' } }
                />
                { imageError && (
                    <div className="image-fallback">
                        <ion-icon name="musical-notes-outline"></ion-icon>
                    </div>
                ) }
                <div className="card-overlay"></div>
                <div className={ `status-badge ${ statusInfo.class }` }>
                    <ion-icon name={ statusInfo.icon }></ion-icon>
                    <span>{ statusInfo.text }</span>
                </div>
            </div>

            <div className="card-content">
                <div className="card-header">
                    <h3 className="card-title">{ event.name }</h3>
                    <div className="card-date">
                        <ion-icon name="calendar-outline"></ion-icon>
                        <span>{ formatDate( event.startDate, true, true ) }</span>
                    </div>
                </div>

                <div className="card-details">
                    { event.genre && (
                        <div className="card-detail-item">
                            <ion-icon name="musical-notes-outline"></ion-icon>
                            <span className="card-detail-text">{ event.genre }</span>
                        </div>
                    ) }

                    { event.venue?.name && (
                        <div className="card-detail-item">
                            <ion-icon name="location-outline"></ion-icon>
                            <span className="card-detail-text">{ event.venue.name }</span>
                        </div>
                    ) }

                    { event.venue?.city && (
                        <div className="card-detail-item">
                            <ion-icon name="business-outline"></ion-icon>
                            <span className="card-detail-text">{ event.venue.city }</span>
                        </div>
                    ) }
                </div>

                {/* SECCIÓN GLOBAL DE RESEÑAS */}
                { ( event.reviewCount > 0 ) && (
                    <div className="global-reviews-section">
                        <div className="global-reviews-header">
                            <span className="section-title">📊 Reseñas Globales</span>
                        </div>
                        <div className="global-reviews-content">
                            <div className="global-rating">
                                <div className="stars-display">
                                    { renderStars( Math.round( event.averageRating || 0 ) ) }
                                </div>
                                <span className="rating-info">
                                    { event.averageRating?.toFixed( 1 ) }/5 ({ event.reviewCount } reseñas)
                                </span>
                            </div>
                            <button
                                className="view-all-reviews-button secondary button-shine"
                                onClick={ () => onViewAllReviews?.( event ) }
                                title="Ver todas las reseñas"
                            >
                                <ion-icon name="chatbubbles-outline"></ion-icon>
                                <span>Ver todas ({ event.reviewCount })</span>
                            </button>
                        </div>
                    </div>
                ) }

                {/* SECCIÓN PERSONAL */}
                <div className="personal-review-section">
                    <div className="personal-review-header">
                        <span className="section-title">👤 Tu Reseña</span>
                    </div>
                    <div className="personal-review-content">
                        <div className="personal-review-status">
                            { hasReview ? (
                                <div className="review-rating">
                                    <div className="stars-display">
                                        { renderStars( userReview?.rating || 0 ) }
                                    </div>
                                    <span className="rating-text">{ userReview?.rating }/5</span>
                                </div>
                            ) : (
                                <div className="no-review-indicator">
                                    <ion-icon name="star-outline"></ion-icon>
                                    <span>Sin reseña</span>
                                </div>
                            ) }
                        </div>

                        { event.status !== 'cancelled' && (
                            <button
                                className={ `review-button primary ${ hasReview ? 'edit' : 'create' } button-shine` }
                                onClick={ handleReviewAction }
                                disabled={ loading }
                                title={ hasReview ? 'Editar reseña' : 'Crear reseña' }
                            >
                                { loading ? (
                                    <div className="button-spinner"></div>
                                ) : (
                                    <>
                                        <ion-icon name={ hasReview ? "create-outline" : "add-outline" }></ion-icon>
                                        <span>{ hasReview ? 'Editar' : 'Reseñar' }</span>
                                    </>
                                ) }
                            </button>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventHistoryCard; 