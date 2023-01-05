import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineSmsFailed } from 'react-icons/md';
import getAllCountries from '../services/getCountries';
import Country from './country';
import load from '../assets/load.gif';

const AllCountries = () => {
  const countriesStore = useSelector((state) => state.countries);
  const {
    loading, filterby, countries, selected: { continent }, sucess, errorInfo,
  } = countriesStore;
  const filteredCountries = countries.filter((country) => {
    if (continent === 'All' && country.name.common.includes(filterby)) return true;
    if (country.name.common.includes(filterby) && country.region === continent) return true;
    return false;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div className="countries-holder">
      {loading && (
        <div className="load-wrapper-all-countries">
          <img
            style={{ width: '150px', height: '150px' }}
            src={load}
            alt="loading"
          />
        </div>
      )}
      { sucess ? (
        <div className={filteredCountries.length === 1 ? 'hide' : 'countries-holder'}>
          {filteredCountries.map((country) => (
            <Country
              key={country.name.common}
              id={country.id}
              name={country.name.common}
              flag={country.flags.svg}
              timezone={country.timezones[0]}
              area={country.area}
            />
          ))}
        </div>
      ) : (
        <div id="allCountries-error">
          <MdOutlineSmsFailed style={{ color: 'red', scale: '2' }} />
          <span>{errorInfo}</span>
        </div>
      )}
    </div>
  );
};

export default AllCountries;
