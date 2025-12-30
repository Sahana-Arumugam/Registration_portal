import React, { useState } from 'react';
import { RegistrationType } from './types';
import { Landing } from './components/Landing';
import { RegistrationForm } from './components/RegistrationForm';
import { SuccessState } from './components/SuccessState';

enum AppState {
  IDLE = 'idle',
  FORM = 'form',
  SUCCESS = 'success'
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [selectedType, setSelectedType] = useState<RegistrationType | null>(null);

  const handleSelectType = (type: RegistrationType) => {
    setSelectedType(type);
    setState(AppState.FORM);
  };

  const handleSuccess = () => {
    setState(AppState.SUCCESS);
  };

  const handleCancel = () => {
    setState(AppState.IDLE);
    setSelectedType(null);
  };

  const reset = () => {
    setState(AppState.IDLE);
    setSelectedType(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      {/* Brand Header */}
      <div className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
        <span className="inline-block text-emerald-600 font-extrabold text-xs tracking-[0.2em] uppercase mb-1">
          Impact Collaborative
        </span>
        <h3 className="text-slate-900 font-bold text-lg opacity-80">AI for Humanity 2025</h3>
      </div>

      <main className="w-full max-w-2xl">
        <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div className="p-8 sm:p-12">
            {state === AppState.IDLE && (
              <Landing onSelectType={handleSelectType} />
            )}

            {state === AppState.FORM && selectedType && (
              <RegistrationForm 
                type={selectedType} 
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            )}

            {state === AppState.SUCCESS && (
              <SuccessState onReset={reset} />
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 flex justify-center items-center text-slate-400 text-sm px-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Registration Open
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;