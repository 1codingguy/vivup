import React, {useState} from 'react';
import { Pagination } from 'react-bootstrap';

const Paginate = ({currentPage, setCurrentPage, products, productsPerPage}) => {

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.innerHTML))
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
      <Pagination>
        {pageNumbers.map((x) => (
          <div className='mx-2' onClick={(e) => handleClick(e)}>
            <Pagination.Item active={x === currentPage}>{x}</Pagination.Item>
          </div>
        ))}
      </Pagination>
  );
};

export default Paginate;
