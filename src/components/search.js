import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { filterCountries, selectContinent, selectCountry } from '../feature/countries/countries';
import getWeather from '../services/getWeather';

const SearchBar = () => {
  const [input, setInput] = useState('');

  const countriesStore = useSelector((state) => state.countries);
  const { filterby, countries, selected: { continent } } = countriesStore;
  const filteredCountries = countries.filter((country) => {
    if (continent === 'All') {
      if (country.name.common.includes(filterby)) return true;
    } else if (country.region === continent) {
      if (country.name.common.includes(filterby)) return true;
    }
    return false;
  });

  const location = useLocation();
  const { pathname } = location;

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

  const handleCountry = (name) => {
    dispatch(selectCountry(name));
    dispatch(getWeather(name));
    dispatch(filterCountries(''));
    setInput('');
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
      {filterby && (
      <div className="results-holder">
        {filteredCountries.length !== 0 ? filteredCountries.map((country) => (
          <Link onClick={() => handleCountry(country.name.common)} to="/country" key={country.name.common}>
            <div id="searched-country">
              <span>{country.name.common}</span>
              <img style={{ height: '20px' }} src={country.flags.svg} alt="flag" />
            </div>
            <hr style={{ color: 'lightgrey' }} />
          </Link>
        )) : <span style={{ fontSize: '0.9rem', color: 'red' }}>Sorry no country by that name!</span>}
      </div>
      )}
      {pathname === '/' && (
      <select id="filter-select" value={continent ?? 'All'}>
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
      )}
    </div>
  );
};

export default SearchBar;
