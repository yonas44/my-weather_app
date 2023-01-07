import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countries/countries';
import weatherReducer from './weather/weather';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    weather: weatherReducer,
  },
});

export default store;
