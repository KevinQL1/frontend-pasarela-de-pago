import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPaymentAPI } from "#/features/payment/paymentService.js";

// Async thunk para procesar el pago usando PaymentService
export const processPayment = createAsyncThunk(
  "payment/processPayment",
  async (paymentInfo, { rejectWithValue }) => {
    try {
      // Llamamos al servicio que hace el POST
      const data = await fetchPaymentAPI(paymentInfo);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    success: false,
    error: null,
    paymentResponse: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.paymentResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.paymentResponse = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.paymentResponse = action.payload;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Error desconocido";
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
