const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(
  'sk_test_51PxIEyFYc0g88E1p3uvfXwp1agBzrBOlzBhH2v9uSqQaqJsTlqF9vIH9Bl2ccUhN62EtGSvROom1vpRPd7PaXBop00QjdcbiCj'
); // Replace with your Stripe secret key

const app = express();
const PORT = 3000; //process.env.PORT || 80;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Route for handling payment requests
app.post('/charge', async (req, res) => {
  const { token, amount } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: amount * 100, // Amount in cents
      currency: 'usd',
      description: 'Parking Fee',
      source: token,
    });

    res.status(200).send('Success');
  } catch (error) {
    res.status(500).send('Error');
  }
});

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
