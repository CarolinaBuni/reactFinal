import './PopupLink.css';

const PopupLink = ( { url } ) => {
     return (
          <a href={ url } target="_blank" rel="noopener noreferrer" className="popup-link">
                <span>Más información</span>
                <i className="fas fa-external-link-alt"></i>
          </a>
     );
};

export default PopupLink;