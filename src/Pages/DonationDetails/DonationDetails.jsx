import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'; // Assuming you have a component for Stripe elements

const DonationDetails = ({ campaign }) => {
    const [donationAmount, setDonationAmount] = useState(0);
    const [cardHolderName, setCardHolderName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Load Stripe
        const stripe = await loadStripe('your_stripe_public_key');

        // Create a payment intent
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: donationAmount,
                campaignId: campaign.id,
            }),
        });
        const { clientSecret } = await response.json();

        // Confirm the payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: cardHolderName,
                },
            },
        });

        if (result.error) {
            console.error('Payment failed:', result.error.message);
            setLoading(false);
        } else {
            console.log('Payment succeeded:', result.paymentIntent);
            // Update donation details, show success message, etc.
        }
    };


    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="donationAmount">Donation Amount:</label>
        <input
            type="number"
            id="donationAmount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
        />
        <label htmlFor="cardHolderName">Cardholder Name:</label>
        <input
            type="text"
            id="cardHolderName"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
        />
        {/* Stripe elements container */}
        <div id="card-element"></div>
        <button type="submit" disabled={loading}>Donate Now</button>
    </form>
    );
};

export default DonationDetails;
