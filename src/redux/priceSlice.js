import { createSlice } from '@reduxjs/toolkit';

const priceSlice = createSlice({
  name: 'price',
  initialState: {
    price: JSON.stringify({})
  },
  reducers: {
    updatePrice: (state, action) => {
      state.price = action.payload;
    }
  }
});

export const { updatePrice } = priceSlice.actions;
export const priceReducer = priceSlice.reducer;
