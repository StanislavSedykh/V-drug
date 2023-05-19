import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlicer';
// import transactionReducer from './slices/transaction/transactionSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    // transaction: transactionReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type ThunkActionCreater<ThunkArgument = void> = (arg: ThunkArgument) => AppThunk;
