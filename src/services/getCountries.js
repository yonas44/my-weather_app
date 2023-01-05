import { createAsyncThunk } from '@reduxjs/toolkit';

const getAllCountries = createAsyncThunk('fetchCountries', async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_COUNTRIES}`);
    const data = await response.json();
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
