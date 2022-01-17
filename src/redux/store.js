import { configureStore } from '@reduxjs/toolkit';
import { phraseReducer } from './phraseSlice';

export default configureStore({
  reducer: {
    phraseReducer
  }
});
