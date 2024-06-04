import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import logo from '../../../assets/images/logo.png';
import profilePic from '../../../assets/images/profilePic.jpg';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="fixed z-10 w-full flex justify-center">
            <nav className="bg-black py-1 px-14 w-full flex justify-between items-center">
                <div>
                    <img src={logo} alt="Website Logo" className="h-20" />
                </div>
                <ul className="flex space-x-6 text-white">
                    <li><Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">Home</Link></li>
                    <li><Link to="/PetListing" className="hover:bg-gray-700 px-3 py-2 rounded">Pet Listing</Link></li>
                    <li><Link to="/DonationCampaigns" className="hover:bg-gray-700 px-3 py-2 rounded">Donation Campaigns</Link></li>
                    <li><a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Login/Register</a></li>
                </ul>
                <div className="relative">
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={profilePic} alt="Profile" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-48 bg-white rounded-md shadow-lg py-2">
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</a>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
