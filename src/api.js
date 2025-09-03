import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://bmihealthplanner-backend-1.onrender.com';
export const api = axios.create({ baseURL });
