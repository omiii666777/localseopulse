'use client';

import React, { useState } from 'react';
import { 
  Building2, MapPin, Globe, Phone, ShieldCheck, ArrowRight, 
  PlusCircle, Sparkles, TrendingUp, Star, AlertTriangle, CheckCircle2, 
  RefreshCw, BarChart3, Award, Bot, ChevronRight, Layers, Lock, Zap
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

  const getDynamicMetrics = () => {
    const seed = (formData.businessName.length + formData.city.length) % 5;
    return {
      rank: `#${Math.max(1, (seed % 5) + 1)}`,
      rating: (4.4 + (seed * 0.1)).toFixed(1),
      reviewCount: 112 + (seed * 18),
      healthScore: 82 + (seed * 3),
      citationAccuracy: 96
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
    }, 900);
  };

  if (!isOnboarded) {
    return (
      <main className="min-h-screen bg-[#06070B] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-xl w-full bg-slate-900/80 border border-slate-800/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold tracking-tight text-white text-lg">LocalSeo<span className="text-cyan-400">Pulse</span></span>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wide uppercase border border-cyan-500/20">
              Enterprise v2.4
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Claim Your Local Intelligence Hub
          </h1>
          <p className="text-sm text-slate-400 mb-8 leading-relaxed">
            Lock your tenant session to analyze local map packs, track competitor keyword shifts, and run automated citation audits.
          </p>

          <form onSubmit={handleOnboardSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5">Business Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Malad Spice & Grill"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3 pl-11 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
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
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5">Target Area / City</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g., Malad West, Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3 pl-11 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5">Street Address</label>
              <input 
                type="text" 
                required
                placeholder="Shop 4, Station Road"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span className="text-sm">Synthesizing Local Grid...</span>
                </>
              ) : (
                <>
                  <span className="text-sm">Initialize Tenant Dashboard</span>
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
    <main className="min-h-screen bg-[#06070B] text-slate-100 p-4 sm:p-8 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation Bar */}
      <nav className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl px-6 py-4 rounded-2xl mb-8 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-white text-base tracking-tight">{formData.businessName}</h2>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold uppercase border border-emerald-500/20">Live</span>
            </div>
            <p className="text-xs text-slate-400">📍 {formData.city} • {formData.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button 
            onClick={() => alert("Stripe checkout initiated: Adding extra business location slot ($10/mo)...")}
            className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-cyan-400 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Location ($10/mo)</span>
          </button>
          
          <div className="bg-slate-950 border border-slate-800 px-4 py-1.5 rounded-xl text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Health Score</div>
            <div className="text-base font-extrabold text-emerald-400">{metrics.healthScore} <span className="text-xs text-slate-500">/100</span></div>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto flex gap-2 mb-8 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Overview & Insights', icon: BarChart3 },
          { id: 'audit', label: 'GBP Audit', icon: Award },
          { id: 'rankings', label: 'Geo-Grid Rankings', icon: TrendingUp },
          { id: 'reviews', label: 'Review Intelligence', icon: Star },
          { id: 'ai', label: 'AI Local Strategist', icon: Bot },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-cyan-500/15 to-blue-600/15 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-3 font-medium">
                    <span>Maps Pack Position</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">{metrics.rank}</div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-medium">Top 3 local pack presence</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-3 font-medium">
                    <span>GBP Rating & Sentiment</span>
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">{metrics.rating} <span className="text-xs font-normal text-slate-400">({metrics.reviewCount})</span></div>
                  <div className="text-[11px] text-amber-400 mt-1 font-medium">100% response rate</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-3 font-medium">
                    <span>NAP Uniformity</span>
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">{metrics.citationAccuracy}%</div>
                  <div className="text-[11px] text-cyan-400 mt-1 font-medium">Verified across directories</div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Automated Priority Fixes</span>
                  </h3>
                  <span className="text-xs bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20 font-medium">2 Actions Pending</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">Upload Weekly Geo-Tagged Photos</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Competitors in {formData.city} are adding 12+ images weekly to outrank your listing.</p>
                      </div>
                    </div>
                    <button onClick={() => alert("Task initiated.")} className="text-xs bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-3.5 py-2 rounded-xl transition-colors cursor-pointer shrink-0">
                      Fix Now
                    </button>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-white">Primary Category & NAP Sync</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Primary service category '{formData.category}' matches local search volume.</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold px-3 py-2 shrink-0">Optimized</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white tracking-wide">AI Local SEO Strategist</h3>
                </div>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Trained on real-time Google Business Profile and local competitor datasets for {formData.city}.
                </p>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 mb-4 font-mono">
                  &quot;How do I capture top ranking for mobile searches in {formData.city}?&quot;
                </div>
                <button 
                  onClick={() => alert("AI Agent consulting local keyword intent...")} 
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-3 rounded-xl text-xs transition-colors cursor-pointer shadow-md"
                >
                  Consult AI Agent
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-2">Google Business Profile Deep Audit</h2>
            <p className="text-xs text-slate-400 mb-4">Complete health check for {formData.businessName} at {formData.address}.</p>
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl text-slate-300 text-sm space-y-2 font-mono">
              <p>✅ Business Title & Attributes: Optimized</p>
              <p>✅ NAP Citation Uniformity: 96% Match</p>
              <p>⚠️ Holiday Hours Update: Missing for upcoming quarter</p>
            </div>
          </div>
        )}

        {activeTab === 'rankings' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-2">Geo-Grid Local Rank Tracker</h2>
            <p className="text-xs text-slate-400 mb-4">Tracking pin rankings across 9 neighborhoods in {formData.city}.</p>
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl text-center text-slate-300 text-sm">
              Average grid position for <strong>{formData.businessName}</strong>: <span className="text-emerald-400 font-bold text-lg">{metrics.rank}</span>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-2">Reputation & Review Intelligence</h2>
            <p className="text-xs text-slate-400 mb-4">Sentiment breakdown and AI response generator.</p>
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl text-slate-300 text-sm space-y-2">
              <p>⭐ Aggregate Score: <strong>{metrics.rating} / 5.0</strong> ({metrics.reviewCount} total reviews)</p>
              <p>💬 Sentiment Analysis: 94% positive customer feedback regarding service quality.</p>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-2">AI Local SEO Strategist Console</h2>
            <p className="text-xs text-slate-400 mb-4">Interactive agent specialized in local map pack optimization.</p>
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl text-slate-300 text-sm space-y-3">
              <p>🤖 <strong>LocalSeoPulse AI:</strong> Hello! Your business <strong>{formData.businessName}</strong> in <strong>{formData.city}</strong> currently holds position <strong>{metrics.rank}</strong>. To break into the #1 spot, you should prioritize responding to reviews within 2 hours and publishing weekly GBP posts.</p>
              <input type="text" placeholder="Ask a follow-up growth question..." className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500" />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

