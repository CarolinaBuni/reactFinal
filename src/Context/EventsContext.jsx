import React, { createContext, useContext, useState, useMemo, useCallback, useEffect, useRef } from 'react';
import useFetchEvents from '../hooks/useFetchEvents';
import { useFavorites } from './FavoritesContext';

const EventsContext = createContext();

export const EventsProvider = ( { children } ) => {
     const { events, error, fetchEvents, searchEvents } = useFetchEvents();
     const [ showMarkers, setShowMarkers ] = useState( false );
     const [ showingFavorites, setShowingFavorites ] = useState( false );
     const { favorites } = useFavorites();
     const [ searchQuery, setSearchQuery ] = useState( '' );
     
     // estado para filtros
     const [ filters, setFilters ] = useState( {
          category: '',
          genre: '',
          location: '',
          dateFrom: '',
          dateTo: ''
     } );

     // Referencia para almacenar el modo de búsqueda (todos, texto, cercanos)
     const searchMode = useRef( 'all' );

     // cargar eventos al iniciar
     useEffect( () => {
          fetchEvents();
     }, [] );

     // Géneros únicos para los filtros
     const genres = useMemo( () => {
          const uniqueGenres = [ ...new Set(
               events
                    .map( event => event.genreName )
                    .filter( genre => genre &&
                         genre !== 'undefined' &&
                         genre !== 'Undefined' &&
                         genre !== 'null' &&
                         genre.trim() !== '' )
          ) ];
          return uniqueGenres.sort();
     }, [ events ] );

     // Ciudades únicas para los filtros
     const cities = useMemo( () => {
          const uniqueCities = [ ...new Set(
               events
                    .map( event => event.cityName )
                    .filter( city => city &&
                         city !== 'undefined' &&
                         city !== 'Undefined' &&
                         city !== 'null' &&
                         city.trim() !== '' )
          ) ];
          return uniqueCities.sort();
     }, [ events ] );

     // Función para actualizar los filtros 
     const updateFilters = useCallback( ( newFilters ) => {
          setFilters( prev => {
               const updatedFilters = { ...prev, ...newFilters };

               if ( searchMode.current === 'text' && searchQuery ) {
                    searchEvents( searchQuery, updatedFilters );
               } else {

                    const params = {};
                    if ( updatedFilters.category ) params.category = updatedFilters.category;
                    if ( updatedFilters.genre ) params.genre = updatedFilters.genre;
                    if ( updatedFilters.location ) params.city = updatedFilters.location;
                    if ( updatedFilters.dateFrom ) params.startDate = updatedFilters.dateFrom;
                    if ( updatedFilters.dateTo ) params.endDate = updatedFilters.dateTo;

                    fetchEvents( params );
               }

               return updatedFilters;
          } );
     }, [ searchQuery ] );

     // Función para buscar eventos por texto
     const handleSearch = useCallback( ( query ) => {
          setSearchQuery( query );
          searchMode.current = 'text';
          searchEvents( query, filters );
     }, [ searchEvents, filters ] );


     // función para resetear todo completamente
     const resetAllFilters = useCallback( () => {
          setSearchQuery( '' );
          searchMode.current = 'all';
          setFilters( {
               category: '',
               genre: '',
               location: '',
               dateFrom: '',
               dateTo: ''
          } );
          fetchEvents( {} );
     }, [ ] );

     const upcomingEvents = useMemo( () => {
          if ( !events.length ) return [];

          const now = new Date();
          now.setHours(0, 0, 0, 0); 

          return events.filter( event => {
               
               const eventDate = new Date( event.startDate );
               return eventDate > now;
          } ).sort( ( a, b ) => new Date( a.startDate ) - new Date( b.startDate ) );
     }, [ events ] );

     const filteredUpcomingEvents = useMemo( () => {
          if ( !upcomingEvents.length ) return [];

          if ( showingFavorites ) {
               const favoriteIds = new Set( favorites.map( fav => fav.id ) );
               return upcomingEvents.filter( event => favoriteIds.has( event.id ) );
          }
          return upcomingEvents;
     }, [ upcomingEvents, showingFavorites, favorites.length ] );

     const handleToggleMarkers = useCallback( ( showFavorites = false, show = true ) => {
          setShowingFavorites( showFavorites );
          setShowMarkers( show );
     }, [] );


     const value = {
          events,
          error,
          upcomingEvents,
          filteredUpcomingEvents,
          genres,
          cities,
          fetchEvents,
          handleToggleMarkers,
          updateFilters,
          handleSearch,
          resetAllFilters,
          showMarkers,
          showingFavorites,
          filters,
          searchQuery,
     };

     return (
          <EventsContext.Provider value={ value }>
               { children }
          </EventsContext.Provider>
     );
};

export const useEvents = () => {
     const context = useContext( EventsContext );
     if ( !context ) {
          throw new Error( 'useEvents must be used within an EventsProvider' );
     }
     return context;
};

