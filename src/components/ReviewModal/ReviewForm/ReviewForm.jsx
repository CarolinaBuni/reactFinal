import { memo, useRef } from 'react';
import './ReviewForm.css';
import StarRating from '../../StarRating/StarRating';

const ReviewForm = memo( ( {
     rating,
     onRatingChange,
     commentRef,
     loading,
     error,
     defaultValue,
     onValidate
} ) => {
     console.log( '🔄 ReviewForm renderizado' );

     const counterRef = useRef( null );

     const handleTextareaChange = ( e ) => {
          const length = e.target.value.length;
          if ( counterRef.current ) {
               counterRef.current.textContent = `${ length }/500 caracteres`;
          }
          onValidate?.();
     };

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
                         ref={ commentRef }
                         defaultValue={ defaultValue }
                         onChange={ handleTextareaChange }
                         placeholder="Cuéntanos sobre tu experiencia en este evento... ¿Qué te gustó más? ¿Cómo fue el ambiente? ¿Recomendarías este evento?"
                         disabled={ loading }
                         maxLength={ 500 }
                    />
                    <div className="character-count" ref={ counterRef }>
                         { ( defaultValue?.length || 0 ) }
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