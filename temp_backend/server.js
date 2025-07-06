const express = require('express');
const cors =require('cors')
const app = express();
const { resolve } = require('path');
// Replace if using a different env file or config
const calculateTax = false;
const STRIPE_PUBLISHABLE_KEY="pk_test_51RYYNYQNh2spx8DeOlUFLV83jA6X5Dynk3obClbi0hK3Br8uOsx2upl6CxBRLwLVEzULciGcisgg8ZG7L2b5Rb6S003JY1vZl3"
const STRIPE_SECRET_KEY="sk_test_51RYYNYQNh2spx8DeItIxM0croNxNN31c75T3GYPAzdKyWqaDUuWHIreT35fHA65CL8nsMR6yXuu9XQLTyqg96rHu00VZwj4s7Z"
const STATIC_DIR="../../client/html"
const DOMAIN="http://localhost:4242"
const STRIPE_WEBHOOK_SECRET="replace-with-your-webhook-secret";
const stripe = require('stripe')(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  appInfo: { // For sample support and debugging, not required for production:
    name: "stripe-samples/accept-a-payment/payment-element",
    version: "0.0.2",
    url: "https://github.com/stripe-samples"
  }
});

app.use(cors());
app.use(express.static(STATIC_DIR));
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.get('/', (req, res) => {
  const path = resolve(STATIC_DIR + '/index.html');
  res.sendFile(path);
});

app.get('/config', (req, res) => {
    
    res.send({
    publishableKey: STRIPE_PUBLISHABLE_KEY,
  });
});

const calculate_tax = async (orderAmount, currency) => {
  const taxCalculation = await stripe.tax.calculations.create({
    currency,
    customer_details: {
      address: {
        line1: "10709 Cleary Blvd",
        city: "Plantation",
        state: "FL",
        postal_code: "33322",
        country: "US",
      },
      address_source: "shipping",
    },
    line_items: [
      {
        amount: orderAmount,
        reference: "ProductRef",
        tax_behavior: "exclusive",
        tax_code: "txcd_30011000"
      }
    ],
  });

  return taxCalculation;
};

app.get('/create-payment-intent', async (req, res) => {
  // Create a PaymentIntent with the amount, currency, and a payment method type.
  //
  // See the documentation [0] for the full list of supported parameters.
  //
  // [0] https://stripe.com/docs/api/payment_intents/create
console.log(req.params)

  let orderAmount = req.params.amount || 500;
  let paymentIntent;

  try {
    if (calculateTax) {
      let taxCalculation = await calculate_tax(orderAmount, "usd")

      paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: taxCalculation.amount_total,
        automatic_payment_methods: { enabled: true },
        metadata: { tax_calculation: taxCalculation.id }
      });
    }
    else {
      paymentIntent = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: orderAmount,
        automatic_payment_methods: { enabled: true }
      });
    }

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
app.post('/webhook', async (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === 'payment_intent.succeeded') {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    console.log('💰 Payment captured!');
  } else if (eventType === 'payment_intent.payment_failed') {
    console.log('❌ Payment failed.');
  }
  res.sendStatus(200);
});

app.listen(4242, () =>{
  console.log(`Node server listening at http://localhost:4242`)}
    
);
