import React from 'react';
import { Button } from "@/components/ui/button";
import inspirationImage1 from '../../assets/images/inspirationalImage1.jpg';
import inspirationImage2 from '../../assets/images/inspirationalImage2.jpg';

const CallToActionSection = () => {
    return (
        <div className="cta-section bg-gray-100 py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Adopt a Pet, Give Them a Better Life</h2>
                <p className="text-lg text-gray-600 mb-8 mx-auto max-w-2xl">
                    Every pet deserves a loving home. By adopting, you not only give a pet a better life, but you also enrich your own. 
                    Join us in making a difference.
                </p>
                <div className="cta-images flex justify-center gap-4 mb-12">
                    <img src={inspirationImage1} alt="Inspirational" className="w-1/3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
                    <img src={inspirationImage2} alt="Inspirational" className="w-1/3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md transform hover:scale-105 transition-transform duration-300" href="/adopt">
                    Adopt Now
                </Button>
            </div>
        </div>
    );
};

export default CallToActionSection;
