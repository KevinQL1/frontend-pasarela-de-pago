import { api } from '#/services/api.js';

/**
 * Función que obtiene todos los productos del backend
 * Se mantiene separada del slice para respetar
 * el principio de separación de responsabilidades
 */

export const fetchProductsAPI = async () => {
  // Llamada GET al endpoint /products
  const response = await api.get('/products');

  // Retornamos solo la data (array de productos)
  return response.data;
};
