import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Modal from 'react-modal';

const DonationDetails = () => {
    const { id } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState('');
    const [donation, setDonationList] = useState([]);
    const donationCampaigns = [
        { id: 1, title: 'Campaign 1', goal: 1000, currentAmount: 500 },
        { id: 2, title: 'Campaign 2', goal: 2000, currentAmount: 1500 },
        { id: 3, title: 'Campaign 3', goal: 3000, currentAmount: 2500 }
    ];
   

    useEffect(() => {
        fetch('http://localhost:5000/DonationCampaignsDetails')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const donation = data.find(donation => donation.id == id);
                if (!donation) {
                    throw new Error(`Donation with ID ${id} not found`);
                }
                setDonationList(donation);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [id]);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const handleDonationSubmit = () => {
        // Add donation to the list
        const newDonation = {
            amount: donationAmount,
            donor: 'Anonymous' // You can add more details if needed
        };
        
        setDonationList([...donation, newDonation]);
        // Clear the donation amount input field
        setDonationAmount('');
        
    };


    return (
        <div className="p-4" style={{ paddingTop: '80px' }}>
            <Helmet>
                <title>Adopt Me | Donation Details</title>
            </Helmet>
            {/* Donation Details Section */}
            <div className="mb-8">
                {/* Display donation campaigns */}
                {/* Banner Section */}
                <div className="w-full h-[570px] mb-4">
                    <img src={donation.image} alt={donation.petName} className="w-full h-full object-cover rounded-md" />
                </div>

                {/* Pet Details Section */}
                <h1 className="text-2xl font-semibold mb-2">{donation.maxDonationAmount}</h1>
                <h1 className="text-2xl font-semibold mb-2">{donation.petName}</h1>
                <h1 className="text-2xl font-semibold mb-2">{donation.donatedAmount}</h1>

                {/* Donation input modal */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openModal}>Donate Now</button>
                {/* Modal code here */}
                {/* You can use a modal library like React Modal or create your own modal */}
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Adopt Pet"
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
            >
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Adopt {donation.petname}</h2>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Donation Amount</label>
                            <input
                                type="text"
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                    </div>
                    <Link to="/Payment">
                    <button className='my-4 px-10 py-2 rounded-lg text-xl font-bold border-orange-400 border-2'>Pay</button>
                    </Link>
                    <form onSubmit={handleDonationSubmit}>
                         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none">
                            Submit
                        </button>
                    </form>
                    <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none">
                        Cancel
                    </button>
                </div>
            </Modal>
            </div>

            {/* Recommended Donation Campaigns Section */}
            <h2 className="text-xl font-bold mb-4">Recommended Donation Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {donationCampaigns.map(campaign => (
                    <div key={campaign.id} className="border p-4">
                        <h3 className="text-lg font-bold">{campaign.title}</h3>
                        <p>Goal: ${campaign.goal}</p>
                        <p>Current Amount: ${campaign.currentAmount}</p>
                        {/* You can add a donate button here to directly donate to this campaign */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationDetails;
