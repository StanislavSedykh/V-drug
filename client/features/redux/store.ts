import numberReducer from "./slices/number/numberSlicer";
import errorSlice from "./slices/error/errorSlice";
import wsReducer from "../websocket/wsReducer";
import fetchingSlice from "./slices/fetchingSlice/fetchingSlice";
import { AnyAction, ThunkAction, combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
// import userReducer from './slices/user/userSlice';
import userReducer from './slices/user/userSlicer';
import scoreReducer from './slices/user/csoreSlicer';
import countReducer from './slices/game/countSlicer';
import pinReducer from './slices/game/pinSlicer';
import pinPartReducer from './slices/game/pinPartSlicer';
// import transactionReducer from './slices/transaction/transactionSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    score: scoreReducer,
    number: numberReducer,
    error: errorSlice,
    ws: wsReducer,
    fetching: fetchingSlice,
    count: countReducer,
  pin: pinReducer,
  pinPart: pinPartReducer,
  },
  middleware: (mid) => [...mid(), sagaMiddleware],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export type ThunkActionCreater<ThunkArgument = void> = (
  arg: ThunkArgument
) => AppThunk;

sagaMiddleware.run(rootSaga);

export default store;

