import { createSlice } from '@reduxjs/toolkit';

const initializationSlice = createSlice({
  name: 'initialization',
  initialState: {
    hashedPw: '',
    name: '',
    pw: ''
  },
  reducers: {
    updateHashedPw: (state, action) => {
      state = { ...state, hashedPw: action.payload };
      return state;
    },
    updatePw: (state, action) => {
      state = { ...state, pw: action.payload };
      return state;
    },
    updateName: (state, action) => {
      state = { ...state, name: action.payload };
      return state;
    },
    clearPropagatebleState: state => {
      state.hashedPw = '';
      state.name = '';
      state.pw = '';
    }
  }
});

// Not sure if these names are okay but I've gotten to the point where I run out of variable names.
export const { updateHashedPw, updateName, updatePw, clearPropagatebleState } = initializationSlice.actions;
export const initializationReducer = initializationSlice.reducer;
