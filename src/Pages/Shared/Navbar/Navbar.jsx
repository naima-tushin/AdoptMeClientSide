import React, { useContext } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import useAuth from '@/Hooks/useAuth';
import { FaDonate, FaHome, FaList } from 'react-icons/fa';

const Navbar = () => {
    const { logout, user } = useAuth();

    return (
        <div className="fixed z-10 w-full flex justify-center">
            <nav className="bg-black py-1 px-14 w-full flex justify-between items-center">
                <div>
                    <img src={logo} alt="Website Logo" className="h-20" />
                </div>
                <ul className="flex space-x-6 text-white">
                    <li className='flex items-center'><FaHome></FaHome><Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">Home</Link></li>
                    <li className='flex items-center'><FaList></FaList><Link to="/PetListing" className="hover:bg-gray-700 px-3 py-2 rounded">Pet Listing</Link></li>
                    <li className='flex items-center'><FaDonate></FaDonate><Link to="/DonationCampaigns" className="hover:bg-gray-700 px-3 py-2 rounded">Donation Campaigns</Link></li>
                </ul>
                <div className="flex-none gap-2">
                    {user?.email ? (
                        <div className="relative">
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <button className="cursor-pointer focus:outline-none">
                                        <Avatar>
                                            <AvatarImage src={user?.photoURL || "https://i.ibb.co/BV0NHW2/pics.jpg"} alt={user?.displayName || 'Not found'} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    </button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-48 bg-white rounded-md shadow-lg py-2">
                                    <span className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>{user?.displayName}</span>
                                    <Link to="/Dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</Link>
                                    <button onClick={logout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    ) : (
                        <div className="flex gap-2 mr-8">
                            <Link to="/login" className="form-control">
                                <button className="btn bg-black hover:bg-secondary hover:text-black text-accent border-2 border-secondary hover:border-2 hover:border-black ml-24 lg:ml-[10px] md:ml-80 px-2">LOGIN/REGISTER</button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
