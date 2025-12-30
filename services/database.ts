import { Registration, RegistrationType, RegistrationFormData } from '../types';

const STORAGE_KEY = 'conference_registrations_v1';

export const db = {
  /**
   * Get all registrations from local storage
   */
  getAll: (): Registration[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Check if an email already exists
   */
  existsByEmail: (email: string): boolean => {
    const all = db.getAll();
    return all.some(r => r.email.toLowerCase() === email.toLowerCase());
  },

  /**
   * Check if a phone number already exists (only if provided)
   */
  existsByPhone: (countryCode?: string, phone?: string): boolean => {
    if (!phone || !phone.trim() || !countryCode) return false;
    const all = db.getAll();
    return all.some(r => r.countryCode === countryCode && r.phone === phone.trim());
  },

  /**
   * Save a new registration
   */
  register: async (
    data: RegistrationFormData, 
    type: RegistrationType
  ): Promise<Registration> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (db.existsByEmail(data.email)) {
      throw new Error('This email is already registered for the conference.');
    }

    const phoneTrimmed = data.phone?.trim();
    const hasPhone = !!phoneTrimmed && phoneTrimmed.length > 0;

    if (hasPhone && db.existsByPhone(data.countryCode, phoneTrimmed)) {
      throw new Error('This phone number is already registered for the conference.');
    }

    const newRegistration: Registration = {
      id: Math.random().toString(36).substring(2, 9),
      name: data.name.trim(),
      email: data.email.trim(),
      registration_type: type,
      company: type === RegistrationType.PROFESSIONAL ? data.company?.trim() : null,
      // Only store countryCode if a phone number is actually provided
      countryCode: hasPhone ? data.countryCode : undefined,
      phone: hasPhone ? phoneTrimmed : undefined,
      created_at: new Date().toISOString()
    };

    const all = db.getAll();
    all.push(newRegistration);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));

    return newRegistration;
  }
};