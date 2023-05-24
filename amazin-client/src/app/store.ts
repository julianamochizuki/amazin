import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cartReducer } from './cartReducer';
import { departmentReducer } from './departmentReducer';
import { productReducer } from './productReducer';

const rootReducer = combineReducers({
  departments: departmentReducer,
  products: productReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

setupListeners(store.dispatch);
