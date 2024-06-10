import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAuth from '@/Hooks/useAuth';

Modal.setAppElement('#root'); 

const PetDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/PetListingDetails')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const pet = data.find(pet => pet._id === id);
                if (!pet) {
                    throw new Error(`Pet with ID ${id} not found`);
                }
                setPet(pet);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [id]);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const adoptionData = {
            petId: pet._id,
            petName: pet.petName,
            petImage: pet.petImage,
            requestorName: user?.displayName,
            ownerName: pet.ownerName,
            ownerEmail: pet.ownerEmail,
            requestorEmail: user?.email,
            phoneNumber: phone,
            location: address,
            isAcceptedRequest: 0,
        };

        addAdoptionRequest(adoptionData);
        console.log('Adoption request:', adoptionData);
        closeModal();
    };

    const addAdoptionRequest = (adoptionData) => {
        if (phone !== '' && address !== '') {
            fetch('http://localhost:5000/addAdoptionRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(adoptionData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                Swal.fire('Success', 'Request added successfully!', 'success');
                setPhone(''); // Correctly update state using setter
                setAddress(''); // Correctly update state using setter
            })
            .catch(error => {
                console.error('Add Adoption Request error:', error);
            });
        } else {
            Swal.fire('Error', 'Phone number and location should be added', 'error');
        }
    };

    if (!pet) return <div>Loading...</div>;

    return (
        <div className="" style={{ paddingTop: '80px' }} >
            <Helmet>
                <title>Adopt Me | Pet Details</title>
            </Helmet>
            <div className="w-full h-[570px] mb-4">
                <img src={pet.petImage} alt={pet.petName} className="w-full h-full object-cover rounded-md" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">{pet.petName}</h1>
            <p className="text-sm text-gray-500 mb-2">Age: {pet.petAge}</p>
            <p className="text-sm text-gray-500 mb-2">Location: {pet.petLocation}</p>
            <p className="text-sm text-gray-500 mb-2">Description: {pet.shortDescription}</p>
            <p className="text-sm text-gray-500 mb-2">Description: {pet.longDescription}</p>
            <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                Adopt
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Adopt Pet"
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
            >
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Adopt {pet.name}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
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
    );
};

export default PetDetails;
