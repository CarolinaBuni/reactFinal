// src/Context/FavoritesContext.jsx
import React, { createContext, useContext, useReducer, useState, useEffect, useCallback, useMemo, memo } from 'react';
import favoriteService from '../services/favoriteService';
import { useAuth } from './AuthContext';

// Acciones posibles
const ACTIONS = {
    ADD_FAVORITE: 'ADD_FAVORITE',
    REMOVE_FAVORITE: 'REMOVE_FAVORITE',
    SET_FAVORITES: 'SET_FAVORITES',
    TOGGLE_FAVORITE: 'TOGGLE_FAVORITE'
};

// Reducer
const favoritesReducer = ( state, action ) => {
    switch ( action.type ) {
        case ACTIONS.ADD_FAVORITE:
            return [ ...state, action.payload ];

        case ACTIONS.REMOVE_FAVORITE:
            return state.filter( favorite => favorite.id !== action.payload.id );

        case ACTIONS.SET_FAVORITES:
            return action.payload;

        case ACTIONS.TOGGLE_FAVORITE:
            const exists = state.some( fav => fav.id === action.payload.id );
            return exists
                ? state.filter( fav => fav.id !== action.payload.id )
                : [ ...state, action.payload ];

        default:
            return state;
    }
};

const FavoritesContext = createContext();
const FAVORITES_STORAGE_KEY = 'app_favorites';

export const FavoritesProvider = ( { children } ) => {
    const [ favorites, dispatch ] = useReducer( favoritesReducer, [] );
    const [ showingFavorites, setShowingFavorites ] = useState( false );
    const { user, isAuthenticated } = useAuth();

    console.log( '🔄 FavoritesProvider renderizado' );
    // console.log( '📊 FavoritesProvider - favorites length:', favorites?.length || 0 );
    // console.log( '📊 FavoritesProvider - user:', user?.username || 'no user' );

    // Cargar favoritos desde la API si el usuario está autenticado
    useEffect( () => {
        // console.log( '🔍 FavoritesContext useEffect 1 ejecutado', { isAuthenticated: isAuthenticated(), user } );
        let isMounted = true;

        const loadFavorites = async () => {
            if ( isAuthenticated() && user?._id ) {
                try {
                    const response = await favoriteService.getUserFavorites();

                    if ( response.success && isMounted ) {
                        // Transformar los datos al formato que espera la aplicación
                        const formattedFavorites = response.data.map( ( fav ) => ( {
                            id: fav.event._id || fav.event.id,
                            ...fav.event,
                            // Limpiar el campo genre si es "Undefined" o similar
                            genre: ( fav.event.genre &&
                                fav.event.genre !== 'Undefined' &&
                                fav.event.genre !== 'undefined' &&
                                fav.event.genre !== 'null' ) ? fav.event.genre : null
                        } ) );

                        dispatch( { type: ACTIONS.SET_FAVORITES, payload: formattedFavorites } );
                    }
                } catch ( error ) {
                    console.error( 'Error al cargar favoritos:', error );
                }
            } else if (favorites.length > 0) {  // ← SOLO dispatch si hay que limpiar
                dispatch( { type: ACTIONS.SET_FAVORITES, payload: [] } );
            }
        };

        loadFavorites();

        return () => {
            isMounted = false;
        };
    }, [ user?._id ] );  // ✅ CORREGIDO: solo user?.id es suficiente

    

    // FUNCIÓN TOGGLEFAVORITE MEMOIZADA
    const toggleFavorite = useCallback( async ( event ) => {
        if ( isAuthenticated() ) {
            try {
                const isFav = favorites.some( fav => fav.id === event.id );
                if ( isFav ) {
                    const response = await favoriteService.removeFavorite( event.id );
                    if ( response.success ) {
                        dispatch( { type: ACTIONS.REMOVE_FAVORITE, payload: event } );
                    }
                } else {
                    const response = await favoriteService.addFavorite( event.id );
                    if ( response.success ) {
                        // En lugar de añadir solo el evento, recargar todos los favoritos
                        // para obtener los datos completos desde el backend
                        const favoritesResponse = await favoriteService.getUserFavorites();
                        if ( favoritesResponse.success ) {
                            const formattedFavorites = favoritesResponse.data.map( ( fav ) => ( {
                                id: fav.event._id || fav.event.id,
                                ...fav.event,
                                // Limpiar el campo genre si es "Undefined" o similar
                                genre: ( fav.event.genre &&
                                    fav.event.genre !== 'Undefined' &&
                                    fav.event.genre !== 'undefined' &&
                                    fav.event.genre !== 'null' ) ? fav.event.genre : null
                            } ) );
                            dispatch( { type: ACTIONS.SET_FAVORITES, payload: formattedFavorites } );
                        }
                    }
                }
            } catch ( error ) {
                console.error( 'Error al gestionar favorito:', error );
            }
        } else {
            // Si no está autenticado, solo actualizar el estado local
            dispatch( { type: ACTIONS.TOGGLE_FAVORITE, payload: event } );
        }
    }, [ favorites, isAuthenticated ] );

    // FUNCIÓN TOGGLESHOWINGFAVORITES MEMOIZADA
    const toggleShowingFavorites = useCallback( ( show = false ) => {
        setShowingFavorites( show );
    }, [] );

    // FUNCIÓN ISFAVORITE MEMOIZADA
    const isFavorite = useCallback( ( eventId ) => {
        return favorites.some( fav => fav.id === eventId );
    }, [ favorites ] );

    // CONTEXTVALUE MEMOIZADO - Solo cambia cuando cambian las dependencias
    const contextValue = useMemo( () => ( {
        favorites,
        toggleFavorite,
        isFavorite,
        showingFavorites,
        toggleShowingFavorites
    } ), [ favorites, toggleFavorite, isFavorite, showingFavorites, toggleShowingFavorites ] );

    return (
        <FavoritesContext.Provider value={ contextValue }>
            { children }
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext( FavoritesContext );
    if ( !context ) {
        throw new Error( 'useFavorites debe usarse dentro de un FavoritesProvider' );
    }
    return context;
};