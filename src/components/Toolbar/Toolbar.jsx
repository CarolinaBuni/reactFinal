//Toolbar.jsx

import React, { useCallback, useRef } from 'react';
import './Toolbar.css';
import { useFavorites } from '../../Context/FavoritesContext';

const Toolbar = ({ onFetchEvents, onToggleMarkers, showMarkers, events, showingFavorites }) => {
    console.log('Toolbar Render', showingFavorites);
    
    const menuRef = useRef(null);
    const { favorites } = useFavorites();

    // console.log('Toolbar favorites:', favorites);

    const handleFetchAndToggleMarkers = async () => {
        if (events.length === 0) {
            await onFetchEvents();
        }
        onToggleMarkers(false);
    };

    const handleFavoritesClick = useCallback(() => {
        // console.log('handleFavoritesClick llamado', { favorites });
        if (favorites && favorites.length > 0) {
            onToggleMarkers(true);
        }
    }, [favorites, onToggleMarkers]);

    const toggleMenu = () => {
        menuRef.current.classList.toggle('active');
    };

    return (
        <div className="navigation">
            <div className="menuTogle" ref={menuRef} onClick={toggleMenu}>
                <i></i>
            </div>
            <div className="menu">
                <ul>
                    <li style={{ '--i': '0.1s' }}>
                        <a 
                            href="#" 
                            onClick={handleFetchAndToggleMarkers}
                            className={showMarkers && !showingFavorites ? 'active' : ''}
                        >
                            <ion-icon name="musical-notes-outline"></ion-icon>
                        </a>
                    </li>
                    <li></li>
                    <li></li>
                    <li style={{ '--i': '0.2s' }}>
                        <a 
                            href="#" 
                            onClick={handleFavoritesClick}
                            className={showingFavorites ? 'active' : ''}
                        >
                            <ion-icon name="heart-outline"></ion-icon>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Toolbar;