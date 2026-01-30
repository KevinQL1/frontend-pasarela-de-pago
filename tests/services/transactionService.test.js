import { jest } from '@jest/globals';
import { fetchTransactionAPI } from '#/features/transaction/transactionService.js';
import { api } from '#/services/api.js';

describe('transactionService', () => {
  afterEach(() => jest.restoreAllMocks());

  test('fetchTransactionAPI returns combined transaction data', async () => {
    const tx = { id: 't1', productId: 'p1', customerId: 'c1' };
    api.post = jest.fn().mockResolvedValue({ data: { updateTransaction: tx } });
    api.get = jest.fn()
      .mockResolvedValueOnce({ data: { id: 'p1', name: 'Product' } })
      .mockResolvedValueOnce({ data: { id: 'c1', name: 'Customer' } });

    const res = await fetchTransactionAPI('t1');

    expect(api.post).toHaveBeenCalledWith('/transaction/t1');
    expect(api.get).toHaveBeenCalledTimes(2);
    expect(res).toEqual({ ...tx, product: { id: 'p1', name: 'Product' }, customer: { id: 'c1', name: 'Customer' } });
  });

  test('fetchTransactionAPI throws when api.post fails', async () => {
    api.post = jest.fn().mockRejectedValue(new Error('nope'));
    await expect(fetchTransactionAPI('t1')).rejects.toThrow('nope');
  });
});