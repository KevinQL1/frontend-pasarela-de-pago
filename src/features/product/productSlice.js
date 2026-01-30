import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsAPI } from '#/features/product/productService.js';

/**
 * Thunk asíncrono
 * Se encarga de:
 * - Llamar al backend
 * - Manejar loading / success / error
 */

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, thunkAPI) => {
    try {
      // Llamada al servicio
      return await fetchProductsAPI();
    } catch (error) {
      // Manejo controlado de errores
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error al obtener productos'
      );
    }
  }
);

/**
 * Slice de productos
 * Maneja el estado global relacionado con productos
 */
const productSlice = createSlice({
  name: 'product',

  // Estado inicial
  initialState: {
    products: [],   // Lista de productos
    loading: false, // Estado de carga
    error: null     // Error si ocurre
  },

  reducers: {},

  /**
   * Reducers para los estados del thunk
   */
  extraReducers: (builder) => {
    builder
      // Cuando inicia la petición
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Cuando la petición es exitosa
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      // Cuando la petición falla
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Exportamos el reducer para usarlo en el store
export default productSlice.reducer;
