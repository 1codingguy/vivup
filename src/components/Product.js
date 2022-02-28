import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'

const Product = ({ product }) => {
  const dispatch = useDispatch()

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart(product, qty))
    alert('Item added')
  }
  return (
    <Card className='my-3 p-3 rounded' style={{width: '18rem'}}>
      <Card.Img src={product.image} variant='top' />
      <Card.Body>
        <Card.Title as='div'>
          <strong>{product.name}</strong>
        </Card.Title>
        <p>{product.description}</p>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
      <Button onClick={() => addToCartHandler(product, 1)}>Add To Cart</Button>
    </Card>
  )
}

export default Product