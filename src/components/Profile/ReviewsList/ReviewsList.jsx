import React, { useState, useEffect } from 'react';
import reviewService from '../../../services/reviewService';
import './ReviewsList.css';
import { formatDate } from '../../../utils/formatDate';

const ReviewsList = ({ onEdit, onSetCount, onShowDeleteConfirm }) => {
  console.log('🔄 ReviewsList renderizado');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await reviewService.getUserReviews();
        if (response.success && isMounted) {
          setReviews(response.data);
          onSetCount(response.data.length);
        }
      } catch (error) {
        console.error('Error al cargar reviews:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReviews();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span 
        key={i} 
        className={`star ${i < rating ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  const handleReviewDeleted = (reviewId) => {
    setReviews(reviews.filter(r => r._id !== reviewId));
    onSetCount(reviews.length - 1);
  };

  if (loading) {
    return <div className="loading-reviews">Cargando reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="no-reviews">
        <p>No has escrito ninguna review todavía</p>
        <p className="hint">¡Asiste a eventos y comparte tu experiencia!</p>
      </div>
    );
  }

  return (
    <div className="reviews-list">
      {reviews.map(review => (
        <div key={review._id} className="review-item">
          <div className="review-image">
            <img 
              src={review.event?.image || 'https://res.cloudinary.com/dafjggs2p/image/upload/v1747666373/pulse/default_event_wxp6bj.jpg'} 
              alt={review.event?.name || 'Evento'} 
            />
          </div>
          <div className="review-details">
            <h5>{review.event?.name || 'Evento'}</h5>
            <div className="review-rating">
              {renderStars(review.rating)}
            </div>
            <p className="review-comment">{review.comment}</p>
            <p className="review-date">Publicado el {formatDate(review.createdAt)}</p>
          </div>
          <div className="review-actions">
            <button 
              className="edit-review-button"
              onClick={() => onEdit(review)}
              title="Editar review"
            >
              <ion-icon name="create-outline"></ion-icon>
            </button>
            <button 
              className="delete-review-button"
              onClick={(e) => onShowDeleteConfirm(review, e, handleReviewDeleted)}
              title="Eliminar review"
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList; 