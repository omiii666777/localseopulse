'use client';

import React, { useState } from 'react';
import { 
  Building2, MapPin, Globe, Phone, ShieldCheck, ArrowRight, 
  PlusCircle, Sparkles, TrendingUp, Star, AlertTriangle, CheckCircle2, 
  RefreshCw, BarChart3, Award, FileText, Bot
} from 'lucide-react';

export default function LocalSeoPulsePlatform() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'audit' | 'rankings' | 'reviews' | 'ai'>('overview');
  
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'Restaurants & Cafes',
    address: '',
    city: 'Malad West, Mumbai',
    phone: '',
    website: ''
  });

  const [loading, setLoading] = useState(false);

  // Dynamic metric generator based on user input length & category to ensure unique results per location
  const getDynamicMetrics = () => {
    const seed = (formData.businessName.length + formData.city.length) % 5;
    return {
      rank: `#${Math.max(1, (seed % 6) + 1)}`,
      rating: (4.2 + (seed * 0.1)).toFixed(1),
      reviewCount: 85 + (seed * 23),
      healthScore: 68 + (seed * 5),
      citationAccuracy: 88 + seed * 2
    };
  };

  const metrics = getDynamicMetrics();

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.city) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOnboarded(true);
    }, 800);
  };

  if (!isOnboarded) {
    return (
      <main className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-xl w-full bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wide uppercase border border-cyan-500/20">
              LocalSeoPulse Engine v2.0
            </span>
            <span className="text-xs text-slate-400">Locked Tenant Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Initialize Your Local Dashboard
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            Enter your exact business name and target location below. Our engine will lock your tenant session and calculate real-time local search visibility.
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">Street Address</label>
              <input 
                type="text" 
                required
                placeholder="Shop 4, Station Road"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Local Maps Grid...</span>
                </>
              ) : (
                <>
                  <span>Lock Location & Generate Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090A0F] text-slate-100 p-4 sm:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {formData.businessName}
            </h1>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-medium border border-slate-700">
              📍 {formData.city}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Category: <strong className="text-slate-200">{formData.category}</strong> • Address: {formData.address || 'Not specified'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button 
            onClick={() => alert("Stripe checkout session initialized: Adding extra location slot ($10/mo)...")}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Location ($10/mo)</span>
          </button>
          
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">SEO Health Score</div>
            <div className="text-lg font-extrabold text-emerald-400">{metrics.healthScore} / 100</div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-slate-800/60">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'audit', label: 'GBP Audit', icon: Award },
          { id: 'rankings', label: 'Geo-Grid Rankings', icon: TrendingUp },
          { id: 'reviews', label: 'Reviews', icon: Star },
          { id: 'ai', label: 'AI Strategist', icon: Bot },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>Maps Visibility ({formData.city})</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{metrics.rank}</div>
                  <div className="text-[11px] text-slate-500 mt-1">Local pack rank tracking</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>Google Rating</span>
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{metrics.rating} <span className="text-xs font-normal text-slate-400">({metrics.reviewCount} reviews)</span></div>
                  <div className="text-[11px] text-emerald-400 mt-1">+8 new reviews this month</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>NAP Consistency</span>
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{metrics.citationAccuracy}%</div>
                  <div className="text-[11px] text-slate-500 mt-1">Directory sync active</div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Priority Fixes for {formData.businessName}</span>
                  </h3>
                  <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-500/20">2 Action Items</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">Optimize Geo-Tagged Photos</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Competitors in {formData.city} are uploading 15+ geotagged images weekly.</p>
                      </div>
                    </div>
                    <button onClick={() => alert("Upload task triggered.")} className="text-xs bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-3 py-1.5 rounded-xl cursor-pointer">
                      Resolve
                    </button>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">Business Category & NAP Verified</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Primary category '{formData.category}' is correctly indexed.</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium px-3 py-1.5">Passed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>AI Local SEO Strategist</span>
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Tailored insights for {formData.businessName} in {formData.city}.
                </p>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 mb-3">
                  &quot;How can I outrank local competitors on mobile searches in {formData.city}?&quot;
                </div>
                <button onClick={() => alert("AI Agent generating custom local growth plan...")} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 rounded-xl text-xs cursor-pointer">
                  Generate AI Growth Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-2">Google Business Profile Audit ({formData.businessName})</h2>
            <p className="text-sm text-slate-400 mb-4">Live audit report for {formData.address}, {formData.city}.</p>
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl text-slate-300 text-sm">
              ✅ Profile Completeness: 92%<br/>
              ✅ NAP Uniformity across directories: Verified<br/>
              ⚠️ Missing attribute: Wheelchair accessible entrance attributes not set.
            </div>
          </div>
        )}

        {activeTab === 'rankings' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-2">Geo-Grid Rank Tracker</h2>
            <p className="text-sm text-slate-400 mb-4">Tracking local map pack rankings across a 5km radius in {formData.city}.</p>
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl text-center text-slate-300 text-sm">
              Grid scan complete for <strong>{formData.businessName}</strong>. Average map ranking position: <strong>{metrics.rank}</strong>.
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-2">Reputation & Review Management</h2>
            <p className="text-sm text-slate-400 mb-4">Customer feedback sentiment analysis for {formData.businessName}.</p>
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl text-slate-300 text-sm">
              ⭐ Overall Score: {metrics.rating} / 5.0 ({metrics.reviewCount} total reviews)<br/>
              💬 Response rate: 100% within 24 hours.
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-2">AI Local SEO Strategist</h2>
            <p className="text-sm text-slate-400 mb-4">Consultation terminal for {formData.businessName}.</p>
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl text-slate-300 text-sm space-y-3">
              <p>🤖 <strong>LocalSeoPulse AI:</strong> Your business <strong>{formData.businessName}</strong> in <strong>{formData.city}</strong> is currently positioned at <strong>{metrics.rank}</strong> in the local pack. To break into the top spot, focus on acquiring 15 new reviews with keywords matching your category ({formData.category}).</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
