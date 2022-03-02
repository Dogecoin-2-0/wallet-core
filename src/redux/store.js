import { configureStore } from '@reduxjs/toolkit';
import { phraseReducer } from './phraseSlice';
import { priceReducer } from './priceSlice';
import { initializationReducer } from './initializationSlice';

export default configureStore({
  reducer: {
    phraseReducer,
    priceReducer,
    initializationReducer
  }
});
