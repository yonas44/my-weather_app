import React from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './search';

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  return (
    <header>
      <div style={{ color: 'white', textDecoration: 'none' }}>
        {pathname === '/' ? (
          ''
        ) : (
          <IoChevronBackSharp
            onClick={() => navigate(-1)}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      <span>{pathname === '/' ? 'Continents' : pathname}</span>
      <SearchBar />
    </header>
  );
};

export default Header;
