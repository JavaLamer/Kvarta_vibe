import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { Subscription } from './components/Subscription';
import { HowItWorks } from './components/HowItWorks';
import { Delivery } from './components/Delivery';
import { LeadForm } from './components/LeadForm';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { Product, InterestType } from './types';
import { getOrCaptureUtmParams } from './lib/utm';

export default function App() {
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [selectedProductForForm, setSelectedProductForForm] = useState<string | null>(null);
  const [formInterest, setFormInterest] = useState<InterestType>('one_time');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Capture UTM parameters on initial page load
  useEffect(() => {
    getOrCaptureUtmParams();
  }, []);

  const scrollToLeadForm = () => {
    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCoffeeFromHero = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribeFromHero = () => {
    setFormInterest('subscription');
    setSelectedProductForForm('Подписка на кофе (2 пачки)');
    scrollToLeadForm();
  };

  const handleSelectProductForOrder = (product: Product) => {
    setSelectedProductForModal(null);
    setSelectedProductForForm(product.name);
    setFormInterest(product.isDrip ? 'one_time' : 'one_time');
    setTimeout(() => {
      scrollToLeadForm();
    }, 100);
  };

  const handleSubscriptionClick = () => {
    setFormInterest('subscription');
    setSelectedProductForForm('Регулярная кофейная подписка (54 BYN)');
    scrollToLeadForm();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#261C18] selection:bg-[#C35B34]/20 selection:text-[#261C18]">
      {/* Pinned Top Bar */}
      <Header onOrderClick={scrollToLeadForm} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Block 1: Hero */}
        <Hero
          onSelectCoffee={handleSelectCoffeeFromHero}
          onSubscribe={handleSubscribeFromHero}
        />

        {/* Block 3: About Founders & 5kg Small Batch Craft */}
        <About />

        {/* Block 4: Product Catalog (3 Grain + Drip Bags + Quick Sub) */}
        <ProductCatalog
          onProductClick={(product) => setSelectedProductForModal(product)}
          onSelectSubscription={handleSubscriptionClick}
        />

        {/* Block 5: Subscription Feature Block */}
        <Subscription onSubscribeClick={handleSubscriptionClick} />

        {/* Block 6: How It Works & Weekly Schedule */}
        <HowItWorks />

        {/* Block 7: Delivery & Pickup on Korolya 9 */}
        <Delivery />

        {/* Block 8: Interactive Lead Form */}
        <LeadForm
          initialInterest={formInterest}
          selectedProduct={selectedProductForForm}
          onClearProduct={() => setSelectedProductForForm(null)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />
      </main>

      {/* Block 9: Contacts & Footer */}
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* Accessible Product Modal */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onSelectForOrder={handleSelectProductForOrder}
      />

      {/* Draft Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
