import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BackendUserType } from '../../../../types/user/user';

type ScoreType = { 
    score: BackendUserType['score']
}

const initialState: ScoreType = {
  score: 0,
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.score = action.payload;
    },
  },
});


export const { setScore } = scoreSlice.actions

export default scoreSlice.reducer
