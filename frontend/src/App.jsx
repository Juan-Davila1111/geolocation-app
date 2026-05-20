import React, { useState, useEffect, useCallback } from 'react';
import { socket } from './socket';
import EntryScreen from './components/EntryScreen';
import Map from './components/Map';
import UserCard from './components/UserCard';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isJoined, setIsJoined] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Handle joining the map
  const handleJoin = (name) => {
    socket.connect();
    
    // Get initial position before joining
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          socket.emit('join-map', { name, coords });
          setIsJoined(true);
          
          // Start watching position
          startWatchingLocation();
        },
        (err) => {
          console.error("Error de geolocalización:", err);
          // Permitir entrar incluso si falla la geolocalización inicial (usando 0,0)
          socket.emit('join-map', { name, coords: null });
          setIsJoined(true);
          setError("Por favor, permite el acceso a la ubicación para verte en el mapa.");
        }
      );
    } else {
      setError("Tu navegador no soporta geolocalización.");
      socket.emit('join-map', { name, coords: null });
      setIsJoined(true);
    }
  };

  const startWatchingLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          socket.emit('update-location', coords);
        },
        (err) => console.error("Error al observar ubicación:", err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  useEffect(() => {
    socket.on('current-users', (usersList) => {
      setUsers(usersList);
      const me = usersList.find(u => u.id === socket.id);
      if (me) setCurrentUser(me);
    });

    socket.on('user-joined', (newUser) => {
      setUsers(prev => [...prev, newUser]);
      // Sonido suave opcional
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => {});
    });

    socket.on('location-updated', (data) => {
      setUsers(prev => prev.map(user => 
        user.id === data.id ? { ...user, coords: data.coords } : user
      ));
      if (data.id === socket.id) {
        setCurrentUser(prev => prev ? { ...prev, coords: data.coords } : null);
      }
    });

    socket.on('user-left', (id) => {
      setUsers(prev => prev.filter(user => user.id !== id));
    });

    return () => {
      socket.off('current-users');
      socket.off('user-joined');
      socket.off('location-updated');
      socket.off('user-left');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-50">
      <AnimatePresence>
        {!isJoined ? (
          <EntryScreen onJoin={handleJoin} />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full"
          >
            <UserCard 
              currentUser={currentUser} 
              onlineCount={users.length} 
            />
            
            {error && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-red-50 text-red-600 px-6 py-3 rounded-2xl shadow-lg border border-red-100 text-sm font-medium">
                {error}
              </div>
            )}

            <Map 
              users={users} 
              currentUserCoords={currentUser?.coords} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
