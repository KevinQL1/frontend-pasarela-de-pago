import transactionReducer, { fetchTransaction, resetTransactionState } from '#/features/transaction/transactionSlice.js';

describe('transactionSlice reducers', () => {
  const initial = { transaction: null, loading: false, error: null };

  test('resetTransactionState works', () => {
    const state = { ...initial, transaction: { id: 1 }, loading: true };
    const next = transactionReducer(state, resetTransactionState());
    expect(next).toEqual(initial);
  });

  test('pending sets loading', () => {
    const next = transactionReducer(initial, { type: fetchTransaction.pending.type });
    expect(next.loading).toBe(true);
  });

  test('fulfilled sets transaction', () => {
    const payload = { id: 't1' };
    const next = transactionReducer(initial, { type: fetchTransaction.fulfilled.type, payload });
    expect(next.transaction).toEqual(payload);
  });

  test('rejected sets error', () => {
    const next = transactionReducer(initial, { type: fetchTransaction.rejected.type, payload: 'err' });
    expect(next.error).toBe('err');
  });
});