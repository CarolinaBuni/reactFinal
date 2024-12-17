// useFetchEvents.js

import { useState, useEffect, useCallback } from "react";

const useFetchEvents = () => {
  const [ events, setEvents ] = useState( [] );
  const [ error, setError ] = useState( null );

  const fetchEvents = useCallback( async () => {
    console.log( "fetchEvents called" );

    try {
      const response = await fetch(
        "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ES&city=Madrid&classificationName=music&apikey=xrdE9ZHXu6uGOvHCK5lXKw3ZuCB6c1TA&size=40"
      );

      if ( !response.ok ) {
        throw new Error( `Error fetching events: ${ response.statusText }` );
      }

      const data = await response.json();
      const fetchedEvents = data._embedded.events.map( ( event ) => {
        const venue = event._embedded.venues[ 0 ];
        return {
          id: event.id,
          name: event.name,
          coordinates: [ venue.location.longitude, venue.location.latitude ],
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