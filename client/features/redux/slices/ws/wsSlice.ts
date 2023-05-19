import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const wsSlice = createSlice({
  name: " wsSlice",
  initialState,
  reducers: {
    wsSet(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export default wsSlice.reducer;
export const { wsSet } = wsSlice.actions;
