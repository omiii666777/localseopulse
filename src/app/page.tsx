'use client';

import React, { useState } from 'react';
import { Building2, MapPin, Globe, Phone, ShieldCheck, ArrowRight, PlusCircle, Sparkles, TrendingUp, Star, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

export default function LocalSeoPulseDashboard() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'Restaurants & Cafes',
    address: '',
    city: 'Malad West, Mumbai',
    phone: '',
    website: ''
  });
  const [loading, setLoading] = useState(false);

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOnboarded(true);
    }, 1200);
  };

  if (!isOnboarded) {
    return (
      <main className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col justify-center items-center p-6">
        <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-2">Claim Your Local Dashboard</h1>
          <p className="text-sm text-slate-400 mb-6">Enter your business details below to lock your secure portal.</p>
          <form onSubmit={handleOnboardSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Business Name</label>
              <input 
                type="text" 
                required 
                placeholder="e.g., Malad Spice & Grill" 
                value={formData.businessName} 
                onChange={(e) => setFormData({...formData, businessName: e.target.value})} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Target Area / City</label>
              <input 
                type="text" 
                required 
                placeholder="e.g., Malad West, Mumbai" 
                value={formData.city} 
                onChange={(e) => setFormData({...formData, city: e.target.value})} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-3 rounded-xl mt-2 cursor-pointer transition-colors"
            >
              {loading ? 'Locking Location...' : 'Initialize Locked Dashboard'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090A0F] text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white">{formData.businessName}</h1>
        <p className="text-sm text-slate-400">Locked location: {formData.city}</p>
      </div>
    </main>
  );
}
