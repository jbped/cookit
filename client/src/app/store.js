import { configureStore } from '@reduxjs/toolkit';
import reducer from '../utils/globalSlice';

export const store = configureStore({
  reducer: {
    global: reducer,
  },
});
