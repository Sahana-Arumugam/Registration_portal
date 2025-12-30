
import React, { useId, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, ...props }, ref) => {
    const generatedId = useId();
    const id = props.id || generatedId;
    const errorId = `${id}-error`;

    return (
      <div className="mb-4">
        <label 
          htmlFor={id}
          className="block text-sm font-semibold text-slate-700 mb-1.5 ml-0.5"
        >
          {label} {props.required && <span className="text-rose-500" aria-hidden="true">*</span>}
        </label>
        <div className="relative group">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
              {icon}
            </div>
          )}
          <input
            {...props}
            id={id}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`
              block w-full rounded-xl border-0 py-2.5 sm:text-sm shadow-sm ring-1 ring-inset 
              transition-all duration-200
              ${icon ? 'pl-11' : 'pl-4'}
              ${error 
                ? 'ring-rose-300 placeholder:text-rose-300 focus:ring-2 focus:ring-inset focus:ring-rose-500' 
                : 'ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600'}
            `}
          />
        </div>
        {error && (
          <p 
            id={errorId}
            role="alert"
            className="mt-1.5 text-xs font-medium text-rose-500 ml-0.5 animate-pulse"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
