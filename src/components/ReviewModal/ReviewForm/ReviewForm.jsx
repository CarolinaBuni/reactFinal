import { memo } from 'react';
import './ReviewForm.css';
import StarRating from '../../StarRating/StarRating';

const ReviewForm = memo( ( {
     rating,
     onRatingChange,
     comment,
     onCommentChange,
     loading,
     error,
} ) => {
     console.log('🔄 ReviewForm renderizado');
     return (
          <form className="review-form" onSubmit={ ( e ) => e.preventDefault() }>
               <div className="form-section rating-section">
                    <h4>Calificación</h4>
                    <StarRating
                         rating={ rating }
                         onRatingChange={ onRatingChange }
                         interactive={ true }
                         size="large"
                         showText={ true }
                         disabled={ loading }
                    />
               </div>

               <div className="form-section comment-section">
                    <h4>Comentario</h4>
                    <textarea
                         value={ comment }
                         onChange={ onCommentChange }
                         placeholder="Cuéntanos sobre tu experiencia en este evento... ¿Qué te gustó más? ¿Cómo fue el ambiente? ¿Recomendarías este evento?"
                         disabled={ loading }
                         maxLength={ 500 }
                    />
                    <div className="character-count">
                         { comment.length }/500 caracteres
                    </div>
               </div>

               { error && (
                    <div className="error-message">
                         { error }
                    </div>
               ) }
          </form>
     );
} );

export default ReviewForm;