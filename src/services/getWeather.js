import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_ID,
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  },
};

const getWeather = createAsyncThunk('fetchWeather', async (country) => {
  try {
    const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${country}`, options);
    return { sucess: true, data: response.data };
  } catch (err) {
    return { sucess: false, err: err.response.data.message };
  }
});

export default getWeather;
