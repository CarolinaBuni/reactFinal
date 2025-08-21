import React, { useState, useEffect } from 'react';
import './StarRating.css';

const StarRating = ({ 
    rating = 0, 
    onRatingChange, 
    interactive = false, 
    size = 'medium',
    color = 'yellow',
    showText = false,
    maxRating = 5,
    disabled = false,
    loading = false
}) => {
    console.log('🔄 StarRating renderizado');
    const [currentRating, setCurrentRating] = useState(rating);
    const [hoverRating, setHoverRating] = useState(0);
    const [justSelected, setJustSelected] = useState(null);

    useEffect(() => {
        setCurrentRating(rating);
    }, [rating]);

    const handleStarClick = (starValue) => {
        if (!interactive || disabled || loading) return;
        
        setCurrentRating(starValue);
        setJustSelected(starValue);
        
        setTimeout(() => setJustSelected(null), 600);
        
        if (onRatingChange) {
            onRatingChange(starValue);
        }
    };

    const handleStarHover = (starValue) => {
        if (!interactive || disabled || loading) return;
        setHoverRating(starValue);
    };

    const handleMouseLeave = () => {
        if (!interactive || disabled || loading) return;
        setHoverRating(0);
    };

    const getStarClass = (starIndex) => {
        const classes = ['star'];
        
        if (interactive && !disabled && !loading) {
            classes.push('interactive');
        }
        
        const displayRating = hoverRating || currentRating;
        
        if (starIndex <= displayRating) {
            classes.push('filled');
        }
        
        if (justSelected === starIndex) {
            classes.push('just-selected');
        }
        
        if (hoverRating > 0 && starIndex <= hoverRating) {
            classes.push('hover-active');
        }
        
        return classes.join(' ');
    };

    const getRatingText = () => {
        const displayRating = hoverRating || currentRating;
        const texts = {
            1: 'Muy malo',
            2: 'Malo',
            3: 'Regular',
            4: 'Bueno',
            5: 'Excelente'
        };
        
        return texts[displayRating] || 'Sin calificación';
    };

    const containerClasses = [
        'star-rating',
        size,
        color,
        interactive ? 'interactive' : '',
        disabled ? 'disabled' : '',
        loading ? 'loading' : '',
        'fade-in'
    ].filter(Boolean).join(' ');

    return (
        <div className="star-rating-container">
            <div 
                className={containerClasses}
                onMouseLeave={handleMouseLeave}
            >
                {[...Array(maxRating)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <span
                            key={starValue}
                            className={getStarClass(starValue)}
                            onClick={() => handleStarClick(starValue)}
                            onMouseEnter={() => handleStarHover(starValue)}
                        >
                            <ion-icon name="star"></ion-icon>
                        </span>
                    );
                })}
            </div>
            
            {showText && (
                <div className="rating-text">
                    {loading ? (
                        'Cargando...'
                    ) : (
                        <>
                            <span className="rating-value">
                                {hoverRating || currentRating || 0}
                            </span>
                            /{maxRating} - {getRatingText()}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export const AverageRating = ({ 
    rating, 
    count, 
    size = 'medium',
    color = 'yellow' 
}) => {
    const containerClasses = [
        'star-rating',
        size,
        color,
        'fade-in'
    ].join(' ');

    return (
        <div className="average-rating">
            <div className="average-value">
                {rating ? rating.toFixed(1) : '0.0'}
            </div>
            <div className={containerClasses}>
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    const isHalfFilled = rating > index && rating < starValue;
                    const isFilled = rating >= starValue;
                    
                    return (
                        <span
                            key={starValue}
                            className={`star ${isFilled ? 'filled' : ''} ${isHalfFilled ? 'half-filled' : ''}`}
                        >
                            <ion-icon name="star"></ion-icon>
                        </span>
                    );
                })}
            </div>
            <div className="average-count">
                ({count || 0} reviews)
            </div>
        </div>
    );
};

export default StarRating; 