import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdOutlineExplore, MdOutlineSmsFailed } from 'react-icons/md';
import Country from './country';
import load from '../assets/load.gif';

const AllCountries = () => {
  const countriesStore = useSelector((state) => state.countries);
  const {
    loading, countries, sucess, selected: { continent }, errorInfo,
  } = countriesStore;
  const filteredCountries = countries.filter((country) => country.region === continent);

  const navigate = useNavigate();
  useEffect(() => {
    if (countriesStore.countries.length === 1) navigate('/');
  }, [countriesStore.countries.length, navigate]);

  return (
    <div className="countries-wrapper">
      <div className={`${continent} bigger-continent-img`}>
        <h2 id="continent-title">
          {continent}
        </h2>
        <p style={{ fontStyle: 'italic' }}>
          {`Home of ${filteredCountries.length} countries!`}
        </p>
        <a
          id="icon-wrapper"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://en.wikipedia.org/wiki/${continent}`}
        >
          <MdOutlineExplore id="explore-icon" />
        </a>
      </div>
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
        <div className="countries-holder">
          {filteredCountries.map((country) => (
            <Country
              key={country.name.common}
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
