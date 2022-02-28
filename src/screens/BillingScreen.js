import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BillingScreen = () => {
  const navigate = useNavigate()

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return
    }
    setValidated(false)
    navigate('/confirm')
  };

  return (

    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Billing Page</h1>
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide a valid name</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='text'
                placeholder="+X XX XXX XX"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide a valid phone number</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter country'
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide a valid country</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide a valid city</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide a valid address</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='zip'>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter zip'
                value={zip}
                required
                onChange={(e) => setZip(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide a valid zip code</Form.Control.Feedback>
            </Form.Group>
            <Button className='my-2' type='submit' variant='primary'>
              Next
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>

  );
};

export default BillingScreen;
