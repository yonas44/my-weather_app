import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectContinent } from '../feature/countries/countries';
import getAllCountries from '../services/getCountries';

const Continents = () => {
  const dispatch = useDispatch();
  const handleContinentSelect = (input) => {
    dispatch(selectContinent(input));
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div className="continents">
      <Link data-testid="africa" to="/all-countries">
        <button
          type="button"
          className="Africa"
          onClick={() => handleContinentSelect('Africa')}
        >
          Africa
        </button>
      </Link>
      <Link to="/all-countries">
        <button
          type="button"
          className="Americas"
          onClick={() => handleContinentSelect('Americas')}
        >
          Americas
        </button>
      </Link>
      <Link to="/all-countries">
        <button
          type="button"
          className="Asia"
          onClick={() => handleContinentSelect('Asia')}
        >
          Asia
        </button>
      </Link>
      <Link to="/all-countries">
        <button
          type="button"
          className="Europe"
          onClick={() => handleContinentSelect('Europe')}
        >
          Europe
        </button>
      </Link>
    </div>
  );
};

export default Continents;
