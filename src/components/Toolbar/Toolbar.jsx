import React, { memo, useCallback, useRef } from 'react';
import './Toolbar.css';
import { useToolbarLogic } from './hooks/useToolbarLogic';

const Toolbar = memo( () => {
    const menuRef = useRef( null );
    const {
        showMarkers,
        showingFavorites,
        handleFetchAndToggleMarkers,
        handleFavoritesClick
    } = useToolbarLogic();

    const toggleMenu = useCallback( () => {
        menuRef.current.classList.toggle( 'active' );
    }, [] );

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
}, ( prev, next ) => {
    return prev.showMarkers === next.showMarkers &&
        prev.showingFavorites === next.showingFavorites;
} );

export default Toolbar;