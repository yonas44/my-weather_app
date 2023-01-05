import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdOutlineSmsFailed } from 'react-icons/md';
import load from '../assets/load.gif';

const DetailPage = () => {
  const {
    loading, weather, sucess, errorInfo,
  } = useSelector((state) => state.weather);
  const countriesInfo = useSelector((state) => state.countries);
  const selected = countriesInfo.selected.country;
  const country = countriesInfo.countries.filter(
    (card) => card.name.common === selected,
  )[0] ?? {};

  const naviagate = useNavigate();
  useEffect(() => {
    if (countriesInfo.countries.length === 0) naviagate('/');
  }, [countriesInfo.countries.length, naviagate]);

  return (
    <div className="detail-page">
      <div className="country-header">
        {loading ? (
          <div className="load-wrapper">
            <img
              style={{ width: '100px', height: '100px' }}
              src={load}
              alt="loading"
            />
          </div>
        ) : (
          ''
        )}
        <img id="country-header-img" src={country.flags?.png} alt="flag" />
        <>
          {sucess ? (
            <div className="header-info">
              <p id="country-name">{country.name?.common}</p>
              <div className="weather-info">
                <div id="top-section">
                  <img src={weather?.condition.icon} alt="weather-icon" />
                  <p>{weather.condition.text}</p>
                </div>
                <div id="bottom-section">
                  <p>{`${weather.maxtemp}°C / ${weather.mintemp}°C`}</p>
                  <p style={{ fontSize: '0.85rem' }}>{`Humidity: ${weather.hum}%`}</p>
                </div>
              </div>
            </div>
          ) : (
            <div id="detail-page-error">
              <MdOutlineSmsFailed style={{ color: 'white', scale: '2' }} />
              <span id="detail-error-message">{errorInfo}</span>
            </div>
          )}
        </>
      </div>
      <div className="country-detail">
        <p>
          <strong>
            Capital:
          </strong>
          {` ${country.capital ? country.capital[0] : ''}`}
        </p>
        <p>
          <strong>
            Population:
          </strong>
          {` ${country.population?.toLocaleString()}`}
        </p>
        <p>
          <strong>
            Location:
          </strong>
          {` ${country.latlng ? country.latlng[0] : ''}°N and ${country.latlng ? country.latlng[0] : ''}°E`}
        </p>
        <p>
          <strong>
            Subregion:
          </strong>
          {` ${country.subregion ?? ''}`}
        </p>
      </div>
    </div>
  );
};

export default DetailPage;
