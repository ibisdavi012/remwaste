import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchSkips = async (postcode: string, area: string) => {
  const url = `${API_BASE}/skips/by-location?postcode=${postcode}&area=${area}`;
  const response = await axios.get(url);
  return response.data;
}; 