import { createSlice } from '@reduxjs/toolkit';
import getWeather from '../../services/getWeather';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    loading: false,
    sucess: true,
    weather: {
      maxtemp: '',
      mintemp: '',
      hum: '',
      condition: {},
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.fulfilled, (state, actions) => {
        if (actions.payload.sucess) {
          const obj = actions.payload.data.forecast.forecastday[0].day;
          return {
            ...state,
            loading: false,
            weather: {
              maxtemp: obj.maxtemp_c,
              mintemp: obj.mintemp_c,
              hum: obj.avghumidity,
              condition: obj.condition,
            },
          };
        }
        return {
          ...state,
          sucess: false,
          loading: false,
          errorInfo: actions.payload.err,
        };
      })
      .addCase(getWeather.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getWeather.rejected, (state, actions) => ({
        ...state,
        sucess: false,
        errorInfo: actions.payload.err,
      }));
  },
});

export const { filterWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
