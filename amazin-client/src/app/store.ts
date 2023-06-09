import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { departmentReducer } from './departmentReducer';
import { productFilterReducer } from './productFilterReducer';
import { productReducer } from './productReducer';
import { sellerDashboardViewReducer } from './sellerDashboardViewReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  departments: departmentReducer,
  products: productReducer,
  productFilters: productFilterReducer,
  sellerDashboardView: sellerDashboardViewReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

setupListeners(store.dispatch);
