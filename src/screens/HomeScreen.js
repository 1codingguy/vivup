import React, {useState} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import products from '../data/products'

const HomeScreen = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(5)

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct= indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <Row>
        {currentProducts.map((product) => (
          <Col key={product.name} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate
        products={products}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
      />
    </>
  )
}

export default HomeScreen