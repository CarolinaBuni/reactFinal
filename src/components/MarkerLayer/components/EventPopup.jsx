
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const EventPopup = ( { map, event, closePopup } ) => {
     console.log( 'EventPopup Render' );
     useEffect( () => {
          if ( !event ) return;

          const popup = new mapboxgl.Popup( {
               closeButton: false,
               closeOnClick: false,
               className: 'event-tooltip'
          } )
               .setLngLat( event.coordinates )
               .setHTML( `
               <div>
                    <strong>${ event.name }</strong><br/>
                    ${ event.startDate }
               </div>
               `)
               .addTo( map );

          return () => {
               popup.remove();
               closePopup();
          };
     }, [ map, event, closePopup ] );

     return null;
};

export default EventPopup;