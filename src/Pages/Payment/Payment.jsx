import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
    const { donationAmount, id , donatedAmount} = useParams();

    console.log(donationAmount, id); 

    return (
        <div style={{ paddingTop: '80px' }}>
            <p>Donation Amount: {donationAmount} </p> 
            <p>ID: {id}</p>
            <p>donatedAmount: {donatedAmount}</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm donationAmount={donationAmount} id={id} donatedAmount={donatedAmount} />
            </Elements>
        </div>
    );
};

export default Payment;
