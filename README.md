# 🎵 PULSE - Plataforma de Eventos Musicales

Proyecto final del máster - Aplicación web para explorar eventos musicales en tiempo real.

## Descripción

Una aplicación web que permite a los usuarios:
- Ver eventos musicales en un mapa interactivo
- Guardar eventos como favoritos
- Escribir reseñas de eventos
- Filtrar eventos por categoría, ubicación y fechas

## Tecnologías principales
- React 18
- Mapbox GL para mapas
- JWT para autenticación
- CSS para estilos

## Características
- Mapa interactivo con eventos
- Sistema de usuarios (login/registro)
- Favoritos y reseñas
- Filtros de búsqueda
- Perfil de usuario

## Instalación
### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd NEW_REACT
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env
cp .env.example .env

# Configurar variables necesarias
VITE_MAPBOX_ACCESS_TOKEN=tu_token_de_mapbox
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Construir para producción**
```bash
npm run build
```

## Estructura del proyecto
```
NEW_REACT/
├── src/
│   ├── components/           # Componentes React
│   │   ├── AppContent/      # Contenido principal
│   │   ├── Auth/           # Autenticación
│   │   ├── MapContainer/   # Contenedor del mapa
│   │   ├── MarkerLayer/    # Capa de marcadores
│   │   ├── PopupManager/   # Gestión de popups
│   │   ├── Profile/        # Perfil de usuario
│   │   ├── EventHistory/   # Historial de eventos
│   │   ├── ReviewModal/    # Modal de reseñas
│   │   └── Toolbar/        # Barra de navegación
│   ├── Context/            # Contextos de React
│   ├── services/           # Servicios de API
│   ├── hooks/              # Hooks personalizados
│   ├── utils/              # Utilidades
│   └── config/             # Configuraciones
```

## Componentes principales
- MapContainer: Muestra el mapa con eventos
- Auth: Sistema de login/registro
- Profile: Perfil del usuario
- EventHistory: Historial de eventos
- ReviewModal: Sistema de reseñas

## API Backend
### **Endpoints Principales**
- `POST /api/users/register` - Registro de usuarios
- `POST /api/users/login` - Inicio de sesión
- `GET /api/users/profile` - Perfil de usuario
- `DELETE /api/users/delete` - Eliminación de cuenta
- `GET /api/events` - Lista de eventos
- `GET /api/events/search` - Búsqueda de eventos
- `GET /api/events/past` - Eventos pasados
- `POST /api/favorites` - Añadir favorito
- `DELETE /api/favorites/:id` - Eliminar favorito
- `GET /api/favorites` - Favoritos del usuario
- `POST /api/reviews` - Crear reseña
- `PUT /api/reviews/:id` - Actualizar reseña
- `DELETE /api/reviews/:id` - Eliminar reseña
- `GET /api/reviews/event/:id` - Reseñas de evento
- `GET /api/reviews/user` - Reseñas del usuario
