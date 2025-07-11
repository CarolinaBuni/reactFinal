import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ReviewModal.css';
import EventInfoCard from './EventInfoCard/EventInfoCard';
import ReviewForm from './ReviewForm/ReviewForm';
import { useReviewSubmit } from './hooks/useReviewSubmit';

const ReviewModal = ({ isOpen, onClose, event, existingReview = null }) => {
    console.log('🔄 ReviewModal renderizado');
    const [rating, setRating] = useState(existingReview?.rating || 0);
    const [comment, setComment] = useState(existingReview?.comment || '');
    const isMountedRef = useRef(true);

    const {
        loading,
        error,
        submitReview,
        setError,
        cleanup
    } = useReviewSubmit(event, existingReview, onClose);

    // Resetear valores cuando el modal se abre
    useEffect(() => {
        if (isOpen) {
            setRating(existingReview?.rating || 0);
            setComment(existingReview?.comment || '');
            setError('');
        }
    }, [isOpen, existingReview]);

    // Cleanup para evitar actualizaciones después del desmontaje
    useEffect(() => {
        isMountedRef.current = true;
        return cleanup;
    }, [cleanup]);

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Fecha no disponible';
        }
    };

    const handleRatingChange = useCallback((newRating) => {
        setRating(newRating);
    }, []);

    const handleCommentChange = useCallback((e) => {
        setComment(e.target.value);
    }, []);

    const handleSubmit = () => {
        submitReview(rating, comment);
    };

    const handleCancel = () => {
        setRating(existingReview?.rating || 0);
        setComment(existingReview?.comment || '');
        setError('');
        onClose(false);
    };

    if (!isOpen || !event) return null;

    return (
        <div className="review-modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) handleCancel();
        }}>
            <div className="review-modal-bg"></div>
            
            <div className="review-modal">
                <div className="review-modal-header">
                    <div className="review-modal-title">
                        <div className="review-icon">
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <div>
                            <h2>{existingReview ? 'Editar Review' : 'Nueva Review'}</h2>
                            <div className="review-modal-subtitle">
                                Comparte tu experiencia
                            </div>
                        </div>
                    </div>
                    
                    <button className="review-modal-close" onClick={handleCancel}>
                        <ion-icon name="close"></ion-icon>
                    </button>
                </div>
                
                <div className="review-modal-content">
                    {loading ? (
                        <div className="loading-review">
                            <div className="review-spinner"></div>
                            <div className="loading-review-text">
                                {existingReview ? 'Actualizando review...' : 'Guardando review...'}
                            </div>
                        </div>
                    ) : (
                        <>
                            <EventInfoCard event={event} formatDate={formatDate} />
                            
                            <ReviewForm 
                                rating={rating}
                                onRatingChange={handleRatingChange}
                                comment={comment}
                                onCommentChange={handleCommentChange}
                                loading={loading}
                                error={error}
                            />
                        </>
                    )}
                </div>
                
                {!loading && (
                    <div className="review-modal-actions">
                        <button 
                            className="review-action-button cancel-button"
                            onClick={handleCancel}
                        >
                            <ion-icon name="close-outline"></ion-icon>
                            Cancelar
                        </button>
                        
                        <button 
                            className="review-action-button submit-button"
                            onClick={handleSubmit}
                            disabled={rating === 0 || comment.trim().length < 10}
                        >
                            <ion-icon name={existingReview ? "checkmark-outline" : "add-outline"}></ion-icon>
                            {existingReview ? 'Actualizar' : 'Publicar'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewModal; 