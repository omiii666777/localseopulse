'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Globe,
  Loader2,
  Sparkles,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { AuditRecord, AutocompletePrediction } from '@/types/audit';

interface AuditFormProps {
  onAuditComplete: (audit: AuditRecord) => void;
}

export default function AuditForm({ onAuditComplete }: AuditFormProps) {
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const [predictions, setPredictions] = useState<AutocompletePrediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFetchingPredictions, setIsFetchingPredictions] = useState(false);

  const [isAuditing, setIsAuditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const suppressNextAutocomplete = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (suppressNextAutocomplete.current) {
      suppressNextAutocomplete.current = false;
      return;
    }

    if (businessName.trim().length < 2) {
      setPredictions([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsFetchingPredictions(true);
        const query = new URLSearchParams({
          input: businessName.trim(),
          city: city.trim(),
        });
        const response = await fetch(`/api/places/autocomplete?${query.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setPredictions(data.predictions || []);
          setShowDropdown((data.predictions || []).length > 0);
        }
      } catch {
        setPredictions([]);
      } finally {
        setIsFetchingPredictions(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [businessName, city]);

  const handleSelectPrediction = (prediction: AutocompletePrediction) => {
    suppressNextAutocomplete.current = true;
    setBusinessName(prediction.structured_formatting.main_text);
    setSelectedPlaceId(prediction.place_id);

    if (!city.trim() && prediction.structured_formatting.secondary_text) {
      const parts = prediction.structured_formatting.secondary_text.split(',');
      if (parts.length >= 2) {
        setCity(parts.slice(0, 2).join(',').trim());
      } else {
        setCity(prediction.structured_formatting.secondary_text.trim());
      }
    }
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!businessName.trim() || !city.trim()) {
      setErrorMsg('Please enter both your Business Name and City / Location.');
      return;
    }

    try {
      setIsAuditing(true);
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: businessName.trim(),
          city: city.trim(),
          websiteUrl: websiteUrl.trim() || null,
          placeId: selectedPlaceId,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.audit) {
        throw new Error(data.error || 'Unable to complete the GBP health audit.');
      }

      onAuditComplete(data.audit as AuditRecord);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Business Name with Google Places Autocomplete */}
            <div className="relative" ref={dropdownRef}>
              <label
                htmlFor="businessName"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                1. Business Name (Google Places)
              </label>
              <div className="relative">
                <Building2 className="w-5 h-5 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="businessName"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    setSelectedPlaceId(null);
                  }}
                  onFocus={() => {
                    if (predictions.length > 0) setShowDropdown(true);
                  }}
                  placeholder="e.g., Apex Dental Studio"
                  className="w-full pl-11 pr-10 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
                {isFetchingPredictions && (
                  <Loader2 className="w-4 h-4 text-slate-400 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
                )}
              </div>

              {showDropdown && predictions.length > 0 && (
                <div className="absolute z-30 left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden divide-y divide-slate-800">
                  {predictions.map((item) => (
                    <button
                      key={item.place_id}
                      type="button"
                      onClick={() => handleSelectPrediction(item)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-800/90 transition flex items-start gap-3"
                    >
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.structured_formatting.main_text}
                        </p>
                        <p className="text-xs text-slate-400">
                          {item.structured_formatting.secondary_text}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. City / Location */}
            <div>
              <label
                htmlFor="city"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                2. City / Location
              </label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="city"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Austin, TX"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* 3. Website URL */}
          <div>
            <label
              htmlFor="websiteUrl"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
            >
              3. Website URL
            </label>
            <div className="relative">
              <Globe className="w-5 h-5 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="websiteUrl"
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://www.yourdomain.com"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-sm">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isAuditing}
            className="w-full py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/60 text-slate-950 font-bold text-base tracking-wide shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-3 cursor-pointer"
          >
            {isAuditing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                <span>Analyzing Google Maps visibility, citations, and reviews...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Run Free Audit</span>
              </>
            )}
          </button>
        </form>

        {isAuditing && (
          <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-2.5 rounded-lg border border-slate-800">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
              <span>Querying Google Places NAP...</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-2.5 rounded-lg border border-slate-800">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
              <span>Benchmarking Local Pack...</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-2.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
              <span>Computing 0–100 Health Score...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
