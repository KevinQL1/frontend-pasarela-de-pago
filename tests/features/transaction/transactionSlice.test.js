import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    // Add your reducers here
  },
});

export const { actions, reducer } = transactionSlice;

// Basic smoke test
test('transaction slice exports reducer and actions', () => {
  expect(reducer).toBeDefined();
  expect(actions).toBeDefined();
});
