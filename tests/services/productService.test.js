import { jest } from '@jest/globals';
import { fetchProductsAPI } from '#/features/product/productService.js';
import { api } from '#/services/api.js';

describe('productService', () => {
  afterEach(() => jest.restoreAllMocks());

  test('fetchProductsAPI calls GET and returns data', async () => {
    api.get = jest.fn().mockResolvedValue({ data: [{ id: 'p1' }] });

    const res = await fetchProductsAPI();

    expect(api.get).toHaveBeenCalledWith('/products');
    expect(res).toEqual([{ id: 'p1' }]);
  });
});