import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdOutlineExplore, MdOutlineSmsFailed } from 'react-icons/md';
import Country from './country';
import load from '../assets/load.gif';
import paginate from './utils/paginate';

const AllCountries = () => {
  const [currentPage, setPage] = useState(1);
  const countriesStore = useSelector((state) => state.countries);
  const {
    loading, countries, sucess, selected: { continent }, errorInfo, countriesPerPage,
  } = countriesStore;
  const filteredCountries = countries.filter((country) => country.region === continent);
  const paginatedCountries = paginate(filteredCountries, currentPage, countriesPerPage);

  const handlePageChange = (input) => {
    if (input === 'prev') return setPage((prevState) => prevState - 1);
    return setPage((prevState) => prevState + 1);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (continent === 'All') navigate('/');
  }, [continent, navigate]);

  return (
    <main className="countries-wrapper">
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
        <section className="countries-section">
          <div className="countries-holder">
            {paginatedCountries.map((country) => (
              <Country
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                timezone={country.timezones[0]}
                area={country.area}
              />
            ))}
          </div>
          <div className="pagination-holder">
            <span id="page-number">{`${currentPage}/ ${Math.ceil(filteredCountries.length / countriesPerPage)}`}</span>
            <div className="buttons-holder">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange('prev')}
                className="pagination-btns"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={currentPage >= Math.ceil(filteredCountries.length / countriesPerPage)}
                onClick={() => handlePageChange('next')}
                className="pagination-btns"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div id="allCountries-error">
          <MdOutlineSmsFailed style={{ color: 'red', scale: '2' }} />
          <span>{errorInfo}</span>
        </div>
      )}
    </main>
  );
};

export default AllCountries;
