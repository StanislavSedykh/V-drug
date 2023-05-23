import { createSlice } from '@reduxjs/toolkit';
import { ParticipantsType } from '../../../../types/participants/participants';

type FactType = {
  fact: ParticipantsType['fact'];
};

const initialState: FactType = {
  fact: '',
};

export const factSlice = createSlice({
  name: 'fact',
  initialState,
  reducers: {
    setFact: (state, action) => {
      state.fact = action.payload;
    },
  },
});

export const { setFact } = factSlice.actions;

export default factSlice.reducer;
