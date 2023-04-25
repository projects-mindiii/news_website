import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/UserSlice'
import dealSlice from './slices/DealSlice'
import { persistStore, persistReducer } from "redux-persist"; 
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from 'redux-thunk';
import { combineReducers } from "redux";
import classifiedSlice from './slices/ClassifiedSlice';

//redux method which combines reducer
const rootReducer = combineReducers({
  user: userSlice,
  deal: dealSlice,
  classified: classifiedSlice,

});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); //wrap your app's root reducers and pass it to the persistStore.

//return an object that holds the complete state of your app
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
	middleware: [thunk],
})


export const persistor = persistStore(store); //persist the store to save the data locally

// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//   },
// })