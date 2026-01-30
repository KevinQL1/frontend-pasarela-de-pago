import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Add your reducers here
  },
});

export const { actions, reducer } = productSlice;

// Basic smoke test
test('product slice exports reducer and actions', () => {
  expect(reducer).toBeDefined();
  expect(actions).toBeDefined();
});
