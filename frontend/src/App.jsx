import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromoCards from './components/PromoCards';
import UpholsteryServicesCarousel from './components/UpholsteryServicesCarousel';
import ServicesGrid from './components/ServicesGrid';
import AboutSection from './components/AboutSection';
import FabricSwatches from './components/FabricSwatches';
import FeaturedShowcase from './components/FeaturedShowcase';
import ProjectsGallery from './components/ProjectsGallery';
import CtaBanner from './components/CtaBanner';
import VelvetSofaFeature from './components/VelvetSofaFeature';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FaqAndQuote from './components/FaqAndQuote';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Sofa Upholstery');

  const handleOpenQuote = (serviceName) => {
    if (typeof serviceName === 'string') {
      setSelectedService(serviceName);
    }
    setIsModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#4f789e] selection:text-white">
      {/* 1. Dark Top Bar */}
      <TopBar />

      {/* 2. Main Navigation Bar */}
      <Navbar onOpenQuote={() => handleOpenQuote('General Inquiry')} />

      <main className="flex-grow">
        {/* 3. Hero Section */}
        <Hero onContactClick={() => handleOpenQuote('Hero Contact')} />

        {/* 4. Overlapping 3 Promo Cards */}
        <PromoCards onCardClick={(title) => handleOpenQuote(title)} />

        {/* 5. Upholstery Services Carousel */}
        <UpholsteryServicesCarousel onOpenQuote={() => handleOpenQuote('Upholstery Services Carousel')} />

        {/* 6. Detailed Services Categories Grid */}
        <ServicesGrid onSelectService={(service) => handleOpenQuote(service)} />

        {/* 7. About Royal Upholstery (Mustard Chair + Highlights) */}
        <AboutSection onOpenQuote={() => handleOpenQuote('About Consultation')} />

        {/* 8. Curated Fabric & Color Swatches */}
        <FabricSwatches onSelectFabric={(fabric) => handleOpenQuote(`Fabric: ${fabric}`)} />

        {/* 9. Featured Modern Wooden Table & Chair Banner */}
        <FeaturedShowcase onOpenQuote={() => handleOpenQuote('Modern Wooden Furniture')} />

        {/* 10. Portfolio Projects Gallery */}
        <ProjectsGallery onOpenQuote={() => handleOpenQuote('Portfolio Project Inquiry')} />

        {/* 11. Quick Yellow & Blue CTA Banner */}
        <CtaBanner onOpenQuote={() => handleOpenQuote('Quick Banner Call')} />

        {/* 12. Featured Magenta Velvet Sofa Section */}
        <VelvetSofaFeature onOpenQuote={() => handleOpenQuote('Custom Velvet Sofa')} />

        {/* 13. Why Choose Us (Workshop Photo + Royal Standard) */}
        <WhyChooseUs onOpenQuote={() => handleOpenQuote('Free In-Home Inspection')} />

        {/* 14. Customer Testimonials */}
        <Testimonials />

        {/* 15. FAQ & Instant Quote Form */}
        <FaqAndQuote preselectedService={selectedService} />
      </main>

      {/* 16. Footer */}
      <Footer />

      {/* 17. Interactive Quote Request Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={handleCloseQuote}
        defaultService={selectedService}
      />
    </div>
  );
}

export default App;
