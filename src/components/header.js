import React from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './search';

const Header = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <header>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        {pathname === '/' ? (
          ''
        ) : (
          <IoChevronBackSharp style={{ cursor: 'pointer' }} />
        )}
      </Link>
      <span>{pathname === '/' ? 'All countries' : '/Country'}</span>
      <SearchBar />
    </header>
  );
};

export default Header;
