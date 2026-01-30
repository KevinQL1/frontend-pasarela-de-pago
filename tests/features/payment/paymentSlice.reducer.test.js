import paymentReducer, { resetPaymentState, processPayment } from '#/features/payment/paymentSlice.js';

describe('paymentSlice reducers', () => {
  const initial = { loading: false, success: false, error: null, paymentResponse: null };

  test('resetPaymentState works', () => {
    const state = { ...initial, loading: true, success: true, paymentResponse: { id: 1 } };
    const next = paymentReducer(state, resetPaymentState());
    expect(next).toEqual(initial);
  });

  test('pending sets loading', () => {
    const next = paymentReducer(initial, { type: processPayment.pending.type });
    expect(next.loading).toBe(true);
  });

  test('fulfilled sets success and payload', () => {
    const payload = { id: 'ok' };
    const next = paymentReducer(initial, { type: processPayment.fulfilled.type, payload });
    expect(next.success).toBe(true);
    expect(next.paymentResponse).toEqual(payload);
  });

  test('rejected sets error', () => {
    const next = paymentReducer(initial, { type: processPayment.rejected.type, payload: 'err' });
    expect(next.error).toBe('err');
  });
});