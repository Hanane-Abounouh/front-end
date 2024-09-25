import axios from 'axios';

// URL de base pour votre API Laravel
const API_BASE_URL = 'http://localhost:8000/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Optionnel : Intercepteur pour ajouter un token d'authentification si nécessaire
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Par exemple, récupérer un token d'authentification
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Gérer les erreurs de réponse, si besoin
api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    window.location.href = '/login'; 
  }
  return Promise.reject(error);
});

export default api;
