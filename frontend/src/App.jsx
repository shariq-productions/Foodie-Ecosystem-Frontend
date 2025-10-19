
import {Navbar} from './Components/Navbar'
import {Home} from './Components/Home'
import {OrderPage} from './Components/OrderPage'
import { Route, Routes } from 'react-router'
import { CheckoutPage } from './Components/CheckoutPage'
import { TrackPage} from './Components/TrackPage'
import {Admin} from './Admin/Admin'
import {loadStripe} from '@stripe/stripe-js';
import { useState,useEffect } from 'react'
import Payment from './Components/Payment/Payment'
import Completion from './Components/Payment/Completion'
function App() {
  const [ stripePromise, setStripePromise ] = useState(null);
  useEffect(() => {   
    fetch("http://localhost:4242/config").then(async (r) => {
      console.log("Check");
      const { publishableKey } = await r.json();
      console.log(publishableKey);
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);
  return (
    <div>
      <Navbar/>
      <div className='Central_Default relative mx-[5%]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<OrderPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<TrackPage/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/pay" element={<Payment stripePromise={stripePromise} />} />
          <Route path="/completion" element={<Completion stripePromise={stripePromise} />} />
        </Routes>
      </div>
      </div>
  );
} 

export default App
