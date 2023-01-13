const fetchAllCountries = async () => {
  const response = await fetch(`${process.env.REACT_APP_COUNTRIES}`);
  return response.json();
};

export default fetchAllCountries;
