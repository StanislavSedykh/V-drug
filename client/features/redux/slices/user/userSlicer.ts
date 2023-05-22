import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerType } from "../../../../types/user/formTypes";

const initialState = {
  id: null,
  name: "",
  ingame: true,
  score: 0,
  img: "",
  user: {} as PlayerType,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setName: (state, action: PayloadAction<PlayerType>) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    logoutUser: (state) => {
      state.id = null;
      state.name = "";
      state.ingame = true;
      state.score = 0;
    },
    setUser: (state, action: PayloadAction<PlayerType>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logoutUser, setName, setUser } = userSlice.actions;

export default userSlice.reducer;
