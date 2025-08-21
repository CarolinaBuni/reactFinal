import './FavoritesTab.css';

const FavoritesTab = ( {
     favorites,
     formatDate,
     onShowDeleteConfirm,
} ) => {
     console.log('🔄 FavoritesTab renderizado');
     return (
          <div className="profile-favorites-tab">
               <h4>Mis Eventos Favoritos</h4>
               { favorites.length === 0 ? (
                    <div className="no-favorites">
                         <p>No tienes eventos favoritos guardados</p>
                         <p className="hint">Añade eventos a favoritos haciendo click en el corazón</p>
                    </div>
               ) : (
                    <div className="favorites-list">
                         { favorites.map( event => (
                              <div key={ event.id } className="favorite-item">
                                   <div className="favorite-image">
                                        <img src={ event.image || 'https://via.placeholder.com/100' } alt={ event.name } />
                                   </div>
                                   <div className="favorite-details">
                                        <h5>{ event.name }</h5>
                                        <p>{ formatDate( event.startDate ) }</p>
                                        <p>{ event.venue?.name }, { event.venue?.city }</p>
                                        { event.genre &&
                                             event.genre !== 'undefined' &&
                                             event.genre !== 'Undefined' &&
                                             event.genre !== 'null' &&
                                             event.genre.toString().trim() !== '' && (
                                                  <span className="event-genre">{ event.genre }</span>
                                             ) }
                                   </div>
                                   <div className="favorite-actions">
                                        <button
                                             className="remove-favorite-button"
                                             onClick={ ( e ) => onShowDeleteConfirm( event, e ) }
                                             title="Eliminar de favoritos"
                                        >
                                             <ion-icon name="trash-outline"></ion-icon>
                                        </button>
                                   </div>
                              </div>
                         ) ) }
                    </div>
               ) }
          </div>
     );
};

export default FavoritesTab;

