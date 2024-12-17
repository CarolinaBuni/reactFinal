//Toolbar.jsx
import React, { memo, useRef } from 'react';
import './Toolbar.css';

const Toolbar = memo(( { onFetchEvents } ) => {
     console.log('Toolbar Render',  { onFetchEvents });
     const refToggle = useRef();

     const activeButton = () => {
          refToggle.current.classList.toggle( 'active' );
     };

     // const handleFetchEvents = () => {
     //      onFetchEvents(); // Llama a la función para obtener eventos
     // };

     return (
          <div className="navigation">
               <div className="menuTogle" ref={ refToggle } onClick={ activeButton }>
                    <i></i>
               </div>
               <div className="menu">
                    <ul>
                         <li
                              style={ { '--i': '0.1s' } }
                              onClick={ onFetchEvents }
                         >
                              <a href="#">
                                   <ion-icon name="musical-notes-outline"></ion-icon>
                              </a>
                         </li>
                         <li></li>
                         <li></li>
                         <li
                              style={ { '--i': '0.2s' } }
                         >
                              <a href="#">
                                   <ion-icon name="heart-outline"></ion-icon>
                              </a>
                         </li>
                    </ul>
               </div>
          </div>
     );
}, (prevProps, nextProps) => {
     
     return prevProps.onFetchEvents === nextProps.onFetchEvents;
});



export default Toolbar;