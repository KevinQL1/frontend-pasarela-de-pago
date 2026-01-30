import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const webhookSlice = createSlice({
  name: 'webhook',
  initialState,
  reducers: {
    // Add your reducers here
  },
});

export const { actions, reducer } = webhookSlice;

// Basic smoke test
test('webhook slice exports reducer and actions', () => {
  expect(reducer).toBeDefined();
  expect(actions).toBeDefined();
});
