/* eslint-disable no-alert */
/* eslint-disable no-lonely-if */
import React, {useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import axios from 'axios';
import { FormLabel, Input } from '@chakra-ui/core';
import CardSection from './cardSelection';
import { updateCartStatusThunk } from  '../../store/cartActions';

function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    await axios.get(`/checkout/secret/${props.match.params.id}`)
      .then(async(data)=>{
        console.log(data)
        const result = await stripe.confirmCardPayment(`${data.data.client_secret}`, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: 'Jenny Rosen',
            },
          }
        });

        if (result.error) {
          alert('insufficient funds')
          console.log(result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            props.updateStatus(props.match.params.id)
            props.history.push('/success');
          }
        }
      })
  };


  return (
    <form onSubmit={handleSubmit} className='box checkoutForm'>
      <FormLabel htmlFor="username">Email:</FormLabel>
      <Input
        type="text"
        id="email"
        bg='#E2E8F0'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CardSection />
      <button disabled={!stripe} type='submit' className='button is-danger' style={{marginTop:'10px'}}>Confirm order</button>
    </form>
  );
}
const mapStateToProps = (props) => (props);
const mapDispatchToProps = (dispatch) => ({
  updateStatus: (id) => dispatch(updateCartStatusThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);