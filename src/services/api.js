import axios from 'axios';

/**
 * Instancia base de Axios
 * Aquí se centraliza la configuración de la API
 * para no repetir baseURL y headers en cada request
 */
export const api = axios.create({
  // URL base del backend (API Gateway o local)
  baseURL: import.meta.env.VITE_API_URL,

  // Headers comunes para todas las peticiones
  headers: {
    'Content-Type': 'application/json'
  }
});
