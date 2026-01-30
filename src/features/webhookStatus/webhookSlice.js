import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTransactionAPI } from "#/features/webhookStatus/webhookservice.js";

// Traer la transacción completa desde el summaryPage
export const fetchTransaction = createAsyncThunk(
  "webhook/fetchTransaction",
  async (transactionId, { rejectWithValue }) => {
    try {
      const data = await fetchTransactionAPI(transactionId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const webhookSlice = createSlice({
  name: "webhook",
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

export const { resetTransactionState } = webhookSlice.actions;
export default webhookSlice.reducer;
