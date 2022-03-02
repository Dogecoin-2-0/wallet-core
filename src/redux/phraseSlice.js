import { createSlice } from '@reduxjs/toolkit';
import { generateMnemonic } from '../utils';

const phraseSlice = createSlice({
  name: 'phrase',
  initialState: {
    phrase: null
  },
  reducers: {
    initPhrase: state => {
      state.phrase = generateMnemonic();
    },
    clearPhrase: state => {
      state.phrase = null;
    }
  }
});

export const { initPhrase, clearPhrase } = phraseSlice.actions;
export const phraseReducer = phraseSlice.reducer;
