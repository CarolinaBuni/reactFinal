import './PupupImage.css';

const PupupImage = ( { image, name } ) => {
     console.log('🔄 PupupImage renderizado');
     return (
          <img src={ image } alt={ `Imagen de ${ name }` } className="popup-image" />
     );
};

export default PupupImage;