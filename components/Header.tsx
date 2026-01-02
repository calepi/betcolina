import React from 'react';
import { MalteseCross } from './MalteseCross';

export const Header: React.FC = () => {
  return (
    <header className="bg-vasco-black text-vasco-white sticky top-0 z-50 shadow-lg border-b-4 border-vasco-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-vasco-white p-1 rounded-full text-vasco-red shadow-md">
             <MalteseCross className="w-10 h-10" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl tracking-tighter uppercase leading-none">
              Analista da Colina
            </h1>
            <p className="text-xs text-gray-400 font-sans tracking-widest uppercase">
              Rigor • Dados • Disciplina
            </p>
          </div>
        </div>
        <div className="hidden md:block">
            {/* Decorative sash element */}
            <div className="h-1 w-32 bg-vasco-white transform -skew-x-12"></div>
        </div>
      </div>
    </header>
  );
};