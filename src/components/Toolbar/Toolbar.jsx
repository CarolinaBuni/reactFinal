//Toolbar.jsx

import React, { useCallback, useRef } from 'react';
import './Toolbar.css';
import { useFavorites } from '../../Context/FavoritesContext';
import { useEvents } from '../../Context/EventsContext';

const Toolbar = ( ) => {
    console.log( 'Toolbar Render');
    const menuRef = useRef( null );
    const { favorites } = useFavorites();
    const { 
        events, 
        fetchEvents, 
        showMarkers, 
        showingFavorites, 
        handleToggleMarkers 
    } = useEvents();

    const handleFetchAndToggleMarkers = async () => {
        if ( events.length === 0 ) {
            await fetchEvents();
        }

        if ( showMarkers && !showingFavorites ) {
            handleToggleMarkers( false, false );
        } else {
            handleToggleMarkers( false );
        }
    };

    const handleFavoritesClick = useCallback( () => {

        if ( favorites && favorites.length > 0 ) {
            handleToggleMarkers( true );
        }
    }, [ favorites, handleToggleMarkers ] );

    const toggleMenu = () => {
        menuRef.current.classList.toggle( 'active' );
    };

    return (
        <div className="navigation">
            <div className="menuTogle" ref={ menuRef } onClick={ toggleMenu }>
                <i></i>
            </div>
            <div className="menu">
                <ul>
                    <li style={ { '--i': '0.1s' } }>
                        <a
                            href="#"
                            onClick={ handleFetchAndToggleMarkers }
                            className={ showMarkers && !showingFavorites ? 'active' : '' }
                        >
                            <ion-icon name="musical-notes-outline"></ion-icon>
                        </a>
                    </li>
                    <li></li>
                    <li></li>
                    <li style={ { '--i': '0.2s' } }>
                        <a
                            href="#"
                            onClick={ handleFavoritesClick }
                            className={ showingFavorites ? 'active' : '' }
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