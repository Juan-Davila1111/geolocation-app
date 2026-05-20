const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());

// Servir archivos estáticos del frontend en producción
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
}

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // En producción, especificar el dominio del frontend
        methods: ["GET", "POST"]
    }
});

// En memoria: { socketId: { id, name, coords, color } }
const activeUsers = new Map();

// Colores aleatorios para los avatares
const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
];

io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    // Unirse al mapa
    socket.on('join-map', (userData) => {
        const newUser = {
            id: socket.id,
            name: userData.name,
            coords: userData.coords || null,
            color: colors[Math.floor(Math.random() * colors.length)],
            joinedAt: new Date()
        };
        
        activeUsers.set(socket.id, newUser);
        
        // Enviar lista actual al nuevo usuario
        socket.emit('current-users', Array.from(activeUsers.values()));
        
        // Notificar a los demás
        socket.broadcast.emit('user-joined', newUser);
        
        console.log(`${newUser.name} se ha unido al mapa.`);
    });

    // Actualizar ubicación
    socket.on('update-location', (coords) => {
        const user = activeUsers.get(socket.id);
        if (user) {
            user.coords = coords;
            activeUsers.set(socket.id, user);
            
            // Emitir a todos la nueva posición
            io.emit('location-updated', {
                id: socket.id,
                coords: coords
            });
        }
    });

    // Desconexión
    socket.on('disconnect', () => {
        const user = activeUsers.get(socket.id);
        if (user) {
            console.log(`Usuario desconectado: ${user.name}`);
            activeUsers.delete(socket.id);
            io.emit('user-left', socket.id);
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
