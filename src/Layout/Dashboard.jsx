import useAuth from '@/Hooks/useAuth';
import Navbar from '@/Pages/Shared/Navbar/Navbar';
import React from 'react';
import { FaDonate, FaHome, FaPlus, FaPlusSquare, FaReplyAll, FaUser } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { role } = useAuth();


  return (
    <div>
      <Navbar></Navbar>
      <div className='flex' style={{ paddingTop: '80px' }}>
        <div className="w-80 min-h-screen bg-slate-700">
          <ul className="menu p-4 uppercase text-white">
          {
            role == 'admin' ? <>
            <li>
              <NavLink 
                to="/Dashboard/AdminHome" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                <FaHome />
                Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/Users" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                <FaUser />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/AllPets" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                <FaReplyAll />
                All Pets
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/AllDonations" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                <FaDonate />
                All Donations
              </NavLink>
            </li>
            </>
            : null}
            <>
            <>
            {role == "user" ? (<li>
              <NavLink 
                to="/Dashboard/UserHome" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                <FaHome />
                User Home
              </NavLink>
            </li>): null}
            </>
            <li>
              <NavLink 
                to="/Dashboard/UserHome" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                <FaPlusSquare />
                User Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/AddPet" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                <FaPlusSquare />
                Add a Pet
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/MyAddedPets" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                <FaPlus />
                My Added Pets
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/AdoptionRequest" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                Adoption Request
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/CreateDonationCampaign" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                <FaDonate />
                Create Donation Campaign
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/MyDonationCampaigns" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                <FaDonate />
                My Donation Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Dashboard/MyDonations" 
                className={({ isActive }) => isActive ? 'text-white flex items-center gap-2' : 'text-gray-300 flex items-center gap-2'}
              >
                <FaDonate />
                My Donations
              </NavLink>
            </li>
            </>
          
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
