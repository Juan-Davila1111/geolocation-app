import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const EntryScreen = ({ onJoin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onJoin(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-50 z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <MapPin className="text-blue-500 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">GeoLive</h1>
          <p className="text-slate-500">¿Cómo quieres aparecer en el mapa?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Tu nombre o alias"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 placeholder:text-slate-400"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200"
          >
            Entrar al mapa
            <ArrowRight size={20} />
          </button>
        </form>
        
        <p className="mt-8 text-center text-xs text-slate-400">
          Al entrar, solicitaremos permiso para acceder a tu ubicación.
        </p>
      </motion.div>
    </div>
  );
};

export default EntryScreen;
