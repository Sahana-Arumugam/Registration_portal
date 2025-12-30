
export enum RegistrationType {
  STUDENT = 'student',
  PROFESSIONAL = 'professional'
}

export interface Registration {
  id: string;
  name: string;
  email: string;
  registration_type: RegistrationType;
  company?: string | null;
  countryCode?: string;
  phone?: string;
  created_at: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  countryCode?: string;
  phone?: string;
  company?: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  countryCode?: string;
  phone?: string;
  general?: string;
}
