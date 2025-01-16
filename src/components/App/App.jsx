const handleToggleMarkers = useCallback((showFavorites = false) => {
    console.log('handleToggleMarkers', { showFavorites });
    setShowingFavorites(showFavorites);
    setShowMarkers(true);
}, []); 