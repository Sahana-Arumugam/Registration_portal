import React, { useEffect, useRef } from 'react';
import { Button } from './Button';

interface SuccessStateProps {
  onReset: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = ({ onReset }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Focus the success heading so screen readers announce completion
    headingRef.current?.focus();
  }, []);

  return (
    <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
      <div className="mb-8 flex justify-center">
        <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-200">
          <svg className="w-10 h-10" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      <h2 
        ref={headingRef}
        tabIndex={-1}
        className="text-3xl font-bold text-slate-900 mb-4 focus:outline-none"
      >
        Registration Successful!
      </h2>
      <p className="text-slate-600 mb-10 max-w-sm mx-auto leading-relaxed">
        We've reserved your spot for the AI for Humanity Summit 2025. A confirmation email will be sent shortly with further instructions.
      </p>
      
      <div className="flex flex-col gap-3 justify-center items-center">
        <Button 
          variant="primary" 
          onClick={onReset}
          aria-label="Return to the home page"
        >
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};