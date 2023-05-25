import { createSlice } from '@reduxjs/toolkit';
import { ParticipantsType } from '../../../../types/participants/participants';

type FactType = {
  fact: ParticipantsType['fact'];
};

const initialState = {
  facts: [],
};

export const factSlice = createSlice({
  name: 'fact',
  initialState,
  reducers: {
    setFact: (state, action) => {
      state.facts.push(action.payload);
    },
  },
});

export const { setFact } = factSlice.actions;

export default factSlice.reducer;
