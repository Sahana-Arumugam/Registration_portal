import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Country, getAllCountries } from '../services/countryData';

interface CountrySelectorProps {
  value: string; // Dial code
  onChange: (dialCode: string) => void;
  error?: string;
  disabled?: boolean;
  isJoined?: boolean;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({ 
  value, 
  onChange, 
  error, 
  disabled,
  isJoined = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const countries = useMemo(() => getAllCountries(), []);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Find the country based on dialCode, or undefined if no value
  const selectedCountry = useMemo(() => {
    if (!value) return undefined;
    // Note: Multiple countries can share dial codes (e.g. +1), so we just pick the first match
    return countries.find(c => c.dialCode === value);
  }, [value, countries]);

  const filteredCountries = useMemo(() => {
    const term = search.toLowerCase();
    return countries.filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.dialCode.includes(term) ||
      c.code.toLowerCase().includes(term)
    );
  }, [search, countries]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'ArrowDown' && !isOpen) setIsOpen(true);
  };

  return (
    <div className="relative h-full" ref={containerRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center gap-2 h-full w-full px-3 text-sm transition-all duration-200
          ${disabled ? 'bg-slate-50 cursor-not-allowed text-slate-400' : 'bg-transparent text-slate-900'}
          ${isJoined ? 'rounded-l-xl border-r border-slate-200' : 'rounded-xl ring-1 ring-inset ring-slate-200 shadow-sm'}
          ${error ? 'bg-rose-50/50' : 'hover:bg-slate-50/80'}
          focus:outline-none focus:bg-slate-50
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedCountry ? (
          <span className="text-xl leading-[1] flex items-center justify-center -mt-0.5" aria-hidden="true">
            {selectedCountry.flag}
          </span>
        ) : null}
        
        <span className={`font-semibold leading-none whitespace-nowrap ${!selectedCountry ? 'text-slate-400 text-xs tracking-tight' : 'text-slate-700'}`}>
          {selectedCountry ? selectedCountry.dialCode : 'IN +91'}
        </span>
        
        <svg className={`w-3 h-3 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 left-0 w-80 bg-white rounded-2xl shadow-2xl ring-1 ring-black ring-opacity-5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 border-b border-slate-100 bg-slate-50/50">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                autoFocus
                type="text"
                placeholder="Search country or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border-0 bg-white rounded-lg ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
              />
            </div>
          </div>
          <ul 
            ref={listRef}
            className="max-h-64 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-slate-200" 
            role="listbox"
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <li
                  key={`${c.code}-${c.dialCode}`}
                  role="option"
                  aria-selected={c.dialCode === value}
                  onClick={() => {
                    onChange(c.dialCode);
                    setIsOpen(false);
                  }}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors
                    ${c.dialCode === value ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'}
                  `}
                >
                  <span className="flex-1 truncate font-medium">
                    {c.name}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xl leading-none" aria-hidden="true">{c.flag}</span>
                    <span className={`font-mono text-xs w-12 text-right ${c.dialCode === value ? 'text-blue-600' : 'text-slate-400'}`}>
                      {c.dialCode}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-8 text-center text-sm text-slate-500">
                No countries found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};