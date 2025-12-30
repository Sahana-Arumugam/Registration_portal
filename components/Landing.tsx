import React from 'react';
import { RegistrationType } from '../types';
import { Button } from './Button';

interface LandingProps {
  onSelectType: (type: RegistrationType) => void;
}

export const Landing: React.FC<LandingProps> = ({ onSelectType }) => {
  return (
    <div className="text-center py-4 animate-in fade-in duration-700">
      <header className="mb-10">
        <div className="inline-flex items-center justify-center p-3.5 mb-6 bg-emerald-50 rounded-2xl" aria-hidden="true">
          <svg className="w-9 h-9 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 18c-5.966 0-10-4.03-10-9s4.034-9 10-9 10 4.03 10 9-4.034 9-10 9z" />
          </svg>
        </div>
        
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
            AI for Humanity Summit 2025
          </h1>
          <p className="text-sm font-semibold text-emerald-600/80 tracking-wide uppercase">
            Organized by Impact Collaborative
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium text-slate-800 mb-4 px-4 leading-snug">
            Building Ethical, Sustainable, and Human-Centered AI Solutions
          </h2>
          <div className="h-0.5 w-12 bg-emerald-100 mx-auto rounded-full mb-6"></div>
        </div>
      </header>

      <nav className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-12 px-2" aria-label="Registration options">
        <div className="group relative w-full sm:w-64">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500 group-hover:duration-200" aria-hidden="true"></div>
          <Button 
            className="w-full h-36 flex-col gap-3 relative bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
            onClick={() => onSelectType(RegistrationType.STUDENT)}
            aria-label="Register for the summit as a student"
          >
            <div className="p-2 bg-white/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <span className="font-bold tracking-tight">Register as Student</span>
          </Button>
        </div>

        <div className="group relative w-full sm:w-64">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-700 to-slate-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500 group-hover:duration-200" aria-hidden="true"></div>
          <Button 
            variant="secondary"
            className="w-full h-36 flex-col gap-3 relative bg-slate-800 hover:bg-slate-900 shadow-slate-900/20"
            onClick={() => onSelectType(RegistrationType.PROFESSIONAL)}
            aria-label="Register for the summit as a professional"
          >
            <div className="p-2 bg-white/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-bold tracking-tight">Register as Professional</span>
          </Button>
        </div>
      </nav>
      
      <p className="mt-14 text-sm text-slate-400 font-medium">
        Focused on ethical innovation and real-world impact.
      </p>
    </div>
  );
};