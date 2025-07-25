
// utils/formatDate.js
export const formatDate = ( dateString, includeTime = false, shortMonth = false ) => {
     if ( !dateString ) return 'N/A';

     try {
          const date = new Date( dateString );

          const options = {
               day: '2-digit',
               month: shortMonth ? 'short' : 'long',  // "ene" vs "enero"
               year: 'numeric'
          };

          // Si incluye tiempo, añadir hora y minutos
          if ( includeTime ) {
               options.hour = '2-digit';
               options.minute = '2-digit';
          }

          return date.toLocaleDateString( 'es-ES', options );
     } catch {
          return 'Fecha no disponible';
     }
};