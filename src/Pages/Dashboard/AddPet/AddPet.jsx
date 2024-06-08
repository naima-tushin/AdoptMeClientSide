import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '@/Hooks/useAuth';

const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'fish', label: 'Fish' },
    // add more categories as needed
];
  

const AddPet = () => {

    const { user } = useAuth();

    const [form, setForm] = useState({
        petImage: '',
        petName: '',
        petAge: '',
        petCategory: '',
        petLocation: '',
        shortDescription: '',
        longDescription: '',
        ownerImage: user?.photoURL || "",
        ownerName: user?.displayName || "",
        ownerEmail: user?.email || "",
        creationDate: '',
        creationTime: '',
        adopted: false,
    });
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    const getCurrentDateTime = () => {
        const now = new Date();
        const creationDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const creationTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        return { creationDate, creationTime };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleCategoryChange = (selectedOption) => {
        setForm({
            ...form,
            petCategory: selectedOption.value
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=af0bb17dfe6a251ff3d14c09e0d68baa`, formData);
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
        const { creationDate: creationDate, creationTime: creationTime } = getCurrentDateTime();
        setForm({
            ...form,
            creationDate: creationDate,
            currentTime: creationTime
        });
        console.log(form);
        console.log(form.petImage);
        if (form.petImage !== '' && form.petName !== '' && form.petAge !== '' && form.petCategory !== '' && form.shortDescription !== '' && form.longDescription !== '') {
            console.log(form);
            fetch('http://localhost:5000/addPet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    // Show success message
                    Swal.fire({
                        title: `${form.petName} is Added`,
                        text: "Food Added Successfully",
                        icon: "success",
                    });

                    setForm({
                        petImage: '',
                        petName: '',
                        petAge: '',
                        petCategory: '',
                        petLocation: '',
                        shortDescription: '',
                        longDescription: '',
                        ownerImage: user?.photoURL || "",
                        ownerName: user?.displayName || "",
                        ownerEmail: user?.email || "",
                    });

                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        title: `Failed to add food`,
                        text: "Please try again later.",
                        icon: "error",
                    });
                });
        } else {
            Swal.fire({
                title: `All fields are required`,
                text: "Please fill in all the required fields",
                icon: "error",
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg" style={{ paddingTop: '80px' }}>
            <h2 className="text-4xl font-bold mb-6 text-center">Add a Pet</h2>
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
                    <label className="block text-gray-700 font-semibold mb-2">Pet Age</label>
                    <input
                        type="number"
                        name="petAge"
                        value={form.petAge}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Pet Category</label>
                    <Select
                        options={petCategories}
                        onChange={handleCategoryChange}
                        className="w-full border-2 border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Pet Location</label>
                    <input
                        type="text"
                        name="petLocation"
                        value={form.petLocation}
                        onChange={handleChange}
                        required
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

export default AddPet;
