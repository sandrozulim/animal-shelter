export const BASE_API_URL = "http://localhost:3000";
export const API_ENDPOINTS = {
  ANIMALS: `${BASE_API_URL}/animals`,
  DONATIONS: `${BASE_API_URL}/donations`,
  NOTIFICATIONS: `${BASE_API_URL}/NOTIFICATIONS`,
};

export const GOOGLE_API_KEY = import.meta.env.VITE_REACT_MAPS_KEY;
