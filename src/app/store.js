import { configureStore } from '@reduxjs/toolkit';
import productReducer from '#/features/product/productSlice.js';
import paymentReducer from '#/features/payment/paymentSlice.js';
import transactionReducer from '#/features/transaction/transactionSlice.js';
import webhookReducer from '#/features/webhookStatus/webhookSlice.js';

/**
 * Store global de Redux
 * Aquí se registran todos los reducers de la aplicación
 */

export const store = configureStore({
  reducer: {
    // Estado product -> productSlice
    product: productReducer,
    // Estado payment -> paymentSlice
    payment: paymentReducer,
    // Estado transaction -> transactionSlice
    transaction: transactionReducer,
    // Estado webhook -> webhookSlice
    webhook: webhookReducer,
  },
});
