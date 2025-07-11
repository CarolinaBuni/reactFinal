// src/services/authService.js 

// Función para hacer peticiones con autenticación
const fetchWithAuth = async ( url, options = {} ) => {
  const token = localStorage.getItem( 'accessToken' );

  // Preparar headers con token si el usuario está autenticado
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if ( token ) {
    headers[ 'Authorization' ] = `Bearer ${ token }`;
  }

  // Hacer la petición
  const response = await fetch( `http://localhost:3000/api${ url }`, {
    ...options,
    headers
  } );

  // Si la respuesta no es ok, lanzar error
  if ( !response.ok ) {
    const errorData = await response.json().catch( () => ( {} ) );
    throw new Error( errorData.message || `Error ${ response.status }: ${ response.statusText }` );
  }

  return response.json();
};

// Servicio de autenticación
const authService = {
  // Registrar un nuevo usuario
  register: async ( userData ) => {
    try {
      // No usamos fetchWithAuth para register porque es una ruta pública
      const response = await fetch( 'http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( userData )
      } );

      const data = await response.json();

      if ( data.success ) {
        localStorage.setItem( 'accessToken', data.data.accessToken );
        localStorage.setItem( 'refreshToken', data.data.refreshToken );
      }

      return data;
    } catch ( error ) {
      console.error( 'Error en registro:', error );
      return { success: false, message: error.message };
    }
  },

  // Iniciar sesión
  login: async ( credentials ) => {
    try {
      console.log( 'Intentando login con:', credentials );

      // No usamos fetchWithAuth para login porque es una ruta pública
      const response = await fetch( 'http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( credentials )
      } );

      const data = await response.json();
      console.log( 'Respuesta login:', data );

      if ( data.success ) {
        localStorage.setItem( 'accessToken', data.data.accessToken );
        localStorage.setItem( 'refreshToken', data.data.refreshToken );
      }

      return data;
    } catch ( error ) {
      console.error( 'Error en login:', error );
      return { success: false, message: error.message };
    }
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem( 'accessToken' );
    localStorage.removeItem( 'refreshToken' );
    return { success: true };
  },

  // Comprobar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem( 'accessToken' );
  },

  // Obtener el perfil del usuario
  getProfile: async () => {
    try {
      return await fetchWithAuth( '/users/profile' );
    } catch ( error ) {
      console.error( 'Error al obtener perfil:', error );
      // Si hay error, limpiar tokens
      localStorage.removeItem( 'accessToken' );
      localStorage.removeItem( 'refreshToken' );
      return { success: false, message: error.message };
    }
  },
  deleteAccount: async () => {
    try {
      const response = await fetchWithAuth('/users/delete', {
        method: 'DELETE'
      });
      
      if (response.success) {
        // Limpiar tokens al eliminar la cuenta
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      
      return response;
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      return { success: false, message: error.message };
    }
  }
};

export { fetchWithAuth, authService };