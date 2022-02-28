import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import BillingScreen from './screens/BillingScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path='/' exact element={<HomeScreen />} />
          <Route path='/cart' element={<CheckoutScreen />} />
          <Route path='/billing' element={<BillingScreen />} />
          <Route path='/confirm' element={<ConfirmationScreen />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
