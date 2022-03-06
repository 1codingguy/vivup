import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './BillingScreen.css'

const BillingScreen = () => {
  const navigate = useNavigate()
  const { cartItems } = useSelector(state => state.cart)
  const [countriesData, setCountriesData] = useState([])
  const [dropdownToggle, setDropdownToggle] = useState('Select a country')

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

    console.log(form)

    if (form.checkValidity() === false || dropdownToggle === 'Select a country') {
      e.stopPropagation()
      setValidated(true)
      return
    }
    setValidated(false)
    navigate('/confirm')
  }

  const fetchCountries = async () => {
    try {
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
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // if (cartItems.length === 0) {
    //   alert('Cart it empty, click OK to go to home page')
    //   navigate('/')
    //   return
    // }

    fetchCountries()
  }, [])

  const handleSelect = eventKey => {
    console.log('eventKey is', eventKey)
    setDropdownToggle(eventKey)
    setCountry(eventKey)
  }

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

              <Dropdown
                onSelect={eventKey => handleSelect(eventKey)}
                className={
                  dropdownToggle !== 'Select a country'
                    ? 'valid-country-boarder'
                    : 'invalid-country-boarder'
                }
              >
                <DropdownButton title={dropdownToggle} variant='transparent'>
                  <Dropdown.Item eventKey='Australia'>
                    Australia
                    <img
                      width={'10%'}
                      src={'https://flagcdn.com/w320/au.png'}
                      alt={''}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item eventKey='Bahrain'>
                    Bahrain
                    <img
                      width={'10%'}
                      src={'https://flagcdn.com/w320/bh.png'}
                      alt={''}
                    />
                  </Dropdown.Item>
                </DropdownButton>
              </Dropdown>

              <Form.Control.Feedback
                type='invalid'
                className={
                  dropdownToggle === 'Select a country'
                    ? 'invalid-country-warning'
                    : null
                }
              >
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
