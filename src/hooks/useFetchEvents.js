import { useState, useCallback } from "react";

const useFetchEvents = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    const fetchEvents = useCallback(async () => {
        try {
            const response = await fetch(
                "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ES&city=Madrid&classificationName=music&apikey=xrdE9ZHXu6uGOvHCK5lXKw3ZuCB6c1TA&size=10"
            );

            if (!response.ok) {
                throw new Error(`Error fetching events: ${response.statusText}`);
            }

            const data = await response.json();         
            const heights = [100, 300, 600, 900, 1200, 1500];

            const fetchedEvents = data._embedded.events.map((event) => {
                const venue = event._embedded.venues[0];
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
                    startDate: event.dates.start.localDate,
                    classificationName: event.classifications[0]?.segment?.name || '',
                    genreName: event.classifications[0]?.genre?.name || '',
                    subGenreName: event.classifications[0]?.subGenre?.name || '',
                    promoterName: event.promoters?.[0]?.name || '',
                    priceRanges: event.priceRanges || [],
                    venueName: venue.name,
                    cityName: venue.city.name,
                    address: venue.address.line1,
                    image: event.images?.[0]?.url || '',
                    url: event.url,
                    status: event.dates.status?.code || '',
                };
            });

            setEvents(prevEvents => {
                const newEvents = fetchedEvents.filter(Boolean);
                return JSON.stringify(prevEvents) === JSON.stringify(newEvents) 
                    ? prevEvents 
                    : newEvents;
            });

        } catch (err) {
            setError("Error fetching events");
            console.error(err);
        }
    }, []);

    return { events, error, fetchEvents };
};

export default useFetchEvents;