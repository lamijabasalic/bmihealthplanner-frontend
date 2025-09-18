import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://bmihealthplanner-backend.onrender.com';
export const api = axios.create({ 
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});
