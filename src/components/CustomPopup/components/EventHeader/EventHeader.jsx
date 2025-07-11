import React, { memo } from 'react';
import './EventHeader.css';

const EventHeader = memo(({ name }) => {
    console.log('🔄 EventHeader renderizado');
    return (
        <div className="logo">
            <b>
                {name.split('').map((letter, index) => 
                    index % 2 === 0 ? (
                        <span key={index}>{letter}</span>
                    ) : letter
                )}
            </b>
        </div>
    );
}, (prev, next) => prev.name === next.name);

export default EventHeader; 