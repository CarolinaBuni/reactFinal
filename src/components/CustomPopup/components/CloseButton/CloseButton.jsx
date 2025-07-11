import React, { memo } from 'react';
import './CloseButton.css';

const CloseButton = memo( ( { onClose } ) => {
     console.log('🔄 CloseButton renderizado');
     return (
          <button
               className="close-button"
               onClick={ onClose }
          >
               <i className="fas fa-times"></i>
          </button>
     );
} );

export default CloseButton;