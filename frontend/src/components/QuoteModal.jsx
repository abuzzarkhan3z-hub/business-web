import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Camera } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, defaultService = 'Sofa Upholstery' }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    area: 'Dubai',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 relative">
        {/* Header banner */}
        <div className="bg-[#4f789e] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
            Free In-Home Inspection
          </span>
          <h3 className="text-xl sm:text-2xl font-bold mt-1">Get Your Custom Quote</h3>
          <p className="text-xs text-blue-100 mt-1">
            Free fabric swatch catalog & on-site dimension measurement in UAE.
          </p>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-3">
            <CheckCircle2 size={54} className="text-emerald-500 mx-auto" />
            <h4 className="text-xl font-bold text-gray-900">Request Received!</h4>
            <p className="text-sm text-gray-600">
              Our master upholsterer will reach out via WhatsApp / Call at <span className="font-semibold text-gray-800">{formData.phone}</span> within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Tariq Al-Nuaimi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4f789e]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="+971 50 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4f789e]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">City / Emirate</label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f789e]"
                >
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Select Service</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f789e]"
              >
                <option value="Sofa Upholstery">Sofa Upholstery & Cushion Refill</option>
                <option value="Arabic Majlis">Traditional / Contemporary Arabic Majlis</option>
                <option value="Custom Furniture">Custom Bespoke Furniture Making</option>
                <option value="Bed Headboard">Custom Tufted Bed Headboard</option>
                <option value="Dining Chairs">Dining & Accent Chair Re-upholstery</option>
                <option value="Commercial Upholstery">Hotel & Office Fitout</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Project Details or Requirements</label>
              <textarea
                rows={2}
                placeholder="Dimensions, condition, or fabric preference (velvet, leather, linen)..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4f789e]"
              ></textarea>
            </div>

            <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-100 flex items-center gap-2 text-xs text-[#4f789e]">
              <Camera size={16} className="flex-shrink-0" />
              <span>You can also send your furniture photos directly via WhatsApp to +971502135026</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4f789e] hover:bg-[#3d6284] text-white py-3 rounded-lg text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Send size={15} />
              <span>Submit for Free Quote</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
