import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'


const Header = () => {
    const { cartItems } = useSelector(state => state.cart)

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Latest Products</Navbar.Brand>
          </LinkContainer>
          <Nav className='ml-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i> Cart {` `}
                <Badge pill bg='success'>
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </Badge>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
};

export default Header;
