import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BillingScreen = () => {
  const navigate = useNavigate()
  const { cartItems } = useSelector(state => state.cart)
  const [countriesData, setCountriesData] = useState([])

  const [validated, setValidated] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [zip, setZip] = useState('')

  const submitHandler = e => {
    e.preventDefault()

    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }
    setValidated(false)
    navigate('/confirm')
  }

  const fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const rawData = await response.json()
    const processedData = rawData
      .map(country => {
        return { country: country.name.common, flag: country.flags.png }
      })
      .sort((a, b) => {
        if (a.country < b.country) {
          return -1
        }
        if (a.country > b.country) {
          return 1
        }
        return 0
      })
    setCountriesData(processedData)
  }

  useEffect(() => {
    if (cartItems.length === 0) {
      alert('Cart it empty, click OK to go to home page')
      navigate('/')
      return
    }

    fetchCountries()
  }, [])

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
                onChange={e => setName(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='text'
                placeholder='+X XX XXX XX'
                value={phone}
                required
                onChange={e => setPhone(e.target.value)}
                pattern='\+\d\s\d{2}\s\d{3}\s\d{2}'
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid phone number
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>

              {/* <Form.Control
                type='text'
                placeholder='Enter country'
                value={country} 
                required
                onChange={e => setCountry(e.target.value)}
              ></Form.Control> */}

              <Form.Select aria-label='list of countries'>
                <option defaultValue='' disabled selected hidden>
                  Select a country
                </option>
                {countriesData &&
                  countriesData.map(country => {
                    return (
                      <option
                        data-subtext={`<img src="${country.flag}">`}
                        key={country.country}
                        value={country}
                        required
                        onChange={e => setCountry(e.target.value)}
                      >
                        {country.country}
                        {/* <img src={country.flag} alt="" /> */}
                      </option>
                    )
                  })}
              </Form.Select>

              <Form.Control.Feedback type='invalid'>
                Please provide a valid country
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                required
                onChange={e => setCity(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid city
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                required
                onChange={e => setAddress(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid address
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='zip'>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type='text'
                placeholder='99999'
                value={zip}
                required
                onChange={e => setZip(e.target.value)}
                pattern='\d{5}'
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid zip code
              </Form.Control.Feedback>
            </Form.Group>
            <Button className='my-2' type='submit' variant='primary'>
              Next
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default BillingScreen
