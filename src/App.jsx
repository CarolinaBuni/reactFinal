// App.jsx

import { useState } from 'react';
import './App.css';
import MapContainer from './components/MapContainer/MapContainer';
import Toolbar from './components/Toolbar/Toolbar';
import useFetchEvents from './hooks/useFetchEvents';

const App = () => {
  const { events, error, fetchEvents } = useFetchEvents();
  const [showMarkers, setShowMarkers] = useState(false);

  console.log('App Render Start', { events, error });

  const toggleMarkers = () => {
    setShowMarkers((prev) => !prev);
  };

  return (
    <div>
      <MapContainer events={events} showMarkers={showMarkers} error={error} />
      <Toolbar onFetchEvents={fetchEvents} onToggleMarkers={toggleMarkers} events={events} />
    </div>
  );
};

export default App;