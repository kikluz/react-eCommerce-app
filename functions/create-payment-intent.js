// domain/.netlify/functions/create-payment-intent
// after setup now we comunicate with stripe and get the secret token
// we dot share secret token
// neet to get a package to accsess env variables dotenv
const dotenv = require("dotenv");
dotenv.config();

// setup strupe method
// https://stripe.com/docs/payments/quickstart
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  // console.log(event);
  // check for post request check if is an event body request
  if (event.body) {
    // we get string in the body so we need to parse it
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
    // setup a function that gets me the amount  and calculate the total
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    // ? this is for  the backend and connect but for now in test
    const claculateOrderMaount = () => {
      return shipping_fee + total_amount;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: claculateOrderMaount(),
        currency: "usd",
      });
      return {
        //  check for the statusCode success 200
        statusCode: 200,
        //  we getting back the paymentIntent
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  // if not just Create Payment Intent
  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
