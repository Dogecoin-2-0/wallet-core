import { createSlice } from '@reduxjs/toolkit';
import { utils } from 'ethers';

const phraseSlice = createSlice({
  name: 'phrase',
  initialState: {
    phrase: null
  },
  reducers: {
    initPhrase: state => {
      const randomBytes = utils.randomBytes(16);
      state.phrase = utils.entropyToMnemonic(randomBytes);
    }
  }
});

export const { initPhrase } = phraseSlice.actions;
export const phraseReducer = phraseSlice.reducer;
