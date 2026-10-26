import React, { useState, useEffect } from 'react';
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
import AdminPanel from './components/admin/AdminPanel';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Sofa Upholstery');
  const [pageContent, setPageContent] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(
    () => window.location.hash === '#admin' || window.location.pathname === '/admin'
  );

  // Sync hash with admin screen
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminOpen(window.location.hash === '#admin' || window.location.pathname === '/admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Fetch dynamic page content from backend API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/content');
        if (response.ok) {
          const resData = await response.json();
          if (resData.success && resData.data) {
            setPageContent(resData.data);
          }
        }
      } catch (err) {
        // Fallback to default design smoothly if backend is offline
        console.log('Backend offline or connecting, using default UI data.');
      }
    };

    fetchContent();
  }, []);

  const handleOpenQuote = (serviceName) => {
    if (typeof serviceName === 'string') {
      setSelectedService(serviceName);
    }
    setIsModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsModalOpen(false);
  };

  const handleOpenAdmin = () => {
    window.location.hash = 'admin';
    setIsAdminOpen(true);
  };

  const handleCloseAdmin = () => {
    window.location.hash = '';
    setIsAdminOpen(false);
  };

  // If Admin panel is open, show full Admin studio
  if (isAdminOpen) {
    return (
      <AdminPanel
        onBack={handleCloseAdmin}
        onContentUpdated={(updated) => setPageContent(updated)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#4f789e] selection:text-white">
      {/* 1. Dark Top Bar with Admin Login Button */}
      <TopBar onOpenAdmin={handleOpenAdmin} />

      {/* 2. Main Navigation Bar */}
      <Navbar onOpenQuote={() => handleOpenQuote('General Inquiry')} />

      <main className="flex-grow">
        {/* 3. Hero Section (Controlled dynamically from Backend / Admin) */}
        <Hero
          content={pageContent?.hero}
          onContactClick={() => handleOpenQuote('Hero Contact')}
        />

        {/* 4. Overlapping 3 Promo Cards (Controlled dynamically from Backend / Admin) */}
        <PromoCards
          cards={pageContent?.promoCards}
          onCardClick={(title) => handleOpenQuote(title)}
        />

        {/* 5. Upholstery Services Carousel */}
        <UpholsteryServicesCarousel onOpenQuote={() => handleOpenQuote('Upholstery Services Carousel')} />

        {/* 6. Detailed Services Categories Grid */}
        <ServicesGrid onSelectService={(service) => handleOpenQuote(service)} />

        {/* 7. About Royal Furnishing (Controlled dynamically from Backend / Admin) */}
        <AboutSection
          content={pageContent?.about}
          onOpenQuote={() => handleOpenQuote('About Consultation')}
        />

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

      {/* 16. Footer with Admin Portal Link */}
      <Footer onOpenAdmin={handleOpenAdmin} />

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
