import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    // Add your reducers here
  },
});

export const { actions, reducer } = paymentSlice;

// Basic smoke test
test('payment slice exports reducer and actions', () => {
  expect(reducer).toBeDefined();
  expect(actions).toBeDefined();
});
