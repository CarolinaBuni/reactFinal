import './PupupImage.css';

const PupupImage = ( { image, name } ) => {
     console.log( 'PupupImage Render' );
     return (
          <img src={ image } alt={ `Imagen de ${ name }` } className="popup-image" />
     );
};

export default PupupImage;