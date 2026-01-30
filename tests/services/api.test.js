import { api } from '../../src/services/api';

test('api defaults are configured', () => {
  expect(api.defaults.headers['Content-Type']).toEqual('application/json');
  expect(typeof api.defaults.baseURL).toBe('string');
});
