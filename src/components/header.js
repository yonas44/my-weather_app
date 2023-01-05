import React from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import SearchBar from './search';

const Header = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  const { pathname } = window.location;

  return (
    <header>
      {pathname === '/' ? (
        ''
      ) : (
        <IoChevronBackSharp
          style={{ cursor: 'pointer' }}
          onClick={handleNavigate}
        />
      )}
      <span>{pathname === '/' ? 'All countries' : '/Country'}</span>
      <SearchBar />
    </header>
  );
};

export default Header;
