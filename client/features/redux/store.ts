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
import factReducer from './slices/fact/factSlicer';
// import transactionReducer from './slices/transaction/transactionSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer,
  score: scoreReducer,
  count: countReducer,
  pin: pinReducer,
  pinPart: pinPartReducer,
  fact: factReducer,
  // user: userSlice,
  // ws: wsSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
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

export default store;
