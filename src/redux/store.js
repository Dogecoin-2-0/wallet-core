import { configureStore } from '@reduxjs/toolkit';
import { phraseReducer } from './phraseSlice';
import { priceReducer } from './priceSlice';

export default configureStore({
  reducer: {
    phraseReducer,
    priceReducer
  }
});
