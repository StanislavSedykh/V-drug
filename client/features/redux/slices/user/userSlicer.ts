import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FetchingUserType, UserType } from '../../../../types/user/user';

const initialState: FetchingUserType = {
  status: 'fetching',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserType,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => action.payload,
    renameUser: (state, action: PayloadAction<string>) => {
      if (state.status === 'logged') {
        state.name = action.payload;
      }
    },
    logoutUser: (state) => ({ status: 'guest' }),
  },
});

// Action creators are generated for each case reducer function
export const { setUser, renameUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;