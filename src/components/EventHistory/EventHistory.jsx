import React, { useState, useEffect } from 'react';
import EventHistoryCard from './EventHistoryCard/EventHistoryCard';
import './EventHistory.css';

const EventHistory = ({ isOpen, onClose, onReviewClick }) => {
    console.log('🔄 EventHistory renderizado', {isOpen});
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPastEvents = async () => {
            if (!isOpen) return;
            
            setLoading(true);
            setError(null);
            
            try {
                // Obtener eventos pasados
                const eventsResponse = await fetch('https://pulse-back-qjhc.vercel.app/api/events/past', {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                
                if (!eventsResponse.ok) {
                    throw new Error('Error al cargar eventos pasados');
                }
                
                const eventsData = await eventsResponse.json();
                let eventsWithReviews = eventsData.data || [];

                // Obtener reseñas del usuario
                try {
                    const reviewsResponse = await fetch('https://pulse-back-qjhc.vercel.app/api/reviews/user', {
                        credentials: 'include',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    });
                    
                    if (reviewsResponse.ok) {
                        const reviewsData = await reviewsResponse.json();
                        const userReviews = reviewsData.data || [];
                        
                        // Mapear reseñas a eventos
                        eventsWithReviews = eventsWithReviews.map(event => {
                            const userReview = userReviews.find(review => 
                                review.event && review.event._id === event._id
                            );
                            
                            return {
                                ...event,
                                hasReview: !!userReview,
                                userReview: userReview || null
                            };
                        });
                    }
                } catch (reviewError) {
                    console.warn('Error loading user reviews:', reviewError);
                    eventsWithReviews = eventsWithReviews.map(event => ({
                        ...event,
                        hasReview: false,
                        userReview: null
                    }));
                }
                
                // Ordenar por fecha (más recientes primero)
                eventsWithReviews.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                
                setEvents(eventsWithReviews);
            } catch (err) {
                console.error('Error fetching past events:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchPastEvents();
        }
    }, [isOpen]);

    const handleReviewClick = (event, existingReview = null) => {
        if (onReviewClick) {
            onReviewClick(event, existingReview);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="event-history-container">
            <div className="history-backdrop" onClick={onClose}></div>
            
            <div className="history-panel">
                {/* Header */}
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
                    
                    <button className="history-close" onClick={onClose} aria-label="Cerrar">
                        <ion-icon name="close"></ion-icon>
                    </button>
                </div>
                
                <div className="history-content">
                    {loading && (
                        <div className="loading-state">
                            <div className="loading-spinner">
                                <ion-icon name="refresh-outline"></ion-icon>
                            </div>
                            <p>Cargando eventos...</p>
                        </div>
                    )}
                    
                    {error && (
                        <div className="error-state">
                            <div className="error-icon">
                                <ion-icon name="alert-circle-outline"></ion-icon>
                            </div>
                            <h3>Error al cargar eventos</h3>
                            <p>{error}</p>
                        </div>
                    )}
                    
                    {!loading && !error && events.length === 0 && (
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
                    )}
                    
                    {!loading && !error && events.length > 0 && (
                        <div className="events-grid">
                            {events.map((event, index) => (
                                <EventHistoryCard
                                    key={event._id || index}
                                    event={event}
                                    onReviewClick={handleReviewClick}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventHistory; 