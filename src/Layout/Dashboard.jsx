import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='flex'>
      <div className="w-64 min-h-screen bg-slate-700">
        <ul className="menu p-4">
          <li><NavLink to="/Dashboard/AddPet">Add a Pet</NavLink></li>
          <li><NavLink to="/Dashboard/AddedPets">My Added Pets</NavLink></li>
          <li><NavLink to="/Dashboard/AdoptionRequest">Adoption Request</NavLink></li>
          <li><NavLink to="/Dashboard/CreateDonationCampaign">Create Donation Campaign</NavLink></li>
          <li><NavLink to="/Dashboard/MyDonationCampaigns">My Donation Campaigns</NavLink></li>
          <li><NavLink to="/Dashboard/Donations">My Donations</NavLink></li>
        </ul>
      </div>
      <div className='flex-1'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;