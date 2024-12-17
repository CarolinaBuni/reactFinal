// App.jsx

import './App.css';
import MapContainer from './components/MapContainer/MapContainer';
import Toolbar from './components/Toolbar/Toolbar';
import useFetchEvents from './hooks/useFetchEvents';

const App = () => {
  const { events, error, fetchEvents } = useFetchEvents();

  console.log("App Render Start", { events, error });

  const result = (
    <div>
      <MapContainer events={events} error={error} />
      <Toolbar onFetchEvents={fetchEvents} />
    </div>
  );

  console.log("App Render End");
  return result;
};

export default App;
