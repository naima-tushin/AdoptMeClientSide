import AboutUsSection from "../AboutUsSection/AboutUsSection";
import Banner from "../Banner/Banner";
import CallToActionSection from "../CallToActionSection/CallToActionSection";
import HowItWorksSection from "../HowItWorksSection/HowItWorksSection";
import PetsCategorySection from "../PetsCategorySection/PetsCategorySection";
import TestimonialsSection from "../TestimonialsSection/TestimonialsSection";
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Adopt Me | Home</title>
            </Helmet>
           <Banner></Banner>
           <PetsCategorySection></PetsCategorySection>
           <CallToActionSection></CallToActionSection>
           <AboutUsSection></AboutUsSection>
           <TestimonialsSection></TestimonialsSection>
           <HowItWorksSection></HowItWorksSection>
        </div>
    );
};

export default Home;