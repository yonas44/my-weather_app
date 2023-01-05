import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { filterCountries, selectContinent } from '../feature/countries/countries';

const SearchBar = () => {
  const [input, setInput] = useState('');

  const dispatch = useDispatch();
  const handleFilter = (e) => {
    const text = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    dispatch(filterCountries(text));
  };

  const handleUpdate = (e) => {
    setInput(e.target.value);
  };

  const handleSelect = (e) => {
    dispatch(selectContinent(e.target.value));
  };

  const handleClear = () => {
    setInput('');
    dispatch(filterCountries(''));
  };

  return (
    <div className="search-wrapper">
      <div className="search-field">
        <input
          id="country-input"
          type="text"
          onKeyUp={(e) => handleFilter(e)}
          value={input}
          onChange={(e) => handleUpdate(e)}
          placeholder="Enter a country name.."
          required
        />
        {input && <IoMdClose id="cancel-search" onClick={handleClear} />}
      </div>
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
