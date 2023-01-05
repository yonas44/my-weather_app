import React from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import getWeather from '../services/getWeather';
import { selectCountry } from '../feature/countries/countries';

const Country = ({
  name, flag, timezone, area,
}) => {
  const dispatch = useDispatch();
  const handleCountry = (name) => {
    dispatch(selectCountry(name));
    dispatch(getWeather(name));
  };

  return (
    <button
      type="button"
      className="country-card"
      onClick={() => handleCountry(name)}
    >
      <Link to="/country">
        <img id="flag" src={flag} alt="flag" />
        <div className="country-info">
          <p id="timezone">{timezone}</p>
          <p id="country-name">{name}</p>
          <p id="country-size">{`Size: ${area?.toLocaleString()}Km2`}</p>
        </div>
      </Link>
    </button>
  );
};

Country.defaultProps = {
  name: null,
  flag: null,
  timezone: null,
  area: null,
};

Country.propTypes = {
  name: PropTypes.string,
  flag: PropTypes.string,
  timezone: PropTypes.string,
  area: PropTypes.number,
};

export default Country;
