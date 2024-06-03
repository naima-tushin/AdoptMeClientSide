import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const HowItWorksSection = () => {
    return (
        <div className='w-[80%] mx-auto my-16 px-4 md:px-8 lg:px-16'>
        <h2 className="text-4xl font-bold text-center mb-8">Adoption Information & FAQs</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What's the adoption process like?</AccordionTrigger>
            <AccordionContent>
              Our adoption process is straightforward and designed to ensure the best match between you and your new furry friend. It includes filling out an application, meeting the pet, and completing a brief interview to ensure a suitable environment for the pet's well-being.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What are the requirements for adoption?</AccordionTrigger>
            <AccordionContent>
              We have some basic requirements to ensure that our pets are placed in loving and responsible homes. This typically includes being over 18 years old, providing proof of residence, and demonstrating a stable lifestyle that can accommodate the needs of a pet.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Do you provide support after adoption?</AccordionTrigger>
            <AccordionContent>
              Yes! We offer post-adoption support to help ensure a smooth transition for both you and your new pet. This may include guidance on training, behavior, and health care, as well as access to resources and community events.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
};

export default HowItWorksSection;
