import React, { useState, useEffect, useRef } from 'react';
import { RegistrationType, RegistrationFormData, FormErrors } from '../types';
import { Input } from './Input';
import { Button } from './Button';
import { CountrySelector } from './CountrySelector';
import { db } from '../services/database';

interface RegistrationFormProps {
  type: RegistrationType;
  onSuccess: () => void;
  onCancel: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  type, 
  onSuccess, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    countryCode: '', // Set to empty initially to let user select
    phone: '',
    company: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  
  const firstInputRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Focus the first input on mount
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Updated phone regex as per new requirements: 6 to 10 digits
    const phoneRegex = /^[0-9]{6,10}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (type === RegistrationType.PROFESSIONAL && !formData.company?.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (formData.phone?.trim()) {
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Phone number must be between 6 and 10 digits';
      }
      if (!formData.countryCode?.trim()) {
        newErrors.countryCode = 'Please select a country code';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await db.register(formData, type);
      onSuccess();
    } catch (error: any) {
      setErrors({ general: error.message || 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      countryCode: '',
      phone: '',
      company: ''
    });
    setErrors({});
    firstInputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 max-w-md mx-auto py-4"
      noValidate
    >
      <div className="flex items-center justify-between mb-8">
        <h2 
          ref={headingRef}
          tabIndex={-1} 
          className="text-2xl font-bold text-slate-900 focus:outline-none"
        >
          {type === RegistrationType.STUDENT ? 'Student Registration' : 'Professional Registration'}
        </h2>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          type === RegistrationType.STUDENT ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-800'
        }`}>
          {type}
        </span>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {errors.general && (
          <div className="p-4 mb-4 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3">
            <svg className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-rose-800">{errors.general}</p>
          </div>
        )}
      </div>

      <Input
        label="Full Name"
        name="name"
        placeholder="John Doe"
        required
        ref={firstInputRef}
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        icon={<svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="john@example.com"
        required
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        icon={<svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
      />

      {type === RegistrationType.PROFESSIONAL && (
        <Input
          label="Company Name"
          name="company"
          placeholder="Tech Solutions Inc."
          required
          value={formData.company}
          onChange={handleChange}
          error={errors.company}
          icon={<svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
        />
      )}

      {/* Unified Phone Input Group */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-0.5">
          Phone Number <span className="text-slate-400 font-normal ml-1">(Optional)</span>
        </label>
        
        <div className={`
          relative flex items-stretch h-[46px] w-full rounded-xl bg-white shadow-sm ring-1 ring-inset transition-all duration-200
          ${isPhoneFocused ? 'ring-2 ring-blue-600' : 'ring-slate-200'}
          ${errors.phone || errors.countryCode ? 'ring-rose-400' : ''}
          ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}
        `}>
          {/* Integrated Selector with fixed width for stability */}
          <div className="w-[110px] flex-shrink-0">
            <CountrySelector 
              value={formData.countryCode || ''}
              onChange={(code) => {
                setFormData(prev => ({ ...prev, countryCode: code }));
                if (errors.countryCode) setErrors(prev => ({ ...prev, countryCode: undefined }));
              }}
              disabled={isSubmitting}
              isJoined={true}
              error={errors.countryCode}
            />
          </div>

          <div className="relative flex-1">
            <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>

            <input
              name="phone"
              type="tel"
              placeholder="6-10 digit number"
              value={formData.phone}
              onFocus={() => setIsPhoneFocused(true)}
              onBlur={() => setIsPhoneFocused(false)}
              onChange={(e) => {
                // Remove non-digit characters
                const val = e.target.value.replace(/\D/g, '');
                // Updated limit to 10 digits as per new regex requirement
                if (val.length <= 10) {
                  setFormData(prev => ({ ...prev, phone: val }));
                  if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                }
              }}
              className="block w-full h-full border-0 bg-transparent py-0 pl-11 pr-3 text-slate-900 placeholder:text-slate-400 sm:text-sm focus:ring-0 rounded-r-xl"
              aria-label="Phone number"
            />
          </div>
        </div>
        
        {(errors.phone || errors.countryCode) && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-rose-500 ml-0.5">
            {errors.phone || errors.countryCode}
          </p>
        )}
      </div>

      <div className="pt-6 flex flex-col gap-3">
        <Button 
          type="submit" 
          isLoading={isSubmitting} 
          className="w-full"
          aria-label={isSubmitting ? 'Submitting registration...' : 'Confirm Registration'}
        >
          Confirm Registration
        </Button>
        <div className="flex gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClear} 
            disabled={isSubmitting}
            className="flex-1"
            aria-label="Clear all form fields"
          >
            Clear Form
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onCancel} 
            disabled={isSubmitting}
            className="flex-1"
            aria-label="Cancel registration and return to selection"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};