import { api } from '#/services/api.js';

/**
 * Obtiene la información completa de la transacción por ID
 * incluyendo detalles de producto, cliente y delivery
 */
export const fetchTransactionAPI = async (transactionId) => {
  // Traemos la transacción base
  const transactionRes = await api.post(`/webhook/${transactionId}`);
  const transactionData = transactionRes.data.updateTransaction;

  // Traemos los detalles usando los IDs
  const [productRes, customerRes, deliveryRes] = await Promise.all([
    api.get(`/products/${transactionData.productId}`),
    api.get(`/customers/${transactionData.customerId}`),
    api.get(`/deliveries/${transactionData.deliveryId}`),
  ]);

  return {
    ...transactionData,
    product: productRes.data,
    customer: customerRes.data,
    delivery: deliveryRes.data,
  };
};
