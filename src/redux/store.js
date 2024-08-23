import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './realtor/authSlice';
import propertiesReducer from './realtor/propertiesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  properties: propertiesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
