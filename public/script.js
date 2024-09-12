const stripe = Stripe(
  'pk_test_51PxIEyFYc0g88E1p1AnufNUgCz4ZmVt6u7J8U1nsamhr8W1bh9YtiGZYdwmNEMJuwXgRfwfNsK9mVCx7vBjOox8j00Q4N5ckBH'
); // Replace with your Stripe publishable key
const elements = stripe.elements();

const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { token, error } = await stripe.createToken(cardElement);

  if (error) {
    errorMessage.textContent = error.message;
  } else {
    // Send the token to your server
    fetch('/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token.id,
        amount: document.getElementById('amount').value,
      }),
    }).then((response) => {
      if (response.ok) {
        alert('Payment successful!');
        form.reset();
      } else {
        errorMessage.textContent = 'Payment failed.';
      }
    });
  }
});
