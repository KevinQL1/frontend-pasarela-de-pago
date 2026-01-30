// src/services/transactionService.js
import { api } from '#/services/api.js';

/**
 * Obtiene la información completa de la transacción por ID
 * incluyendo detalles de producto, cliente y delivery
 */
export const fetchTransactionAPI = async (transactionId) => {
  // Traemos la transacción base
  const transactionRes = await api.post(`/transaction/${transactionId}`);
  const transactionData = transactionRes.data.updateTransaction;

  // Traemos los detalles usando los IDs
  const [productRes, customerRes] = await Promise.all([
    api.get(`/products/${transactionData.productId}`),
    api.get(`/customers/${transactionData.customerId}`),
  ]);

  return {
    ...transactionData,
    product: productRes.data,
    customer: customerRes.data,
  };
};
