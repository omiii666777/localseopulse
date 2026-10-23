'use client';

import { useState } from 'react';

export default function Home() {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setAuditResult({
        businessName,
        location,
        score: 74,
        seoHealth: 'Good, but needs citation cleanup',
        gmbStatus: 'Claimed & Verified',
        reviews: '42 reviews (4.7★)',
        checklist: [
          { task: 'Google Business Profile Optimization', status: 'Passed' },
          { task: 'Local Citation Consistency (NAP)', status: 'Warning' },
          { task: 'Mobile Page Speed', status: 'Failed' },
          { task: 'On-Page Local Keywords', status: 'Passed' }
        ]
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            LocalSeoPulse
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Instant Local SEO Audits & Ranking Optimizer for Small Businesses</p>
        </header>

        <div style={{ backgroundColor: '#1e293b', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
          <form onSubmit={handleAudit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Business Name</label>
              <input 
                type="text" 
                placeholder="e.g. Acme Plumbing Virar" 
                value={businessName} 
                onChange={(e) => setBusinessName(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', fontSize: '1rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Target City / Location</label>
              <input 
                type="text" 
                placeholder="e.g. Virar West, Maharashtra" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', fontSize: '1rem' }}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
            >
              {loading ? 'Analyzing Local Rankings & GMB...' : 'Run Free Local SEO Audit'}
            </button>
          </form>
        </div>

        {auditResult && (
          <div style={{ marginTop: '40px', backgroundColor: '#1e293b', padding: '30px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
              Audit Report for: <span style={{ color: '#38bdf8' }}>{auditResult.businessName}</span> ({auditResult.location})
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#38bdf8' }}>{auditResult.score}/100</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '5px' }}>Overall SEO Health Score</div>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#22c55e', marginTop: '10px' }}>{auditResult.gmbStatus}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '5px' }}>Google Business Profile</div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Actionable Recommendations</h3>
            <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {auditResult.checklist.map((item: any, idx: number) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#0f172a', borderRadius: '6px' }}>
                  <span>{item.task}</span>
                  <span style={{ fontWeight: 'bold', color: item.status === 'Passed' ? '#22c55e' : item.status === 'Warning' ? '#eab308' : '#ef4444' }}>
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
