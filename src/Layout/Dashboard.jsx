import Navbar from '@/Pages/Shared/Navbar/Navbar';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {

  return (
    <div>
      <Navbar></Navbar>
      <div className='flex' style={{ paddingTop: '80px' }}>
        <div className="w-64 min-h-screen bg-slate-700">
          <ul className="menu p-4 uppercase text-white">
            <li>
              <NavLink 
                to="/Dashboard/AddPet" 
                className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}
              >
                Add a Pet
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/MyAddedPets" 
                className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}
              >
                My Added Pets
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/AdoptionRequest" 
                className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}
              >
                Adoption Request
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/CreateDonationCampaign" 
                className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}
              >
                Create Donation Campaign
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/MyDonationCampaigns" 
                className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}
              >
                My Donation Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/MyDonations" 
                className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300'}
              >
                My Donations
              </NavLink>
            </li>
          
          </ul>
        </div>
        <div className='flex-1'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
