const Paginate = (array, currentPage, contentPerPage) => {
  const start = (currentPage - 1) * contentPerPage;
  const end = currentPage * contentPerPage;
  return array.slice(start, end);
};

export default Paginate;
