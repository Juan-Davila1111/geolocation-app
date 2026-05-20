# GeoLive - Aplicación de Localización en Tiempo Real

Una aplicación fullstack moderna y elegante para visualizar usuarios en un mapa en tiempo real utilizando WebSockets.

## 🚀 Características

- **Frontend:** React + Vite + Tailwind CSS.
- **Backend:** Node.js + Express.
- **Tiempo Real:** Socket.IO para comunicación bidireccional instantánea.
- **Mapas:** Leaflet con integración de OpenStreetMap (estilo CartoDB Light).
- **UI/UX:** Diseño minimalista, tarjetas suaves, animaciones con Framer Motion y responsive.
- **Geolocalización:** Seguimiento automático de la ubicación del usuario.

## 🚀 Despliegue (Monorepositorio)

Esta aplicación está configurada para desplegarse como un solo paquete, donde el backend sirve los archivos estáticos del frontend.

### Pasos para el Despliegue:

1. **Comando de Construcción (Build Command)** en Render/Vercel:
   ```bash
   npm run build
   ```
   *(Este comando instalará todas las dependencias y compilará el frontend automáticamente)*.

2. **Comando de Inicio (Start Command)**:
   ```bash
   npm start
   ```

3. **Configurar Variables de Entorno**:
   Asegúrate de que en el entorno de producción la variable `NODE_ENV` esté establecida en `production`.

4. **Iniciar la Aplicación**:
   El servidor Express servirá automáticamente el frontend:
   ```bash
   npm start
   ```

---
## 📁 Estructura del Proyecto

```text
GEOLOCATION/
├── backend/
│   ├── server.js          # Lógica del servidor y sockets
│   ├── package.json       # Dependencias del backend
│   └── .env               # Variables de entorno
└── frontend/
    ├── src/
    │   ├── components/    # Componentes React (Map, EntryScreen, UserCard)
    │   ├── App.jsx        # Componente principal y lógica de estado
    │   ├── socket.js      # Configuración del cliente Socket.IO
    │   ├── index.css      # Estilos globales y Tailwind
    │   └── main.jsx       # Punto de entrada de React
    ├── package.json       # Dependencias del frontend
    ├── tailwind.config.js # Configuración de estilos
    └── vite.config.js     # Configuración de Vite y Proxy
```

## 🛠️ Instalación y Uso

### 1. Clonar o descargar el proyecto
Asegúrate de tener instalados **Node.js** y **npm**.

### 2. Configurar el Backend
```bash
cd backend
npm install
npm run dev
```
El servidor se ejecutará en `http://localhost:5000`.

### 3. Configurar el Frontend
Abre una nueva terminal:
```bash
cd frontend
npm install
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

## 📱 Cómo funciona

1. **Entrada:** Escribe tu nombre y presiona "Entrar al mapa".
2. **Permisos:** El navegador solicitará acceso a tu ubicación.
3. **Visualización:** Aparecerás en el mapa con un marcador personalizado y tu nombre.
4. **Tiempo Real:** Si te mueves, tu marcador se actualizará para todos los demás usuarios conectados.
5. **Multiusuario:** Podrás ver a todos los usuarios activos en tiempo real con sus respectivos colores y nombres.

## 🛠️ Requisitos Técnicos

- Node.js >= 16.x
- Navegador con soporte para Geolocalización API.

---
Creado con ❤️ para una experiencia de usuario fluida y moderna.
