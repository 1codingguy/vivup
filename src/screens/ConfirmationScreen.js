import React from 'react';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';

const ConfirmationScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart);

  const placeOrderhandler = () => {
    dispatch({type: CART_CLEAR_ITEMS})
    navigate('/')
    
  };
  console.log(cart)
  return (
    <>
      <Row className='my-2'>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Confirm Order</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant='flush'>
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        {item.name}
                      </Col>
                      <Col md={4}>
                        {item.qty} x £{item.price} = £{Number(item.qty * item.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
          <Button
            type='button'
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderhandler}
          >
            Confirm Order
          </Button>
      </Row>
    </>
  );
};

export default ConfirmationScreen;
