import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import DonationCampaignsCard from '../DonationCampaignsCard/DonationCampaignsCard';
import Banner from '../../assets/images/DonationBanner.avif';

const DonationCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setIsLoading(true);
        fetch('/donationCampaigns.json')
            .then(response => response.json())
            .then(data => {
                // Sort campaigns by date in descending order
                const sortedCampaigns = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setCampaigns(sortedCampaigns);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            ) {
                // Load more campaigns when reaching the bottom of the page
                fetchData();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className=" mx-auto" style={{ paddingTop: '80px' }}>
            <Helmet>
                <title>Adopt Me | Donation Campaigns</title>
            </Helmet>
            <div className="relative mb-20">
                <img src={Banner} alt="Banner" className="w-full h-[570px] inset-0" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="text-center text-white p-8 bg-white bg-opacity-20 rounded-lg">
                        <h2 className="text-4xl font-bold mb-4">Support Our Cause</h2>
                        <p className="text-lg md:text-xl mb-4">Discover how you can make a difference in the lives of animals in need. Your donation can provide crucial support to our rescue efforts. Together, let's give these animals a chance for a better tomorrow!</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                            Learn More
                        </button>
                    </div>
                </div>
            </div> {/* Banner with image */}
            <div className="grid grid-cols-3 gap-10 w-[80%] mx-auto">
                {campaigns.map(campaign => (
                    <DonationCampaignsCard key={campaign.id} campaign={campaign} />
                ))}
            </div>
            {isLoading && <p className="text-center">Loading...</p>}
        </div>
    );
};

export default DonationCampaigns;
