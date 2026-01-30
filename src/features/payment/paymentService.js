import { api } from '#/services/api.js';

/**
 * Función que crea la transacción de pago en 
 * estado CREATE en el backend
 * Se mantiene separada del slice para respetar
 * el principio de separación de responsabilidades
 */

export const fetchPaymentAPI = async (body) => {
  // Llamada post al endpoint /transaction
  const response = await api.post('/transaction/pay', body);

  // Retornamos solo la data
  return response.data;
};
