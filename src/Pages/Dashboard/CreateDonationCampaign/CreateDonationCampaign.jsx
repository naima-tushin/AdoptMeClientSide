
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '@/Hooks/useAuth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateDonationCampaign = () => {
    const [lastDateOfDonation, setLastDateOfDonation] = useState(new Date());

    const now = new Date();
    const { user } = useAuth();

    const [form, setForm] = useState({
        petImage: '',
        petName: '',
        maxDonationAmount: '',
        shortDescription: '',
        longDescription: '',
        ownerImage: user?.photoURL || "",
        ownerName: user?.displayName || "",
        ownerEmail: user?.email || "",
        creationDate: `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`,
        creationTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
        donatedAmount: '0',
        isPause: false,
    });
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');



    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };



    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(image_hosting_api, formData);
            const uploadedUrl = response.data.data.url;
            setForm({
                ...form,
                petImage: uploadedUrl
            });
            setUploadedImageUrl(uploadedUrl);
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (
            form.petImage !== '' &&
            form.petName !== '' &&
            form.maxDonationAmount !== '' &&
            form.shortDescription !== '' &&
            form.longDescription !== '' &&
            form.lastDateOfDonation !== ''
        ) {
            fetch('https://pet-adoption-server-side-two.vercel.app/addDonationCampaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    // Show success message
                    Swal.fire({
                        title: `Donation Campaign is Added`,
                        text: 'Donation Campaign Added Successfully',
                        icon: 'success',
                    });
    
                    setForm({
                        petImage: '',
                        petName: '',
                        maxDonationAmount: '',
                        shortDescription: '',
                        longDescription: '',
                        ownerImage: user?.photoURL || '',
                        ownerName: user?.displayName || '',
                        ownerEmail: user?.email || '',
                        lastDateOfDonation: new Date().toISOString(),
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    Swal.fire({
                        title: 'Failed to add donation campaign',
                        text: 'Please try again later.',
                        icon: 'error',
                    });
                });
        } else {
            Swal.fire({
                title: 'All fields are required',
                text: 'Please fill in all the required fields',
                icon: 'error',
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-4xl font-bold mb-6 text-center">Create Donation Campaign</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Pet Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full border-2 border-gray-300 p-2 rounded"
                    />
                    {uploadedImageUrl && (
                        <div className="mt-4">
                            <img src={uploadedImageUrl} alt="Uploaded Pet" className="w-full h-auto rounded" />
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Pet Name</label>
                    <input
                        type="text"
                        name="petName"
                        value={form.petName}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Maximum Donation Amount</label>
                    <input
                        type="number"
                        name="maxDonationAmount"
                        value={form.maxDonationAmount}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Last Date of Donation</label>
                    <DatePicker
                        selected={lastDateOfDonation}
                        onChange={(date) => setLastDateOfDonation(date)}
                        className="w-full border-2 border-gray-300 p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Short Description</label>
                    <input
                        type="text"
                        name="shortDescription"
                        value={form.shortDescription}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Long Description</label>
                    <textarea
                        name="longDescription"
                        value={form.longDescription}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-300 p-2 rounded h-32"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateDonationCampaign;
