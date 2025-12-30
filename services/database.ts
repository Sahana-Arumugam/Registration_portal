import { Registration, RegistrationType, RegistrationFormData } from '../types';

const API_URL = "http://localhost:5000/api";

export const db = {
  register: async (
    data: RegistrationFormData,
    type: RegistrationType
  ): Promise<Registration> => {

    console.log("🔥 FRONTEND calling backend API");

    // Combine country code + phone (E.164 format)
    const fullPhone =
      data.phone && data.countryCode
        ? `${data.countryCode}${data.phone}`
        : "";

    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      registration_type: type.toLowerCase(),
      company: type === RegistrationType.PROFESSIONAL ? data.company?.trim() : "",
      phone: fullPhone
    };

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  }
};
