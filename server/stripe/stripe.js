const stripe = require('stripe')('sk_test_51HBl7cDJ4hFgM3meXZX8Ym2CMlkkqe9IVplJYyCXn9gphxMC0R8pvfp0rr4wJtqXJmlhE8WGd89tv4dsRjzpKUBG00NqtZCAUn');

const createIntent= async (totalCost)=>{
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  });
  return paymentIntent;
}

module.exports={
  createIntent,
}