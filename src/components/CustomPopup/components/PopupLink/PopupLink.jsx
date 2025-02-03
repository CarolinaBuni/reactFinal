import './PopupLink.css';

const PopupLink = ( { url } ) => {
     return (
          <a href={ url } target="_blank" rel="noopener noreferrer" className="popup-link">
               Más información
          </a>
     );
};

export default PopupLink;