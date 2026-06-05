import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const UserList = ({ users, onUserClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        height: isExpanded ? 'auto' : '56px'
      }}
      className="fixed top-[110px] md:top-6 right-4 md:right-6 z-[1000] w-[calc(100%-32px)] md:w-64 max-h-[calc(100vh-200px)] bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 flex flex-col overflow-hidden transition-all duration-300"
    >
      <div 
        className="p-4 border-b border-slate-100 bg-white/50 flex items-center justify-between cursor-pointer md:cursor-default"
        onClick={() => window.innerWidth < 768 && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Users size={18} className="text-blue-500" />
          <h3 className="text-sm font-bold text-slate-800">Usuarios Activos</h3>
          <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
            {users.length}
          </span>
        </div>
        <div className="md:hidden text-slate-400">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      <div className={`overflow-y-auto flex-1 p-2 custom-scrollbar ${!isExpanded ? 'hidden md:block' : 'block'}`}>
        <div className="space-y-1">
          <AnimatePresence>
            {users.map((user) => (
              <motion.button
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => user.coords && onUserClick(user.coords)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all hover:bg-slate-50 group text-left ${!user.coords ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0"
                  style={{ backgroundColor: user.color || '#3b82f6' }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {user.coords ? 'Ver en mapa' : 'Sin ubicación'}
                  </p>
                </div>
                {user.coords && (
                  <MapPin size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default UserList;
