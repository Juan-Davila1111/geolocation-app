import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wifi, User } from 'lucide-react';

const UserCard = ({ currentUser, onlineCount }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-6 left-6 z-[1000] w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner"
          style={{ backgroundColor: currentUser?.color || '#3b82f6' }}
        >
          {currentUser?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800 leading-tight">
            {currentUser?.name || 'Invitado'}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
              En línea
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Usuarios</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Users size={14} className="text-blue-500" />
            <span className="text-sm font-bold text-slate-700">{onlineCount}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Ping</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Wifi size={14} className="text-green-500" />
            <span className="text-sm font-bold text-slate-700">Live</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
