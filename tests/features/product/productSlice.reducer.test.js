import productReducer, { fetchProducts } from '#/features/product/productSlice.js';

describe('productSlice reducers', () => {
  const initial = { products: [], loading: false, error: null };

  test('pending sets loading', () => {
    const next = productReducer(initial, { type: fetchProducts.pending.type });
    expect(next.loading).toBe(true);
  });

  test('fulfilled sets products', () => {
    const payload = [{ id: 'p1' }];
    const next = productReducer(initial, { type: fetchProducts.fulfilled.type, payload });
    expect(next.products).toEqual(payload);
  });

  test('rejected sets error', () => {
    const next = productReducer(initial, { type: fetchProducts.rejected.type, payload: 'err' });
    expect(next.error).toBe('err');
  });
});