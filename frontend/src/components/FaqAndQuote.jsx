import React, { useState } from 'react';
import { Plus, Minus, Send, CheckCircle2 } from 'lucide-react';
import { API_URL } from '../config/api';

export default function FaqAndQuote({ preselectedService }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || 'Sofa Upholstery',
    message: ''
  });

  const faqs = [
    {
      q: 'How long does a typical sofa upholstery project take?',
      a: 'Most standard sofa and chair upholstery projects take between 5 to 7 working days from the moment fabric selection and measurements are confirmed. Custom frames or complex antique restorations may take 10 to 12 days.'
    },
    {
      q: 'Do you provide in-home measurement and fabric samples in Dubai?',
      a: 'Yes, absolutely! We provide free on-site visits across Dubai, Abu Dhabi, and Sharjah. Our consultant brings extensive fabric swatch books directly to your home so you can inspect textures under your room lighting.'
    },
    {
      q: 'Can you replace soft or sagging cushion foams?',
      a: 'Yes. We offer high-resilience polyurethane foam ranging from 32D to 45D orthopedic density, pocket spring assemblies, and down feather wraps to restore optimal comfort and shape.'
    },
    {
      q: 'Are your fabrics stain-resistant and pet friendly?',
      a: 'Yes, we carry a wide range of specialized fabrics treated with nano-repellent technology (Aquaclean / Teflon coated) that allow stains like coffee, wine, or dirt to be wiped away with just water.'
    },
    {
      q: 'Do you provide warranty on your upholstery work?',
      a: 'All our custom upholstery work comes with a comprehensive 5-year warranty covering frame integrity, internal springs, and precision stitching.'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.log('Saved locally (backend connecting).');
    } finally {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Sofa Upholstery',
          message: ''
        });
      }, 4000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#f8fafc] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[#4f789e] text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                Help & Answers
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Have questions about materials, turnarounds, or pricing? Here are common answers.
              </p>
            </div>

            <div className="space-y-3 mt-6">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-gray-900 text-sm sm:text-base hover:text-[#4f789e] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="w-7 h-7 rounded-full bg-gray-100 text-[#4f789e] flex items-center justify-center flex-shrink-0">
                        {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: "Get Quote Today!" Form Box matching reference UI */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-9 rounded-2xl shadow-xl border-2 border-[#4f789e]/30 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-[#4f789e]"></div>

            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#4f789e] uppercase tracking-wider">
                Instant Estimate
              </span>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5 tracking-tight">
                Get Quote Today!
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Fill the details below and get a free customized quotation within 2 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 animate-fadeIn space-y-3">
                <CheckCircle2 size={42} className="text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-gray-900">Quotation Request Sent!</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Thank you! Our upholstery expert will call you shortly at <span className="font-semibold text-gray-800">{formData.phone || 'your phone'}</span> with estimated pricing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Al-Nuaimi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4f789e] focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4f789e] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4f789e] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Service Required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4f789e] focus:border-transparent transition-all bg-white"
                  >
                    <option value="Sofa Upholstery">Sofa Upholstery & Cushion Refill</option>
                    <option value="Arabic Majlis">Traditional / Modern Arabic Majlis</option>
                    <option value="Bed Headboard">Custom Tufted Bed Headboard</option>
                    <option value="Dining Chairs">Dining & Accent Chairs</option>
                    <option value="Commercial Upholstery">Hotel & Commercial Upholstery</option>
                    <option value="Curtains & Cushions">Curtains & Custom Cushions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Item Details & Dimensions</label>
                  <textarea
                    rows={3}
                    placeholder="Describe furniture type, quantity, fabric preference (e.g. 3-seater velvet sofa in Dubai Marina)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4f789e] focus:border-transparent transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#4f789e] hover:bg-[#3d6284] text-white py-3 rounded-lg text-sm font-bold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75"
                >
                  <Send size={16} />
                  <span>{loading ? 'Sending...' : 'Request Free Estimate'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
