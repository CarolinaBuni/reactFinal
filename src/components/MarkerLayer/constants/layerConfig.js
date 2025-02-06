export const HEIGHT_COLORS = {
     100: '#a7f515',  // verde neón (mantener)
     300: '#e70f3e',  // rojo (mantener)
     600: '#bc13fe',  // violeta (cambiar)
     900: '#fefe13',  // amarillo neón (cambiar)
     1200: '#1592db', // azul (mantener)
     1500: '#19eeee', // cyan (mantener)
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