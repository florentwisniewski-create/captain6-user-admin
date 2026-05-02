import React from 'react';
import { Server, Database, Cloud, ExternalLink } from 'lucide-react';

export function CapacityDashboardView() {
  const firebaseUrl = "https://console.firebase.google.com/u/0/project/captain-6-24e95/usage";
  const cloudflareUrl = "https://dash.cloudflare.com/";

  return (
    <div className="page-container" style={{ paddingBottom: '120px' }}>
      <div>
        <h1 className="page-title">CAPACITY</h1>
        <p className="page-subtitle">Infrastructure Limits & Billing</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Firestore Block */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Database size={24} style={{ color: '#F38020', filter: 'drop-shadow(0 0 8px rgba(243, 128, 32, 0.5))' }} />
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', letterSpacing: '1px' }}>Firebase Firestore</h2>
            </div>
            <a 
              href={firebaseUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#F38020', textDecoration: 'none', background: 'rgba(243, 128, 32, 0.1)', padding: '6px 12px', borderRadius: '4px', border: '1px solid #F38020' }}
            >
              Console <ExternalLink size={12} />
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Reads</span>
                <span style={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>50,000 / day</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ width: '100%', height: '100%', background: '#F38020', borderRadius: '2px', opacity: 0.3 }} />
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Writes</span>
                <span style={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>20,000 / day</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ width: '100%', height: '100%', background: '#F38020', borderRadius: '2px', opacity: 0.3 }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Deletes</span>
                <span style={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>20,000 / day</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ width: '100%', height: '100%', background: '#F38020', borderRadius: '2px', opacity: 0.3 }} />
              </div>
            </div>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '8px' }}>
            Free Spark Plan limits. It is virtually impossible for a solo user to exceed these daily limits.
          </p>
        </div>

        {/* Cloudflare Block */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Cloud size={24} style={{ color: '#F38020', filter: 'drop-shadow(0 0 8px rgba(243, 128, 32, 0.5))' }} />
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', letterSpacing: '1px' }}>Cloudflare Pages</h2>
            </div>
            <a 
              href={cloudflareUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#F38020', textDecoration: 'none', background: 'rgba(243, 128, 32, 0.1)', padding: '6px 12px', borderRadius: '4px', border: '1px solid #F38020' }}
            >
              Dashboard <ExternalLink size={12} />
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Requests</span>
                <span style={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>100,000 / day</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ width: '100%', height: '100%', background: '#F38020', borderRadius: '2px', opacity: 0.3 }} />
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Builds</span>
                <span style={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>500 / month</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ width: '100%', height: '100%', background: '#F38020', borderRadius: '2px', opacity: 0.3 }} />
              </div>
            </div>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '8px' }}>
            Free tier limits for Cloudflare Pages hosting and bandwidth.
          </p>
        </div>

      </div>
    </div>
  );
}
