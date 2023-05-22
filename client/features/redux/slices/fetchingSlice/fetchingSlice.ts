import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { StatusType, fetchingType } from '../../../../types/fetchingTypes/fetchingTypes';

const initialState: fetchingType = {
  status: 'guest',
};

export const fetchingSlice = createSlice({
  name: 'status',
  initialState: initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = fetchingSlice.actions;

export default fetchingSlice.reducer;
