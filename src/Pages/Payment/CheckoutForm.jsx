import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: 100 }) // Replace with actual price
        .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
            // Swal.fire({
            //     position: "top-end",
            //     icon: "success",
            //     title: "Thanks for the Payment",
            //     showConfirmButton: false,
            //     timer: 1500
            // });
        })
        .catch(err => {
            console.error('Error creating payment intent:', err);
            setError('Failed to create payment intent');
        });
        // navigate('/DonationCampaigns')
    }, [axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (paymentError) {
            console.log('Payment Error', paymentError);
            setError(paymentError.message);
        } else {
            console.log('Payment Method', paymentMethod);
            setError('');
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                },
            },
        });

        if (confirmError) {
            console.log('Payment Confirmation Error', confirmError);
            setError(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            console.log('Payment Intent', paymentIntent);
            console.log('Transaction ID', paymentIntent.id); 
            setTransactionId(paymentIntent.id);
            setError('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ paddingTop: '80px' }}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='my-4 px-10 py-2 rounded-lg text-xl font-bold border-orange-400 border-2' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600">Your Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;
