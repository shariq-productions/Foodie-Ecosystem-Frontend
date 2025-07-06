import { useState,useEffect, useContext } from 'react'
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'
import { CartContext } from '../../CartContext';


function Payment(props) {
  const { stripePromise } = props;
  const [ clientSecret, setClientSecret ] = useState('');
  const {token_type,accessToken}=useContext(CartContext)
  
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
      console.log("Client Secret 1")
    fetch("https://foodie.backendpro.icu/stripe/create-payment-intent"
    ,{
      method:"GET",
      headers:{
        Authorization: `${token_type} ${accessToken}`,
        Accept: "application/json"
      }
    }
    ).then((res) => res.json()).then(({clientSecret}) =>{ 
  setClientSecret(clientSecret);  console.log("Client Secret")
  console.log(clientSecret);
  console.log(stripePromise)});
  }, [accessToken]);


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
