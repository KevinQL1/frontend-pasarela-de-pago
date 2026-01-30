import webhookReducer, { resetTransactionState, fetchTransaction } from '#/features/webhookStatus/webhookSlice.js';

describe('webhookSlice reducers', () => {
  const initial = { transaction: null, loading: false, error: null };

  test('resetTransactionState works', () => {
    const state = { ...initial, transaction: { id: 1 }, loading: true };
    const next = webhookReducer(state, resetTransactionState());
    expect(next).toEqual(initial);
  });

  test('pending sets loading', () => {
    const next = webhookReducer(initial, { type: fetchTransaction.pending.type });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  test('fulfilled sets transaction', () => {
    const payload = { id: 't1' };
    const next = webhookReducer(initial, { type: fetchTransaction.fulfilled.type, payload });
    expect(next.loading).toBe(false);
    expect(next.transaction).toEqual(payload);
  });

  test('rejected sets error', () => {
    const next = webhookReducer(initial, { type: fetchTransaction.rejected.type, payload: 'err' });
    expect(next.loading).toBe(false);
    expect(next.error).toBe('err');
  });
});