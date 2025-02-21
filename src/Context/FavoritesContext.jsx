import React, { createContext, useContext, useReducer, useState, useEffect, useCallback } from 'react';

// Acciones posibles
const ACTIONS = {
    ADD_FAVORITE: 'ADD_FAVORITE',
    REMOVE_FAVORITE: 'REMOVE_FAVORITE',
    TOGGLE_FAVORITE: 'TOGGLE_FAVORITE'
};

// Reducer
const favoritesReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_FAVORITE:
            return [...state, action.payload];
            
        case ACTIONS.REMOVE_FAVORITE:
            return state.filter(favorite => favorite.id !== action.payload.id);
            
        case ACTIONS.TOGGLE_FAVORITE:
            const exists = state.some(fav => fav.id === action.payload.id);
            return exists 
                ? state.filter(fav => fav.id !== action.payload.id)
                : [...state, action.payload];
                
        default:
            return state;
    }
};

const FavoritesContext = createContext();
const FAVORITES_STORAGE_KEY = 'app_favorites';

export const FavoritesProvider = ({ children }) => {
    const [favorites, dispatch] = useReducer(favoritesReducer, []);

    const [showingFavorites, setShowingFavorites] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }, [favorites]);

    const toggleFavorite = (event) => {
        dispatch({ 
            type: ACTIONS.TOGGLE_FAVORITE, 
            payload: event 
        });
    };

    const toggleShowingFavorites = useCallback((show = false) => {
        setShowingFavorites(show);
    }, []);

    const isFavorite = (eventId) => {
        return favorites.some(fav => fav.id === eventId);
    };

    const contextValue = {
        favorites,
        toggleFavorite,
        isFavorite,
        showingFavorites,
        toggleShowingFavorites
    };

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}; 