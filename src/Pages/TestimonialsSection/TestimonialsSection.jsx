import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const TestimonialsSection = () => {
    const [testimonialsData, setTestimonialsData] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('/reviews.json');
                const data = await response.json();
                setTestimonialsData(data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <div className="testimonials-section my-16 px-4 md:px-8 lg:px-16">
            <h2 className="text-4xl font-bold text-center mb-8">Testimonials</h2>
            <Carousel className="w-full max-w-[80%] mx-auto">
                <CarouselContent className="w-full max-w-screen">
                    {testimonialsData.map((testimonial, index) => (
                        <CarouselItem key={index} className="flex justify-center">
                            <Card className="w-full h-full flex flex-col items-center justify-center p-6">
                                <img src={testimonial.image} alt={`${testimonial.name}'s feedback`} className="h-16 w-16 rounded-full mb-4 object-cover" />
                                <p className="text-lg font-semibold">{testimonial.name}</p>
                                <div className="flex justify-center items-center mt-1">
                                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                                        <svg key={index} className="h-5 w-5 text-yellow-500 fill-current mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .673.418l1.882 3.815 4.21.614a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L10 14.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.719-4.192L.819 8.126a.75.75 0 0 1 .416-1.279l4.21-.614L9.327 2.418A.75.75 0 0 1 10 2zm0 2.445L8.615 6.194a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.457a.75.75 0 0 1 .698 0l2.769 1.457-.528-3.084a.75.75 0 0 1 .216-.664l2.24-2.184-3.097-.45a.75.75 0 0 1-.564-.41L10 4.445v.001z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-center mt-2">{testimonial.feedback}</p>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-gray-700 hover:text-gray-900" />
                <CarouselNext className="text-gray-700 hover:text-gray-900" />
            </Carousel>
        </div>
    );
};

export default TestimonialsSection;
