import React from 'react';
import { AuthProvider } from './Context/AuthContext';
import { PopupProvider } from './Context/PopupContext';
import { FavoritesProvider } from './Context/FavoritesContext';
import { EventsProvider } from './Context/EventsContext';
import AppContent from './components/AppContent/AppContent';

const App = () => (
    <AuthProvider>
        <FavoritesProvider>
            <EventsProvider>
                <PopupProvider>
                    <AppContent />
                </PopupProvider>
            </EventsProvider>
        </FavoritesProvider>
    </AuthProvider>
);

export default App;