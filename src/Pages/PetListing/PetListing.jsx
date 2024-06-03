import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import PetListingCard from '../PetListingCard/PetListingCard';
import BannerImage1 from '../../assets/images/petListingBannerImg.jpg';

const PetListing = () => {
    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch pets data from API or local storage
        // For now, let's assume petsData is fetched from somewhere
        const petsData = [
                { id: 1, name: 'Buddy', age: 2, location: 'New York', category: 'Dog', image: 'https://i.ibb.co/P468Ghq/dog.jpg' },
                { id: 2, name: 'Max', age: 3, location: 'Chicago', category: 'Dog', image: 'https://i.ibb.co/94C3b1B/cats.jpg' },
                { id: 3, name: 'Whiskers', age: 4, location: 'Los Angeles', category: 'Cat', image: 'https://i.ibb.co/VCdZ9qp/birds.webp' },
                { id: 4, name: 'Fluffy', age: 1, location: 'Houston', category: 'Cat', image: 'https://i.ibb.co/WvqwpWD/tiger.jpg' },
                { id: 5, name: 'Rocky', age: 5, location: 'Miami', category: 'Dog', image: 'https://i.ibb.co/YhDTCh7/rabbits.jpg' },
        ];
        setPets(petsData);
        setFilteredPets(petsData);
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        filterPets(query, selectedCategory);
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        filterPets(searchQuery, category);
    };

    const filterPets = (query, category) => {
        const filtered = pets.filter(pet =>
            pet.name.toLowerCase().includes(query) &&
            (category === 'All' || pet.category === category)
        );
        setFilteredPets(filtered);
    };

    return (
        <div className="App">
            <Helmet>
                <title>Adopt Me | Pet Listing</title>
            </Helmet>
            <div className="relative w-full">
                {/* Banner Image */}
                <img src={BannerImage1} alt="Banner 1" className="w-full h-[650px] object-cover" />
                {/* Title and Description overlaid */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="text-center text-white p-8 bg-black bg-opacity-60 rounded-lg">
                        <h2 className="text-4xl font-bold mb-4">Available Pets</h2>
                        <p className="text-lg md:text-xl mb-4">Explore our selection of adorable pets waiting for loving homes. From playful pups to cuddly kittens, find your perfect companion today!</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto my-8">
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search pets by name..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    />
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    >
                        <option value="All">All</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        {/* Add more categories if needed */}
                    </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {filteredPets.map(pet => (
                        <PetListingCard key={pet.id} pet={pet} />
                    ))}
                </div>
                {isLoading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default PetListing;
