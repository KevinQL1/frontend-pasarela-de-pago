import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTransactionAPI } from '#/features/transaction/transactionService.js';

export const fetchTransaction = createAsyncThunk(
  'transaction/fetchTransaction',
  async (transactionId, { rejectWithValue }) => {
    try {
      const data = await fetchTransactionAPI(transactionId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al obtener la transacción');
    }
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transaction: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetTransactionState: (state) => {
      state.transaction = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
