'vow use client';

import React, { useState } from 'react';
import { 
  Building2, MapPin, Globe, Phone, ShieldCheck, ArrowRight, 
  PlusCircle, Sparkles, TrendingUp, Star, AlertTriangle, CheckCircle2, RefreshCw 
} from 'lucide-react';

export default function LocalSeoPulseDashboard() {
  // State to track if onboarding is complete
  const [isOnboarded, setIsOnboarded] = useState(false);
  
  // Onboarding form state
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

  // If user hasn't completed setup, show the immersive, high-end Onboarding Wizard
  if (!isOnboarded) {
    return (
      <main className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-xl w-full bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wide uppercase border border-cyan-500/20">
              LocalSeoPulse Core Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Claim Your Local Dashboard
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            Enter your business details below to lock your secure tracking portal. You will receive real-time local search metrics and map visibility specifically for your business.
          </p>

          <form onSubmit={handleOnboardSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">Business Name</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Malad Spice & Grill"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">Business Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option>Restaurants & Cafes</option>
                  <option>Doctors & Healthcare</option>
                  <option>Plumbers & Home Services</option>
                  <option>Salons & Spas</option>
                  <option>Retail Store</option>
                  <option>Professional Services / Legal</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">Target Area / City</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g., Malad West, Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">Exact Business Address</label>
              <input 
                type="text" 
                required
                placeholder="Shop 4, Station Road, Malad West"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="url" 
                    placeholder="https://yourbusiness.com"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Locking Location & Generating Audit...</span>
                </>
              ) : (
                <>
                  <span>Initialize Locked Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Once onboarded, show the locked, personalized premium dashboard
  return (
    <main className="min-h-screen bg-[#090A0F] text-slate-100 p-4 sm:p-8">
      {/* Top Header Bar */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {formData.businessName || "My Local Business"}
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-cyan-400 text-xs font-medium border border-slate-700">
              {formData.city}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Category: <strong className="text-slate-200">{formData.category}</strong> • Last Synced: Just now
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Add Business / Location Upsell Button ($10) */}
          <button 
            onClick={() => alert("Redirecting to Stripe secure checkout for adding a new location ($10/mo)...")}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-400 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Another Location ($10/mo)</span>
          </button>
          
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">SEO Health Score</div>
            <div className="text-lg font-extrabold text-emerald-400">74 / 100</div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Metrics & Core Modules */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
                <span>Google Maps Rank</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white">#3 <span className="text-xs font-normal text-emerald-400">in {formData.city}</span></div>
              <div className="text-[11px] text-slate-500 mt-1">Top 3 local pack visibility</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
                <span>GBP Rating</span>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white">4.8 <span className="text-xs font-normal text-slate-400">(142 reviews)</span></div>
              <div className="text-[11px] text-emerald-400 mt-1">+12 reviews this month</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
                <span>Citation Consistency</span>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white">92%</div>
              <div className="text-[11px] text-slate-500 mt-1">1 minor NAP mismatch found</div>
            </div>
          </div>

          {/* Actionable Tasks / Priority Fixes */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Priority Actions for {formData.businessName}</span>
              </h3>
              <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-500/20">3 Open Fixes</span>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-xl flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Add Missing Operating Hours for Holidays</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Your Google Business Profile lacks upcoming holiday hours, which lowers local trust.</p>
                  </div>
                </div>
                <button className="text-xs bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-3 py-1.5 rounded-lg transition-colors shrink-0">
                  Fix Now
                </button>
              </div>

              <div className="bg-slate-950/50 border border-slate-800/80 p-4 rounded-xl flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">NAP Consistency Check Passed</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Your phone number and address match across major local directories.</p>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-medium px-3 py-1.5 shrink-0">Completed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: AI Strategist & Account Control */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Local SEO Strategist</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Ask anything about ranking higher in {formData.city} or improving your Google Maps presence.
            </p>
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 mb-3">
              &quot;Why is my competitor outranking me on Station Road in Malad?&quot;
            </div>

            <button 
              onClick={() => alert("AI Local SEO Strategist analysis triggered for " + formData.businessName)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-xl text-xs transition-colors"
            >
              Open AI Assistant Chat
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-3">Data Security & Ownership</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              All data entered for <strong className="text-slate-200">{formData.businessName}</strong> is securely stored and isolated exclusively for your account.
            </p>
            <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-3 flex justify-between items-center">
              <span>Tenant ID: SECURE-LOCKED</span>
              <span className="text-emerald-400 font-medium">Active</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
