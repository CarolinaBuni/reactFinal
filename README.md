# 🎵 PULSE - Plataforma de Eventos Musicales

Una aplicación web moderna para explorar eventos musicales en tiempo real, gestionar favoritos y compartir experiencias a través de reseñas.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Componentes Principales](#-componentes-principales)
- [Contextos](#-contextos)
- [Servicios](#-servicios)
- [Hooks Personalizados](#-hooks-personalizados)
- [Utilidades](#-utilidades)
- [API Backend](#-api-backend)
- [Funcionalidades](#-funcionalidades)
- [Optimizaciones](#-optimizaciones)
- [Contribución](#-contribución)

## 🎯 Descripción

**Pulse** es una plataforma web interactiva que permite a los usuarios:

- **Explorar eventos musicales** en un mapa interactivo usando Mapbox GL
- **Gestionar favoritos** de eventos para seguimiento personal
- **Escribir y leer reseñas** de eventos asistidos
- **Mantener un perfil** con información personal y estadísticas
- **Filtrar eventos** por categoría, género, ubicación y fechas
- **Navegar por eventos pasados** y futuros


## ✨ Características

### 🗺️ **Mapa Interactivo**
- Visualización de eventos en tiempo real
- Marcadores dinámicos con información detallada
- Animaciones suaves y transiciones fluidas
- Clustering de eventos por región
- Navegación intuitiva con controles personalizados


### 👤 **Sistema de Autenticación**
- Registro e inicio de sesión de usuarios
- Gestión de tokens JWT
- Perfiles de usuario personalizables
- Avatares personalizados
- Eliminación segura de cuentas


### ⭐ **Sistema de Favoritos**
- Añadir/eliminar eventos de favoritos
- Vista dedicada de eventos favoritos
- Sincronización con backend
- Indicadores visuales de estado

### 📝 **Sistema de Reseñas**
- Crear y editar reseñas de eventos
- Sistema de calificación con estrellas (1-5)
- Comentarios detallados
- Vista de reseñas globales por evento
- Separación entre reseñas propias y de otros usuarios

### 📊 **Perfil de Usuario**
- Información personal editable
- Estadísticas de actividad
- Historial de eventos asistidos
- Gestión de reseñas propias
- Sistema de eliminación de cuenta con confirmación

### 🔍 **Filtros Avanzados**
- Filtrado por categoría de evento
- Filtrado por género musical
- Filtrado por ubicación/ciudad
- Filtrado por rango de fechas
- Búsqueda por texto
- Reset completo de filtros
- Búsqueda por clústers


## 🛠️ Tecnologías

### **Frontend**
- **React 18.3.1** - Biblioteca de interfaz de usuario
- **Vite 6.0.1** - Herramienta de construcción rápida
- **Mapbox GL 3.9.3** - Mapas interactivos
- **Framer Motion 12.0.5** - Animaciones
- **JWT Decode 4.0.0** - Manejo de tokens
- **Lodash 4.17.21** - Utilidades JavaScript

### **Iconografía**
- **FontAwesome 6.7.2** - Iconos SVG
- **Ionicons** - Iconos de interfaz

### **Desarrollo**
- **ESLint 9.15.0** - Linting de código
- **TypeScript** - Tipado estático (configuración)

## 🚀 Instalación

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

## 📁 Estructura del Proyecto

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

## 🧩 Componentes Principales

### **AppContent**
- Componente raíz que orquesta la aplicación
- Integra MapContainer y Toolbar
- Maneja el layout principal

### **MapContainer**
- Contenedor principal del mapa interactivo
- Integra múltiples hooks para funcionalidad
- Gestiona la inicialización de Mapbox GL
- Coordina animaciones y límites del mapa

### **Toolbar**
- Barra de navegación principal
- Gestiona estados de modales
- Integra autenticación y perfil
- Controla visualización de marcadores

### **Profile**
- Sistema completo de perfil de usuario
- Gestión de información personal
- Sistema de pestañas (Info, Favoritos, Reviews)
- Integración con reseñas y favoritos

### **EventHistory**
- Vista de eventos pasados
- Integración con sistema de reseñas
- Modal para ver todas las reseñas de un evento
- Gestión de estados de carga y error

### **ReviewModal**
- Modal para crear/editar reseñas
- Sistema de calificación con estrellas
- Validación de formularios
- Integración con servicios de API

## 🔗 Contextos

### **AuthContext**
- Gestión completa de autenticación
- Estados de usuario, loading y error
- Funciones de login, register, logout
- Verificación automática de autenticación
- Memoización para optimización

### **EventsContext**
- Gestión centralizada de eventos
- Filtros y búsqueda avanzada
- Estados de marcadores y favoritos
- Cálculo de eventos próximos
- Optimización con useMemo y useCallback

### **FavoritesContext**
- Gestión de favoritos del usuario
- Sincronización con backend
- Estados de visualización
- Reducer para manejo de estado complejo

### **PopupContext**
- Gestión de información de popups
- Estados de apertura/cierre
- Memoización para rendimiento

## ⚙️ Servicios

### **authService**
- Autenticación completa (login, register, logout)
- Gestión de tokens JWT
- Verificación de autenticación
- Eliminación de cuentac
- Función `fetchWithAuth` para peticiones autenticadas

### **eventService**
- Obtención de eventos con filtros
- Búsqueda de eventos por texto
- Obtención de eventos pasados
- Gestión de parámetros de consulta

### **favoriteService**
- Añadir/eliminar favoritos
- Obtener favoritos del usuario
- Verificar estado de favorito
- Manejo de errores robusto

### **reviewService**
- Crear/actualizar/eliminar reseñas
- Obtener reseñas de eventos
- Obtener reseñas del usuario
- Gestión completa de CRUD

## 🎣 Hooks Personalizados

### **useFetchEvents**
- Hook principal para obtención de eventos
- Procesamiento de datos del backend
- Manejo de estados de carga y error
- Búsqueda con filtros avanzados
- Cleanup para evitar memory leaks

### **useProfileReducer**
- Reducer complejo para gestión de perfil
- Estados de edición, eliminación, reseñas
- Acciones memoizadas para rendimiento
- Gestión de fases de eliminación de cuenta

### **useReviewSubmit**
- Lógica de envío de reseñas
- Manejo de estados de carga
- Integración con servicios
- Cleanup automático

### **useMapInitialization**
- Inicialización de Mapbox GL
- Configuración de estilos y controles
- Gestión de referencias del mapa

### **useGlobeAnimation**
- Animaciones del globo terráqueo
- Transiciones suaves
- Efectos visuales avanzados

### **useMapBounds**
- Gestión de límites del mapa
- Ajuste automático de vista
- Coordinación con eventos

## 🛠️ Utilidades

### **formatDate**
- Formateo centralizado de fechas
- Soporte para diferentes formatos
- Localización en español
- Manejo de errores robusto

### **clusterUtils**
- Agrupación de eventos por región
- Cálculo de centros de masa
- Generación de GeoJSON
- Optimización para visualización

### **avatars**
- Gestión de avatares de usuario
- Fallbacks para imágenes rotas
- URLs de Cloudinary

### **TextScramble**
- Efectos de texto animado
- Transiciones visuales
- Efectos de "typing"

## 🌐 API Backend

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

## 🎮 Funcionalidades

### **Exploración de Eventos**
- Visualización en mapa interactivo
- Información detallada en popups
- Filtros múltiples
- Búsqueda por texto
- Navegación por eventos próximos

### **Gestión de Favoritos**
- Añadir/eliminar con un clic
- Vista dedicada de favoritos
- Sincronización automática
- Indicadores visuales

### **Sistema de Reseñas**
- Calificación con estrellas
- Comentarios detallados
- Edición de reseñas existentes
- Vista de reseñas globales
- Separación usuario/otros

### **Perfil de Usuario**
- Información personal editable
- Avatar personalizable
- Estadísticas de actividad
- Gestión de reseñas propias
- Eliminación segura de cuenta

### **Historial de Eventos**
- Vista de eventos pasados
- Integración con reseñas
- Modal de reseñas globales
- Estados de carga y error

## ⚡ Optimizaciones

### **Rendimiento**
- Memoización extensiva con `useMemo` y `useCallback`
- Cleanup automático en hooks
- Comparaciones eficientes de arrays
- Lazy loading de componentes

### **UX/UI**
- Animaciones suaves con Framer Motion
- Estados de carga informativos
- Manejo robusto de errores
- Feedback visual inmediato

### **Código**
- Separación clara de responsabilidades
- Hooks personalizados reutilizables
- Servicios centralizados
- Contextos optimizados

### **Seguridad**
- Validación de tokens JWT
- Manejo seguro de autenticación
- Sanitización de datos
- Confirmaciones para acciones críticas

## 🤝 Contribución

### **Estructura de Commits**
```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: cambios de estilo
refactor: refactorización
test: pruebas
chore: tareas de mantenimiento
```

### **Estándares de Código**
- ESLint configurado
- Prettier para formateo
- Hooks de React personalizados
- Componentes funcionales
- TypeScript para tipado

### **Arquitectura**
- Separación de responsabilidades
- Componentes reutilizables
- Servicios centralizados
- Contextos optimizados
- Hooks personalizados

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Carolina Buni de Jesús** - Desarrollo completo del proyecto

---

**Pulse** - Conectando música y experiencias 🎵
