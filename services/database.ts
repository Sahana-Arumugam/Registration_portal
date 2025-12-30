/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

import {
  Registration,
  RegistrationType,
  RegistrationFormData
} from "../types";

/**
 * API URL
 * - Local: http://localhost:5000/api
 * - Production: https://your-backend-domain/api
 */
const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL =", import.meta.env.VITE_API_URL);

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
      company:
        type === RegistrationType.PROFESSIONAL
          ? data.company?.trim()
          : "",
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
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  }
};
