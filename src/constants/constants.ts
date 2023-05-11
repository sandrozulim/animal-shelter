export const GOOGLE_API_KEY = import.meta.env.VITE_REACT_MAPS_KEY;
export const BASE_API_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
  ANIMALS: `${BASE_API_URL}/animals`,
  DONATIONS: `${BASE_API_URL}/donations`,
  NOTIFICATIONS: `${BASE_API_URL}/NOTIFICATIONS`,
};

export const EMAIL_VALIDATION_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
