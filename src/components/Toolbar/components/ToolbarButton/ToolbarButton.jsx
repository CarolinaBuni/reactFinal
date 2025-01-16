import React, { memo } from 'react';

const ToolbarButton = memo(({ icon, onClick, isActive, delay }) => {
    console.log("ToolbarButton Render");

    return (
        <li 
            style={{ '--i': delay }}
            onClick={onClick}
            className={isActive ? 'active-button' : ''}
        >
            <a href="#">
                <ion-icon 
                    name={icon}
                    style={{ color: isActive ? '#ff4886' : 'floralwhite' }}
                />
            </a>
        </li>
    );
}, (prev, next) => 
    prev.icon === next.icon && 
    prev.isActive === next.isActive && 
    prev.delay === next.delay
);

export default ToolbarButton; 