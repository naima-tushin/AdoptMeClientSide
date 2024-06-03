import React from 'react';
import { Button } from "@/components/ui/button"
import cat from '../../assets/images/banner1.jpg';
import dog from '../../assets/images/banner4.jpg';
import rabbit from '../../assets/images/banner2.jpg';
import bird from '../../assets/images/banner3.jpg';

const pets = [
    { name: 'Cats', image: cat, link: '/categories/cats' },
    { name: 'Dogs', image: dog, link: '/categories/dogs' },
    { name: 'Rabbits', image: rabbit, link: '/categories/rabbits' },
    { name: 'Fish', image: bird, link: '/categories/fish' },
    // Add more pet categories as needed
  ];

const PetsCategorySection = () => {
    return (
        <div className="pets-category-section text-center my-12">
      <h2 className="text-3xl font-bold mb-8">Explore Our Pets</h2>
      <div className="pets-categories flex justify-center flex-wrap gap-6">
        {pets.map((pet) => (
          <div
            key={pet.name}
            className="pet-card bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-40 transition-transform transform hover:scale-105"
          >
            <img src={pet.image} alt={pet.name} className="w-full h-auto" />
            <Button variant="link" className="block p-2 text-gray-800 font-bold" href={pet.link}>
              {pet.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
    );
};

export default PetsCategorySection;