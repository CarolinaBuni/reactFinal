import React, { useState, useEffect } from 'react';
import './EventReviewsModal.css';
import reviewService from '../../../services/reviewService';
import { formatDate } from '../../../utils/formatDate';
import '../EventHistoryCard/EventHistoryCard.css';
import { AverageRating } from '../../StarRating/StarRating';

const EventReviewsModal = ( { isOpen, onClose, event } ) => {
     const [ reviews, setReviews ] = useState( [] );
     const [ loading, setLoading ] = useState( false );
     const [ error, setError ] = useState( null );
     const [ userReview, setUserReview ] = useState( null );

     useEffect( () => {
          if ( isOpen && event ) {
               fetchReviews();
          }
     }, [ isOpen, event ] );

     const fetchReviews = async () => {
          setLoading( true );
          setError( null );

          try {
               const response = await reviewService.getEventReviews( event._id );

               if ( response.success ) {
                    const allReviews = response.data || [];

                    const currentUserId = localStorage.getItem( 'userId' );
                    const myReview = allReviews.find( review =>
                         review.user?._id === currentUserId || review.user?.id === currentUserId
                    );
                    const otherReviews = allReviews.filter( review =>
                         review.user?._id !== currentUserId && review.user?.id !== currentUserId
                    );

                    setUserReview( myReview );
                    setReviews( otherReviews );
               } else {
                    setError( 'Error al cargar las reseñas' );
               }
          } catch ( err ) {
               console.error( 'Error fetching reviews:', err );
               setError( 'Error de conexión' );
          } finally {
               setLoading( false );
          }
     };

     const renderStars = ( rating ) => {
          return [ ...Array( 5 ) ].map( ( _, i ) => {
               const starValue = i + 1;
               const isFilled = rating >= starValue;
               const isHalfFilled = rating > i && rating < starValue;

               let iconName = "star-outline";
               let className = "empty";

               if ( isFilled ) {
                    iconName = "star";
                    className = "filled";
               } else if ( isHalfFilled ) {
                    iconName = "star-half";
                    className = "half-filled";
               }

               return (
                    <ion-icon
                         key={ i }
                         name={ iconName }
                         className={ className }
                    />
               );
          } );
     };

     if ( !isOpen ) return null;

     return (
          <div className="reviews-modal-overlay" onClick={ ( e ) => {
               if ( e.target === e.currentTarget ) onClose();
          } }>
               <div className="reviews-modal">
                    {/* Header */ }
                    <div className="reviews-modal-header">
                         <div className="reviews-title-section">
                              <div className="reviews-icon">
                                   <ion-icon name="chatbubbles-outline"></ion-icon>
                              </div>
                              <div>
                                   <h2>Reseñas del Evento</h2>
                                   <p className="reviews-subtitle">{ event.name }</p>
                              </div>
                         </div>

                         <button className="reviews-close" onClick={ onClose }>
                              <ion-icon name="close"></ion-icon>
                         </button>
                    </div>

                    {/* Event Info */ }
                    <div className="reviews-event-info">
                         <img
                              src={ event.image || '/default-event-image.jpg' }
                              alt={ event.name }
                              className="reviews-event-image"
                         />
                         <div className="reviews-event-details">
                              <h3>{ event.name }</h3>
                              <div className="reviews-event-date">
                                   <ion-icon name="calendar-outline"></ion-icon>
                                   { formatDate( event.startDate, true ) }
                              </div>
                              { event.averageRating > 0 && (
                                   <div className="reviews-event-rating">
                                        <div className="stars-display">
                                             { renderStars( event.averageRating ) }
                                        </div>
                                        <span>{ event.averageRating.toFixed( 1 ) }/5 ({ event.reviewCount } reseñas)</span>
                                   </div>
                              ) }
                         </div>
                    </div>

                    {/* Content */ }
                    <div className="reviews-modal-content">
                         { loading ? (
                              <div className="reviews-loading">
                                   <div className="reviews-spinner"></div>
                                   <p>Cargando reseñas...</p>
                              </div>
                         ) : error ? (
                              <div className="reviews-error">
                                   <ion-icon name="alert-circle-outline"></ion-icon>
                                   <p>{ error }</p>
                              </div>
                         ) : (
                              <>
                                   {/* Tu reseña */ }
                                   { userReview && (
                                        <div className="your-review-section">
                                             <h4>Tu Reseña</h4>
                                             <div className="review-card your-review">
                                                  <div className="review-header">
                                                       <div className="review-user">
                                                            <div className="review-avatar">
                                                                 <img
                                                                      src={ userReview.user?.avatar || 'https://res.cloudinary.com/dafjggs2p/image/upload/v1744369015/pulse/avatar_nsx2kr.png' }
                                                                      alt="Tu avatar"
                                                                      onError={ ( e ) => e.target.src = 'https://res.cloudinary.com/dafjggs2p/image/upload/v1744369012/pulse/avatar1_qlx3ex.png' }
                                                                 />
                                                            </div>
                                                            <span className="review-username">Tú</span>
                                                       </div>
                                                       <div className="review-rating">
                                                            <div className="stars-display">
                                                                 { renderStars( userReview.rating ) }
                                                            </div>
                                                            <span>{ userReview.rating }/5</span>
                                                       </div>
                                                  </div>
                                                  <div className="review-date">
                                                       { formatDate( userReview.date || userReview.createdAt ) }
                                                  </div>
                                                  <div className="review-comment">
                                                       { userReview.comment }
                                                  </div>
                                             </div>
                                        </div>
                                   ) }

                                   {/* Otras reseñas */ }
                                   { reviews.length > 0 && (
                                        <div className="other-reviews-section">
                                             <h4>Reseñas de Otros Usuarios ({ reviews.length })</h4>
                                             <div className="reviews-list">
                                                  { reviews.map( ( review, index ) => (
                                                       <div key={ review._id || index } className="review-card">
                                                            <div className="review-header">
                                                                 <div className="review-user">
                                                                      <div className="review-avatar">
                                                                           <img
                                                                                src={ review.user?.avatar || 'https://res.cloudinary.com/dafjggs2p/image/upload/v1744369015/pulse/avatar_nsx2kr.png' }
                                                                                alt={ review.user?.username || 'Usuario' }
                                                                                onError={ ( e ) => e.target.src = 'https://res.cloudinary.com/dafjggs2p/image/upload/v1744369012/pulse/avatar1_qlx3ex.png' }
                                                                           />
                                                                      </div>
                                                                      <span className="review-username">
                                                                           { review.user?.username || 'Usuario anónimo' }
                                                                      </span>
                                                                 </div>
                                                                 <div className="review-rating">
                                                                      <div className="stars-display">
                                                                           { renderStars( review.rating ) }
                                                                      </div>
                                                                      <span>{ review.rating }/5</span>
                                                                 </div>
                                                            </div>
                                                            <div className="review-date">
                                                                 { formatDate( review.date || review.createdAt ) }
                                                            </div>
                                                            <div className="review-comment">
                                                                 { review.comment }
                                                            </div>
                                                       </div>
                                                  ) ) }
                                             </div>
                                        </div>
                                   ) }

                                   {/* Sin reseñas */ }
                                   { !userReview && reviews.length === 0 && (
                                        <div className="no-reviews">
                                             <ion-icon name="star-outline"></ion-icon>
                                             <h3>No hay reseñas aún</h3>
                                             <p>Sé el primero en compartir tu experiencia sobre este evento.</p>
                                        </div>
                                   ) }
                              </>
                         ) }
                    </div>
               </div>
          </div>
     );
};

export default EventReviewsModal;