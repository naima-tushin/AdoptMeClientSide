import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";

const CheckoutForm = ({ donationAmount, id, donatedAmount }) => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [donation, setDonationList] = useState([]);
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const handleDonatedAmount = async () => {
        const form = { donatedAmount: parseInt(donationAmount) + parseInt(donatedAmount) };
        try {
            const response = await axios.put(`http://localhost:5000/addDonatedAmount/${id}`, form);
            if (response.status === 200) {
                Swal.fire('Success', 'Donated amount updated successfully!', 'success');
            } else {
                Swal.fire('Error', 'Failed to update donated amount', 'error');
            }
        } catch (error) {
            console.error('Update error:', error);
            Swal.fire('Error', 'Failed to update donated amount', 'error');
        }
    };

    useEffect(() => {
        fetch('http://localhost:5000/DonationCampaignsDetails')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const donation = data.find(donation => donation._id == id);
                if (!donation) {
                    throw new Error(`Donation with ID ${id} not found`);
                }
                setDonationList(donation);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [id]);


    const handleDonatedList = async () => {
        const form = { donatedAmount: donationAmount, donatorName: user?.displayName, donatorEmail: user?.email, donationCampaignId: id, petImage: donation.petImage, petName: donation.petName};
        try {
            const response = await axios.post(`http://localhost:5000/addDonatedList`, form);
            if (response.status === 200) {
               console.log('added to donation list');
            } else {
                console.log('failed to add to donation list');
            }
        } catch (error) {
            console.error('Update error:', error);
            Swal.fire('Error', 'Failed to update donated amount', 'error');
        }
    };

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: donationAmount }) 
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
            handleDonatedAmount();
            handleDonatedList();
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
