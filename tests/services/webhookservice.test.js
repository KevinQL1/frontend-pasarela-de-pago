import { jest } from '@jest/globals';
import { fetchTransactionAPI } from '#/features/webhookStatus/webhookservice.js';
import { api } from '#/services/api.js';

describe('webhookservice', () => {
  afterEach(() => jest.restoreAllMocks());

  test('fetchTransactionAPI fetches transaction, product, customer and delivery', async () => {
    const tx = { id: 't1', productId: 'p1', customerId: 'c1', deliveryId: 'd1' };
    api.post = jest.fn().mockResolvedValue({ data: { updateTransaction: tx } });

    api.get = jest.fn()
      .mockResolvedValueOnce({ data: { id: 'p1', name: 'P' } })
      .mockResolvedValueOnce({ data: { id: 'c1', name: 'C' } })
      .mockResolvedValueOnce({ data: { id: 'd1', info: 'D' } });

    const res = await fetchTransactionAPI('t1');

    expect(api.post).toHaveBeenCalledWith('/webhook/t1');
    expect(api.get).toHaveBeenCalledTimes(3);
    expect(res).toEqual({ ...tx, product: { id: 'p1', name: 'P' }, customer: { id: 'c1', name: 'C' }, delivery: { id: 'd1', info: 'D' } });
  });
});