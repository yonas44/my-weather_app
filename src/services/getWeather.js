import { createAsyncThunk } from '@reduxjs/toolkit';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_ID,
    'X-RapidAPI-Host': process.env.REACT_APP_WEATHER,
  },
};

const getWeather = createAsyncThunk('fetchWeather', async (country) => {
  try {
    const response = await fetch(`https://${process.env.REACT_APP_WEATHER}/forecast.json?q=${country}`, options);
    const data = await response.json();
    if (!data.message) {
      return {
        sucess: true,
        data,
      };
    }
    return { sucess: false, err: data.message };
  } catch (err) {
    return { sucess: false, err: err.response.data.message };
  }
});

export default getWeather;
