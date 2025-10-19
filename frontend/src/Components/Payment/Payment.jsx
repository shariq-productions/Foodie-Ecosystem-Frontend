import {useEffect, useState} from 'react';

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'

function Payment(props) {
  const { stripePromise } = props;
  const [ clientSecret, setClientSecret ] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
      console.log("Client Secret 1")
    fetch("http://localhost:4242/create-payment-intent?" +new URLSearchParams({
        amount:45
      })
    ).then((res) => res.json()).then(({clientSecret}) =>{ 
  setClientSecret(clientSecret);  console.log("Client Secret")
  console.log(clientSecret);
  console.log(stripePromise)});
  }, []);


  return (
    <>
      <h1 className='mt-6 font-bold text-3xl'>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
