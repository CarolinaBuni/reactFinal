// useFetchEvents.js

import { useState,  useCallback } from "react";

const useFetchEvents = () => {
  const [ events, setEvents ] = useState( [] );
  const [ error, setError ] = useState( null );

  const fetchEvents = useCallback( async () => {
    console.log( "fetchEvents called" );

    try {
      const response = await fetch(
        "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ES&city=Madrid&classificationName=music&apikey=xrdE9ZHXu6uGOvHCK5lXKw3ZuCB6c1TA&size=10"
      );

      if ( !response.ok ) {
        throw new Error( `Error fetching events: ${ response.statusText }` );
      }

      const data = await response.json();
      const heights = [300, 600, 900, 1200]; // Array de alturas

       // Mapear eventos y añadir alturas aleatorias
      const fetchedEvents = data._embedded.events.map( ( event ) => {
        const venue = event._embedded.venues[ 0 ];
        const randomHeight = heights[Math.floor(Math.random() * heights.length)];
        const longitude = parseFloat(venue.location.longitude);
        const latitude = parseFloat(venue.location.latitude);

        if (isNaN(longitude) || isNaN(latitude)) {
          console.warn(`Invalid coordinates for event ${event.id}`);
          return null;
        }

        return {
          id: event.id,
          name: event.name,
          coordinates: [longitude, latitude],
          height: randomHeight,
        };
      } );


      // setEvents( ( prevEvents ) => {
      //   if (isEqual(prevEvents, fetchedEvents)) {
      //     console.log("State unchanged, skipping setEvents");
      //     return prevEvents;
      //   }

      //   console.log("State updated");
      //   return [...fetchedEvents];
      // } );

      setEvents( ( prevEvents ) => {
        if ( prevEvents === fetchedEvents ) {
          console.log( "State unchanged, skipping setEvents" );
          return prevEvents; // No actualiza si las referencias son iguales
        }
        console.log( "State updated" );
        return fetchedEvents; // Actualiza solo si la referencia cambia
      } );

    } catch ( err ) {
      setError( "Error fetching events" );
      console.error( err );
    }
  }, [] );

  return { events, error, fetchEvents };
};

export default useFetchEvents;