import { createSlice } from '@reduxjs/toolkit';
import getAllCountries from '../../services/getCountries';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    sucess: true,
    loading: false,
    selected: { continent: 'All', country: 'Ethiopia' },
    filterby: '',
    countriesPerPage: 8,
    countries: [],
  },
  reducers: {
    filterCountries: (state, actions) => ({
      ...state, filterby: actions.payload,
    }),
    selectCountry: (state, actions) => ({
      ...state, selected: { ...state.selected, country: actions.payload },
    }),
    selectContinent: (state, actions) => ({
      ...state,
      selected: {
        ...state.selected, continent: actions.payload,
      },
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCountries.fulfilled, (state, actions) => {
      if (actions.payload.sucess) {
        return ({
          ...state,
          loading: false,
          countries: [...actions.payload.data],
        });
      }
      return ({
        ...state, loading: false, sucess: false, errorInfo: actions.payload.err,
      });
    })
      .addCase(getAllCountries.pending, (state) => ({
        ...state, loading: true,
      }))
      .addCase(getAllCountries.rejected, (state, actions) => ({
        ...state, loading: false, sucess: false, errorInfo: actions.payload?.err ?? 'Page Not found!',
      }));
  },
});

export const { filterCountries, selectCountry, selectContinent } = countriesSlice.actions;

export default countriesSlice.reducer;
