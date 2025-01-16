import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const FavoritesContext = createContext();
const FAVORITES_STORAGE_KEY = 'app_favorites';

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    });

    const [showingFavorites, setShowingFavorites] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }, [favorites]);

    const toggleFavorite = useCallback((event) => {
        setFavorites(prev => {
            const isFavorite = prev.some(fav => fav.id === event.id);
            const newFavorites = isFavorite 
                ? prev.filter(fav => fav.id !== event.id)
                : [...prev, event];
            return newFavorites;
        });
    }, []);

    const toggleShowingFavorites = useCallback((show = false) => {
        setShowingFavorites(show);
    }, []);

    const isFavorite = useCallback((eventId) => {
        return favorites.some(fav => fav.id === eventId);
    }, [favorites]);

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