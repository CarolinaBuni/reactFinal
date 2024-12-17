//Toolbar.jsx

import React, { memo, useRef } from 'react';
import './Toolbar.css';

const Toolbar = memo( ( { onFetchEvents, onToggleMarkers, events } ) => {
     console.log( 'Toolbar Render', { events } );
     const refToggle = useRef();

     const activeButton = () => {
          refToggle.current.classList.toggle( 'active' );
     };

     const handleFetchAndToggleMarkers = async () => {
          if ( events.length === 0 ) {
               await onFetchEvents(); // Si no hay eventos, los cargamos
          }
          onToggleMarkers(); // Toggle para mostrar/ocultar marcadores
     };

     return (
          <div className="navigation">
               <div className="menuTogle" ref={ refToggle } onClick={ activeButton }>
                    <i></i>
               </div>
               <div className="menu">
                    <ul>
                         <li style={ { '--i': '0.1s' } } onClick={ handleFetchAndToggleMarkers }>
                              <a href="#">
                                   <ion-icon name="musical-notes-outline"></ion-icon>
                              </a>
                         </li>
                         <li></li>
                         <li></li>
                         <li style={ { '--i': '0.2s' } }>
                              <a href="#">
                                   <ion-icon name="heart-outline"></ion-icon>
                              </a>
                         </li>
                    </ul>
               </div>
          </div>
     );
}, ( prevProps, nextProps ) => {
     return (
          prevProps.onFetchEvents === nextProps.onFetchEvents &&
          prevProps.events === nextProps.events
     );
} );

export default Toolbar;