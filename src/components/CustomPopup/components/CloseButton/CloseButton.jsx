import React, { memo } from 'react';
import './CloseButton.css';

const CloseButton = memo( ( { onClose } ) => {
     console.log( 'CloseButton Render' );

     return (
          <button
               className="close-button"
               onClick={ onClose }
          >
               &times;
          </button>
     );
} );

export default CloseButton;