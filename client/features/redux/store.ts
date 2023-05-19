import { AnyAction, ThunkAction, combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
// import userReducer from './slices/user/userSlice';
import userReducer from './slices/user/userSlicer';
// import transactionReducer from './slices/transaction/transactionSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer,
    // ws: wsSlice,
})


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  })

  
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>;
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch;
  
  export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
  export type ThunkActionCreater<ThunkArgument = void> = (arg: ThunkArgument) => AppThunk;
  
  sagaMiddleware.run(rootSaga);
  export default store;