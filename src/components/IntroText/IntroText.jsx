import React, { useEffect, useRef, useState, memo } from 'react';
import './IntroText.css';
import { TextScramble } from '../../utils/TextScramble';

const IntroText = memo(() => {
    const textRef = useRef(null);
    const [shouldShow, setShouldShow] = useState(true);
    const phrases = [
        'PULSE',
        'Tu guía musical',
        'Madrid en directo'
    ];

    useEffect(() => {
        const fx = new TextScramble(textRef.current);
        let counter = 0;
        
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                if (counter < phrases.length - 1) {
                    counter++;
                    setTimeout(next, 2000);
                } else {
                    setTimeout(() => setShouldShow(false), 2000);
                }
            });
        };
        
        next();
    }, []);

    if (!shouldShow) return null;
    
    return (
        <div className="intro-container">
            <div className="text" ref={textRef}></div>
        </div>
    );
});

export default IntroText; 