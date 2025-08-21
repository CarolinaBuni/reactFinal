import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ReviewModal.css';
import EventInfoCard from './EventInfoCard/EventInfoCard';
import ReviewForm from './ReviewForm/ReviewForm';
import { useReviewSubmit } from './hooks/useReviewSubmit';
import { formatDate } from '../../utils/formatDate';

const ReviewModal = ({ isOpen, onClose, event, existingReview = null }) => {
    console.log('🔄 ReviewModal renderizado');
    const [rating, setRating] = useState(existingReview?.rating || 0);
    const [isFormValid, setIsFormValid] = useState(false);
    const commentRef = useRef(null);
    const isMountedRef = useRef(true); 

    const {
        loading,
        error,
        submitReview,
        setError,
        cleanup
    } = useReviewSubmit(event, existingReview, onClose);

    // Reset de valores
    useEffect(() => {
        if (isOpen) {
            setRating(existingReview?.rating || 0);
            if (commentRef.current) {
                commentRef.current.value = existingReview?.comment || '';
            }
            setError('');
            const commentLength = (existingReview?.comment || '').trim().length;
            setIsFormValid((existingReview?.rating || 0) > 0 && commentLength >= 10);
        }
    }, [isOpen, existingReview]);

    useEffect(() => {
        isMountedRef.current = true;
        return cleanup;
    }, [cleanup]);

    const validateForm = useCallback(() => {
        const commentLength = (commentRef.current?.value || '').trim().length;
        setIsFormValid(rating > 0 && commentLength >= 10);
    }, [rating]);


    const handleRatingChange = useCallback((newRating) => {
        setRating(newRating);
        // Validar cuando cambia rating
        const commentLength = (commentRef.current?.value || '').trim().length;
        setIsFormValid(newRating > 0 && commentLength >= 10);
    }, []);

    const handleSubmit = () => {
        const commentValue = commentRef.current.value;
        submitReview(rating, commentValue);
    };

    const handleCancel = () => {
        setRating(existingReview?.rating || 0);
        if (commentRef.current) {
            commentRef.current.value = existingReview?.comment || '';
        }
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
                            <EventInfoCard event={event} formatDate={(date) => formatDate(date, true)} />
                            
                            <ReviewForm 
                                rating={rating}
                                onRatingChange={handleRatingChange}
                                onValidate={validateForm} 
                                commentRef={commentRef}
                                loading={loading}
                                error={error}
                                defaultValue={existingReview?.comment || ''}
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
                            disabled={!isFormValid}
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