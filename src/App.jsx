// App.jsx
import React from 'react';
import { PopupProvider } from './Context/PopupContext';
import { FavoritesProvider } from './Context/FavoritesContext';
import AppContent from './components/AppContent/AppContent';

const App = () => (
    <FavoritesProvider>
        <PopupProvider>
            <AppContent />
        </PopupProvider>
    </FavoritesProvider>
);

export default App;