import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countries/countries';
import weatherReducer from './weather/weather';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
