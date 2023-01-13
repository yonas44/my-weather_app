import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchAllCountries from './fetchAllCountries';

const getAllCountries = createAsyncThunk('fetchCountries', async () => {
  try {
    const data = await fetchAllCountries();
    if (!data.message) {
      return {
        sucess: true,
        data,
      };
    }
    return { sucess: false, err: data.message };
  } catch (err) {
    return { sucess: false, err: err?.response.data.message };
  }
});

export default getAllCountries;
