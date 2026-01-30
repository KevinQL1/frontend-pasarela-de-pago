import { jest } from '@jest/globals';
import { fetchPaymentAPI } from '#/features/payment/paymentService.js';
import { api } from '#/services/api.js';

describe('paymentService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('fetchPaymentAPI calls POST and returns data', async () => {
    const body = { foo: 'bar' };
    api.post = jest.fn().mockResolvedValue({ data: { id: 'tx1', ok: true } });

    const res = await fetchPaymentAPI(body);

    expect(api.post).toHaveBeenCalledWith('/transaction/pay', body);
    expect(res).toEqual({ id: 'tx1', ok: true });
  });

  test('fetchPaymentAPI propagates errors', async () => {
    const err = new Error('fail');
    api.post = jest.fn().mockRejectedValue(err);

    await expect(fetchPaymentAPI({})).rejects.toThrow('fail');
  });
});