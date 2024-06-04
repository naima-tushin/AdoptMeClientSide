import React from 'react';
import { Link } from 'react-router-dom';

const PetListingCard = ({pet}) => {
    return (
        <div className="bg-white p-4 shadow-md rounded-md">
        <img src={pet.image} alt={pet.name} className="w-full h-32 object-cover mb-4 rounded-md" />
        <h2 className="text-lg font-semibold mb-2">{pet.name}</h2>
        <p className="text-sm text-gray-500 mb-2">Age: {pet.age}</p>
        <p className="text-sm text-gray-500 mb-4">Location: {pet.location}</p>
       <Link to={`/PetDetails/${pet._id}`}>
       <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">View Details</button>
       </Link>
      </div>
    );
};

export default PetListingCard;