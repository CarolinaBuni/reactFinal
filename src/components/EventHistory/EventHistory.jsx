import React, { useState, useEffect } from 'react';
import EventHistoryCard from './EventHistoryCard/EventHistoryCard';
import './EventHistory.css';
import EventReviewsModal from './EventReviewsModal/EventReviewsModal';
import eventService from '../../services/eventService';
import reviewService from '../../services/reviewService';

const EventHistory = ( { isOpen, onClose, onReviewClick } ) => {
    console.log( '🔄 EventHistory renderizado' );
    const [ events, setEvents ] = useState( [] );
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( null );
    const [ reviewsModalOpen, setReviewsModalOpen ] = useState( false );
    const [ selectedEventForReviews, setSelectedEventForReviews ] = useState( null );


    useEffect( () => {
        const fetchPastEvents = async () => {
            if ( !isOpen ) return;

            setLoading( true );
            setError( null );

            try {
                const eventsData = await eventService.getPastEvents();

                if ( !eventsData.success ) {
                    throw new Error( 'Error al cargar eventos pasados' );
                }
                let eventsWithReviews = eventsData.data || [];

                try {
                    const reviewsResponse = await reviewService.getUserReviews();

                    if ( reviewsResponse.ok ) {

                        const userReviews = reviewsData.data || [];
                        
                        eventsWithReviews = eventsWithReviews.map( event => {
                            const userReview = userReviews.find( review =>
                                review.event && review.event._id === event._id
                            );
                            
                            return {
                                ...event,
                                hasReview: !!userReview,
                                userReview: userReview || null
                            };
                        } );
                    }
                } catch ( reviewError ) {
                    console.warn( 'Error loading user reviews:', reviewError );
                    eventsWithReviews = eventsWithReviews.map( event => ( {
                        ...event,
                        hasReview: false,
                        userReview: null
                    } ) );
                }
                
                eventsWithReviews.sort( ( a, b ) => new Date( b.startDate ) - new Date( a.startDate ) );

                setEvents( eventsWithReviews );
            } catch ( err ) {
                console.error( 'Error fetching past events:', err );
                setError( err.message );
            } finally {
                setLoading( false );
            }
        };

        if ( isOpen ) {
            fetchPastEvents();
        }
    }, [ isOpen ] );

    const handleReviewClick = ( event, existingReview = null ) => {
        if ( onReviewClick ) {
            onReviewClick( event, existingReview, handleReviewSuccess );
        }
    };

    const handleReviewSuccess = ( successData ) => {
        console.log( '📝 Review success data:', successData );
        if ( isOpen ) {

            const fetchPastEvents = async () => {
                setLoading( true );
                try {
                    const eventsData = await eventService.getPastEvents();
                    if ( eventsData.success ) {
                        let eventsWithReviews = eventsData.data || [];

                        const reviewsData = await reviewService.getUserReviews();
                        if ( reviewsData.success ) {
                            const userReviews = reviewsData.data || [];

                            eventsWithReviews = eventsWithReviews.map( event => {
                                const userReview = userReviews.find( review =>
                                    review.event && review.event._id === event._id
                                );

                                return {
                                    ...event,
                                    hasReview: !!userReview,
                                    userReview: userReview || null
                                };
                            } );
                        }

                        setEvents( eventsWithReviews );
                    }
                } catch ( err ) {
                    console.error( 'Error refreshing events:', err );
                } finally {
                    setLoading( false );
                }
            };
            fetchPastEvents();
        }
    };

    const handleViewAllReviews = ( event ) => {
        setSelectedEventForReviews( event );
        setReviewsModalOpen( true );
    };

    if ( !isOpen ) return null;

    return (
        <div className="event-history-container">
            <div className="history-backdrop" onClick={ onClose }></div>
            
            <div className="history-panel">
                <div className="history-header">
                    <div className="history-title-section">
                        <div className="history-icon">
                            <ion-icon name="library-outline"></ion-icon>
                        </div>
                        <div className="history-title-content">
                            <h2>Historial de Eventos</h2>
                            <p className="history-subtitle">
                                Gestiona tus reseñas de eventos pasados
                            </p>
                        </div>
                    </div>
                    
                    <button className="history-close" onClick={ onClose } aria-label="Cerrar">
                        <ion-icon name="close"></ion-icon>
                    </button>
                </div>
                
                <div className="history-content">
                    { loading && (
                        <div className="loading-state">
                            <div className="loading-spinner">
                                <ion-icon name="refresh-outline"></ion-icon>
                            </div>
                            <p>Cargando eventos...</p>
                        </div>
                    ) }
                    
                    { error && (
                        <div className="error-state">
                            <div className="error-icon">
                                <ion-icon name="alert-circle-outline"></ion-icon>
                            </div>
                            <h3>Error al cargar eventos</h3>
                            <p>{ error }</p>
                        </div>
                    ) }
                    
                    { !loading && !error && events.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <ion-icon name="calendar-clear-outline"></ion-icon>
                            </div>
                            <h3>No hay eventos pasados</h3>
                            <p>
                                Cuando asistas a eventos, aparecerán aquí para que puedas 
                                compartir tu experiencia y ayudar a otros usuarios.
                            </p>
                        </div>
                    ) }
                    
                    { !loading && !error && events.length > 0 && (
                        <div className="events-grid">
                            { events.map( ( event, index ) => (
                                <EventHistoryCard
                                    key={ event._id || index }
                                    event={ event }
                                    onReviewClick={ handleReviewClick }
                                    onViewAllReviews={ handleViewAllReviews }
                                />
                            ) ) }
                        </div>
                    ) }
                </div>
            </div>
            { reviewsModalOpen && (
                <EventReviewsModal
                    isOpen={ reviewsModalOpen }
                    onClose={ () => setReviewsModalOpen( false ) }
                    event={ selectedEventForReviews }
                />
            ) }
        </div>
    );
};

export default EventHistory; 