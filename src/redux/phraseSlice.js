import { createSlice } from '@reduxjs/toolkit';
import { generateMnemonic } from '../utils';

const phraseSlice = createSlice({
  name: 'phrase',
  initialState: {
    phrase: null,
    referencePhrase: null
  },
  reducers: {
    initPhrase: state => {
      const p = generateMnemonic();
      state.phrase = p;
      state.referencePhrase = p;
    },
    shufflePhrase: state => {
      const shuffle = () => {
        const phraseArray = state.phrase.split(' ');
        let currentIndex = phraseArray.length;
        let randomIndex;

        while (currentIndex > 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex = currentIndex - 1;
          [phraseArray[currentIndex], phraseArray[randomIndex]] = [phraseArray[randomIndex], phraseArray[currentIndex]];
        }
        return phraseArray.join(' ');
      };
      state.phrase = shuffle();
    },
    clearPhrase: state => {
      state.phrase = null;
      state.referencePhrase = null;
    }
  }
});

export const { initPhrase, shufflePhrase, clearPhrase } = phraseSlice.actions;
export const phraseReducer = phraseSlice.reducer;
