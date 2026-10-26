import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Layers,
  Tag,
  FileText,
  Mail,
  Lock,
  Key,
  LogOut,
  Check,
  Save,
  Plus,
  Trash2,
  ArrowLeft,
  Eye,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Clock,
  Phone,
  User,
  Upload
} from 'lucide-react';
import { API_URL } from '../../config/api';

const API_BASE = API_URL;

export default function AdminPanel({ onBack, onContentUpdated }) {
  // Auth state
  const [token, setToken] = useState(() => localStorage.getItem('royal_admin_token') || '');
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('royal_admin_user') || 'null');
    } catch {
      return null;
    }
  });

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active tab state
  const [activeTab, setActiveTab] = useState('hero');

  // Content form state
  const [content, setContent] = useState(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Inquiries state
  const [inquiries, setInquiries] = useState([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);

  // Admin profile update form state
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Image upload state
  const [isUploading, setIsUploading] = useState(false);

  // New service modal/state
  const [newService, setNewService] = useState({ title: '', image: '' });

  // Toast auto-clear
  useEffect(() => {
    if (statusMessage.text) {
      const timer = setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Load Content
  const fetchContent = async () => {
    setIsLoadingContent(true);
    try {
      const res = await fetch(`${API_BASE}/content`);
      const data = await res.json();
      if (data.success && data.data) {
        setContent(data.data);
      }
    } catch (err) {
      console.error('Failed to load content', err);
      setStatusMessage({ type: 'error', text: 'Could not fetch content from backend.' });
    } finally {
      setIsLoadingContent(false);
    }
  };

  // Load Inquiries
  const fetchInquiries = async () => {
    if (!token) return;
    setIsLoadingInquiries(true);
    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error('Failed to load inquiries', err);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchContent();
      fetchInquiries();
      if (currentUser) {
        setProfileName(currentUser.name || 'Royal Furnishing Admin');
        setProfileEmail(currentUser.email || 'admin@royalfurnishing.ae');
      }
    }
  }, [token]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid email or password');
      }

      localStorage.setItem('royal_admin_token', data.token);
      localStorage.setItem('royal_admin_user', JSON.stringify(data.user));
      setToken(data.token);
      setCurrentUser(data.user);
      setProfileName(data.user.name);
      setProfileEmail(data.user.email);
      setStatusMessage({ type: 'success', text: `Welcome back, ${data.user.name || 'Admin'}!` });
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('royal_admin_token');
    localStorage.removeItem('royal_admin_user');
    setToken('');
    setCurrentUser(null);
  };

  // Quick prefill demo login
  const handleDemoFill = () => {
    setLoginEmail('admin@royalfurnishing.ae');
    setLoginPassword('admin123');
  };

  // Save Content to Backend
  const handleSaveContent = async () => {
    if (!token || !content) return;
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update content');
      }

      setContent(data.data);
      if (onContentUpdated) onContentUpdated(data.data);
      setStatusMessage({ type: 'success', text: '✅ Changes saved to MongoDB Atlas & Live Website updated!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Image Upload Helper
  const handleFileUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true);
    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        callback(data.url);
        setStatusMessage({ type: 'success', text: 'Image uploaded successfully!' });
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: `Upload error: ${err.message}` });
    } finally {
      setIsUploading(false);
    }
  };

  // Update Admin Profile / Password
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    setIsSavingProfile(true);
    try {
      const payload = {
        name: profileName,
        email: profileEmail
      };
      if (newPassword) payload.password = newPassword;

      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update credentials');
      }

      localStorage.setItem('royal_admin_user', JSON.stringify(data.user));
      setCurrentUser(data.user);
      setNewPassword('');
      setConfirmPassword('');
      setStatusMessage({ type: 'success', text: '🔐 Admin credentials updated successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Inquiry Status Update
  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(inquiries.map((inq) => (inq._id === id ? { ...inq, status } : inq)));
        setStatusMessage({ type: 'success', text: 'Inquiry status updated' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to update status' });
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer inquiry?')) return;
    try {
      const res = await fetch(`${API_BASE}/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(inquiries.filter((inq) => inq._id !== id));
        setStatusMessage({ type: 'success', text: 'Inquiry deleted' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to delete inquiry' });
    }
  };

  // ----------------------------------------------------
  // LOGIN SCREEN (If Not Authenticated)
  // ----------------------------------------------------
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#0f172a] flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 bg-[#4f789e] text-white rounded-xl flex items-center justify-center shadow-lg">
              <Lock size={26} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4f789e]">
              ROYAL FURNISHING
            </span>
            <h2 className="text-2xl font-black text-gray-900 mt-1">Admin Panel Login</h2>
            <p className="text-xs text-gray-500 mt-1">
              Sign in with your admin credentials to manage UI collections.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@royalfurnishing.ae"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#4f789e] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Key size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#4f789e] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#4f789e] hover:bg-[#3d6283] text-white py-3 rounded-lg font-bold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Login to Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="mt-6 pt-5 border-t border-gray-100 bg-blue-50/60 p-3.5 rounded-xl text-center">
            <p className="text-[11px] text-gray-600 font-medium">
              Default Credentials (Seeded into MongoDB):
            </p>
            <div className="text-xs font-mono text-gray-800 mt-1 select-all">
              <strong>Email:</strong> admin@royalfurnishing.ae <br />
              <strong>Password:</strong> admin123
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              className="mt-2 text-xs font-bold text-[#4f789e] hover:underline"
            >
              Click here to Auto-Fill Credentials
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onBack}
              className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1.5 mx-auto transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Royal Furnishing Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ADMIN DASHBOARD (Authenticated)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-[#1e293b] text-white sticky top-0 z-40 border-b border-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#4f789e] flex items-center justify-center font-bold text-white shadow">
              RF
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] font-semibold text-blue-200 block leading-tight">
                STUDIO ADMIN
              </span>
              <h1 className="text-base font-bold tracking-tight text-white leading-none">
                Royal Furnishing Control Panel
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
              <User size={13} className="text-[#f5b027]" />
              <span>{currentUser?.email || 'admin@royalfurnishing.ae'}</span>
            </div>

            <button
              onClick={onBack}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3.5 py-1.5 rounded-lg transition-colors"
              title="Preview Live Website"
            >
              <Eye size={14} />
              <span className="hidden md:inline">View Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs px-3.5 py-1.5 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={14} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-grow w-full">
        {/* Toast Status Notice */}
        {statusMessage.text && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center justify-between shadow-md transition-all ${
              statusMessage.type === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {statusMessage.type === 'error' ? (
                <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
              ) : (
                <Check size={18} className="text-emerald-600 flex-shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage({ type: '', text: '' })}
              className="text-xs hover:opacity-70 ml-4 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Dashboard Tabs Bar */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 mb-8">
          {[
            { id: 'hero', label: 'Hero Banner', icon: ImageIcon },
            { id: 'promos', label: 'Promo Cards (3)', icon: Tag },
            { id: 'services', label: 'Services Grid', icon: Layers },
            { id: 'about', label: 'About Us', icon: FileText },
            {
              id: 'inquiries',
              label: `Customer Quotes (${inquiries.length})`,
              icon: Mail
            },
            { id: 'security', label: 'Email & Password', icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#4f789e] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Hero Banner Configuration</h3>
                <p className="text-xs text-gray-500">
                  Update main landing headline, subtitle, description, and hero sofa image.
                </p>
              </div>
              <button
                onClick={handleSaveContent}
                disabled={isSaving}
                className="bg-[#4f789e] hover:bg-[#3d6283] text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow transition-all disabled:opacity-50"
              >
                {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                <span>Save Hero Changes</span>
              </button>
            </div>

            {isLoadingContent ? (
              <div className="py-12 text-center text-gray-400">Loading hero data...</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form fields */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Main Headline (Line 1)
                    </label>
                    <input
                      type="text"
                      value={content?.hero?.title || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, title: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Headline Subtitle / Brand (Line 2)
                    </label>
                    <input
                      type="text"
                      value={content?.hero?.subtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, subtitle: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Description Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={content?.hero?.description || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, description: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={content?.hero?.buttonText || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: { ...content.hero, buttonText: e.target.value }
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Upload Image File
                      </label>
                      <label className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold cursor-pointer border border-dashed border-gray-300 transition-colors">
                        <Upload size={14} />
                        <span>{isUploading ? 'Uploading...' : 'Choose File to Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (url) =>
                              setContent({
                                ...content,
                                hero: { ...content.hero, imageUrl: url }
                              })
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Hero Image URL (or pasted link)
                    </label>
                    <input
                      type="text"
                      value={content?.hero?.imageUrl || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, imageUrl: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Live Preview */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#51799c] to-[#3a5874] p-6 rounded-xl text-white shadow-inner flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded text-white font-bold">
                      LIVE PREVIEW
                    </span>
                    <h4 className="text-xl font-bold mt-3 leading-snug">
                      {content?.hero?.title || 'Transform Your Furniture'}{' '}
                      <span className="block font-black text-amber-300">
                        {content?.hero?.subtitle || 'with Royal Furnishing'}
                      </span>
                    </h4>
                    <p className="text-xs text-blue-100/90 mt-2 line-clamp-3 leading-relaxed">
                      {content?.hero?.description}
                    </p>
                    <button className="mt-4 bg-white text-[#456b8c] text-xs font-bold px-4 py-2 rounded shadow">
                      {content?.hero?.buttonText || 'Contact Us'}
                    </button>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/20">
                    <p className="text-[11px] text-blue-200 mb-2 font-medium">Hero Image Preview:</p>
                    <div className="h-44 w-full rounded-lg overflow-hidden bg-black/20 border border-white/20">
                      <img
                        src={content?.hero?.imageUrl}
                        alt="Hero Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROMO CARDS */}
        {activeTab === 'promos' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Promotional Cards (3 Collections)</h3>
                <p className="text-xs text-gray-500">
                  Manage the 3 banner showcase cards beneath the Hero section.
                </p>
              </div>
              <button
                onClick={handleSaveContent}
                disabled={isSaving}
                className="bg-[#4f789e] hover:bg-[#3d6283] text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow transition-all"
              >
                {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                <span>Save Promo Cards</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(content?.promoCards || []).map((card, idx) => (
                <div
                  key={card.id || idx}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500">Card #{idx + 1}</span>
                    <span className="text-[10px] bg-blue-100 text-[#4f789e] px-2 py-0.5 rounded font-bold">
                      Collection {idx + 1}
                    </span>
                  </div>

                  <div className="h-32 w-full rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={card.title || ''}
                      onChange={(e) => {
                        const updated = [...content.promoCards];
                        updated[idx].title = e.target.value;
                        setContent({ ...content, promoCards: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-xs text-gray-900 font-bold focus:border-[#4f789e] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. sale up to"
                        value={card.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...content.promoCards];
                          updated[idx].subtitle = e.target.value;
                          setContent({ ...content, promoCards: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-xs text-gray-900 focus:border-[#4f789e] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                        Discount / Badge
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 50% off"
                        value={card.discount || ''}
                        onChange={(e) => {
                          const updated = [...content.promoCards];
                          updated[idx].discount = e.target.value;
                          setContent({ ...content, promoCards: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-xs text-gray-900 focus:border-[#4f789e] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={card.image || ''}
                      onChange={(e) => {
                        const updated = [...content.promoCards];
                        updated[idx].image = e.target.value;
                        setContent({ ...content, promoCards: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-[11px] font-mono text-gray-800 focus:border-[#4f789e] focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Services Catalog</h3>
                <p className="text-xs text-gray-500">
                  Manage upholstery and furnishing services showcased across the website.
                </p>
              </div>
              <button
                onClick={handleSaveContent}
                disabled={isSaving}
                className="bg-[#4f789e] hover:bg-[#3d6283] text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow transition-all"
              >
                {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                <span>Save All Services</span>
              </button>
            </div>

            {/* Add new service form */}
            <div className="bg-blue-50/70 border border-blue-200/70 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Service Title (e.g. Leather Sofa Restoration)"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                className="flex-grow px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#4f789e]"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newService.image}
                onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                className="flex-grow px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#4f789e]"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newService.title) return;
                  const newEntry = {
                    id: Date.now(),
                    title: newService.title,
                    image:
                      newService.image ||
                      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
                  };
                  setContent({
                    ...content,
                    services: [...(content.services || []), newEntry]
                  });
                  setNewService({ title: '', image: '' });
                }}
                className="w-full sm:w-auto bg-[#4f789e] hover:bg-[#3d6283] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <Plus size={14} />
                <span>Add Service</span>
              </button>
            </div>

            {/* List of services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {(content?.services || []).map((srv, idx) => (
                <div
                  key={srv.id || idx}
                  className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="h-36 w-full bg-gray-200 relative group">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        const filtered = content.services.filter((_, i) => i !== idx);
                        setContent({ ...content, services: filtered });
                      }}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-md shadow transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="p-3 space-y-2">
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[idx].title = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-800 focus:outline-none focus:border-[#4f789e]"
                    />
                    <input
                      type="text"
                      value={srv.image}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[idx].image = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-mono text-gray-500 focus:outline-none focus:border-[#4f789e]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ABOUT US */}
        {activeTab === 'about' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">About Royal Furnishing</h3>
                <p className="text-xs text-gray-500">
                  Update company heritage story, years of experience, and featured photo.
                </p>
              </div>
              <button
                onClick={handleSaveContent}
                disabled={isSaving}
                className="bg-[#4f789e] hover:bg-[#3d6283] text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow transition-all"
              >
                {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                <span>Save About Content</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Section Badge
                  </label>
                  <input
                    type="text"
                    value={content?.about?.badge || 'Who We Are'}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, badge: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={content?.about?.title || 'About Royal Furnishing'}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, title: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Years of Experience Badge
                  </label>
                  <input
                    type="text"
                    value={content?.about?.yearsExperience || '15+'}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, yearsExperience: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={content?.about?.description || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, description: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    About Image URL
                  </label>
                  <input
                    type="text"
                    value={content?.about?.imageUrl || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, imageUrl: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100 h-64">
                  <img
                    src={content?.about?.imageUrl}
                    alt="About Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INQUIRIES & LEADS */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Customer Quote Inquiries ({inquiries.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Leads and requests submitted directly by visitors from the website.
                </p>
              </div>
              <button
                onClick={fetchInquiries}
                disabled={isLoadingInquiries}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw size={13} className={isLoadingInquiries ? 'animate-spin' : ''} />
                <span>Refresh Inquiries</span>
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Mail size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-semibold">No customer quote requests yet.</p>
                <p className="text-xs text-gray-400 mt-1">
                  When a customer fills the "Get a Quote" form on the website, it will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {inquiries.map((inq) => (
                      <tr key={inq._id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-gray-900">{inq.name}</p>
                          <p className="text-gray-500 text-[11px] flex items-center gap-1.5 mt-0.5">
                            <Mail size={11} /> {inq.email}
                          </p>
                          {inq.phone && (
                            <p className="text-gray-500 text-[11px] flex items-center gap-1.5">
                              <Phone size={11} /> {inq.phone}
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md text-[11px]">
                            {inq.service || 'General Quote'}
                          </span>
                          {inq.message && (
                            <p className="text-gray-500 text-[11px] mt-1 max-w-xs truncate">
                              "{inq.message}"
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={inq.status || 'pending'}
                            onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border focus:outline-none ${
                              inq.status === 'completed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : inq.status === 'contacted'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteInquiry(inq._id)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: SECURITY & PASSWORD CHANGE */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6 max-w-2xl">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-900">Admin Account & Password</h3>
              <p className="text-xs text-gray-500">
                Change your admin email or password. Only authenticated admins can perform this action.
              </p>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Admin Name
                </label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Admin Login Email
                </label>
                <input
                  type="email"
                  required
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-3">
                  To change your password, fill both fields below (leave blank to keep current password):
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-[#4f789e] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSavingProfile}
                className="mt-4 bg-[#4f789e] hover:bg-[#3d6283] text-white px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow transition-all disabled:opacity-50"
              >
                {isSavingProfile ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <ShieldCheck size={14} />
                )}
                <span>Update Credentials</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
