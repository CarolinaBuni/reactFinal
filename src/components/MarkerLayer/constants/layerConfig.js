export const HEIGHT_COLORS = {
     100: '#a7f515',  // verde neón 
     300: '#e70f3e',  // rojo 
     600: '#bc13fe',  // violeta 
     900: '#fefe13',  // amarillo neón 
     1200: '#1592db', // azul 
     1500: '#19eeee', // cyan 
     default: '#fe13bc'
};

const TRANSITION_CONFIG = {
     opacity: {
          duration: 300,
          delay: 0
     },
     height: {
          duration: 300,
          delay: 0
     }
};

export const LAYER_CONFIG = {
     paint: {
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.9,
          'fill-extrusion-opacity-transition': TRANSITION_CONFIG.opacity,
          'fill-extrusion-height-transition': TRANSITION_CONFIG.height
     }
};