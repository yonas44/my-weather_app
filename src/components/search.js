import React from 'react';
import { useDispatch } from 'react-redux';
import { filterCountries, selectContinent } from '../feature/countries/countries';

const SearchBar = () => {
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    const text = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    dispatch(filterCountries(text));
  };

  const handleSelect = (e) => {
    dispatch(selectContinent(e.target.value));
  };

  return (
    <div>
      <input
        id="country-input"
        type="text"
        onKeyUp={(e) => handleFilter(e)}
        placeholder="Enter a country name.."
        required
      />
      <select id="filter-select">
        <option
          style={{ fontWeight: 'bolder' }}
          onClick={(e) => handleSelect(e)}
        >
          All
        </option>
        <option onClick={(e) => handleSelect(e)}>Africa</option>
        <option onClick={(e) => handleSelect(e)}>Americas</option>
        <option onClick={(e) => handleSelect(e)}>Asia</option>
        <option onClick={(e) => handleSelect(e)}>Europe</option>
      </select>
    </div>
  );
};

export default SearchBar;
