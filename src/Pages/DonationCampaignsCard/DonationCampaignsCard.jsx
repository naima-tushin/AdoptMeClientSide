import React from 'react';
import { Link } from 'react-router-dom';

const DonationCampaignsCard = ({ campaign }) => {
  return (
    <div className="rounded shadow-lg">
      <img className="w-full h-[130px]" src={campaign.image} alt={campaign.petName} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{campaign.petName}</div>
        <p className="text-gray-700 text-base mb-2">Max Donation: ${campaign.maxDonationAmount}</p>
        <p className="text-gray-700 text-base mb-2">Donated: ${campaign.donatedAmount}</p>
        <Link to={`/DonationDetails/${campaign.id}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View Details
        </button>
        </Link>
      </div>
    </div>
  );
};

export default DonationCampaignsCard;
