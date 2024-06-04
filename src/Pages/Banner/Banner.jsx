import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img from '../../assets/images/banner1.jpg';
import img1 from '../../assets/images/banner2.jpg';
import img2 from '../../assets/images/banner3.jpg';
import img3 from '../../assets/images/banner4.jpg';

const banners = [
  { 
    src: img3, 
    title: 'Adopt a Dog', 
    description: 'Find your new best friend. Dogs are known for their loyalty, companionship, and love. They are wonderful companions for people of all ages.' 
  },
  { 
    src: img, 
    title: 'Adopt a Cat', 
    description: 'Cats are great companions. They are independent yet loving creatures. Cats are known for their playful nature, graceful movements, and calming presence.' 
  },
  { 
    src: img2, 
    title: 'Adopt a Bird', 
    description: 'Bring some chirp into your life. Birds make wonderful pets and can bring a lot of joy with their beautiful songs and colorful plumage.' 
  },
  { 
    src: img1, 
    title: 'Adopt a Rabbit', 
    description: 'Rabbits make lovely pets. They are gentle, intelligent, and sociable animals. Rabbits are known for their playful personalities, soft fur, and expressive ears.' 
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Carousel 
      className="w-full" 
      showThumbs={false} 
      infiniteLoop 
      selectedItem={currentIndex}
      onChange={handleChange}
      showStatus={false}
      autoPlay={false}
    >
      {banners.map((banner, index) => (
        <div key={index} className="relative h-[650px]" style={{ paddingTop: '80px' }}>
          <img src={banner.src} className="w-full h-full object-cover" alt={`Banner ${index + 1}`} />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="text-center text-white p-8 bg-black bg-opacity-20 rounded-lg">
              <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
              <p className="mb-4">{banner.description}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                Learn More
              </button>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
