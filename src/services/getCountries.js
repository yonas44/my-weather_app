import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllCountries = createAsyncThunk('fetchCountries', async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return {
      sucess: true,
      data: response.data,
    };
  } catch (err) {
    return { sucess: false, err: err.response.data.message };
  }
});

export default getAllCountries;
