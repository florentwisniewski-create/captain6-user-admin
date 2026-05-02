import React, { useState } from 'react';
import { UserCheck } from 'lucide-react';
import { useAdminData } from '../hooks/useAdminData';

export function ApprovalQueueView() {
  const { getPendingUsers, approveUser, rejectUser, loading } = useAdminData();
  const [message, setMessage] = useState('');
  const pendingUsers = getPendingUsers();

  const handleApprove = async (uid) => {
    try {
      await approveUser(uid);
      setMessage('User approved successfully! ✅');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Error approving user.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleReject = async (uid) => {
    try {
      await rejectUser(uid);
      setMessage('User rejected. ❌');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Error rejecting user.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'var(--accent-primary)', fontSize: '14px', letterSpacing: '2px' }}>
          LOADING QUEUE...
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ paddingBottom: '120px' }}>
      <div>
        <h1 className="page-title">APPROVALS</h1>
        <p className="page-subtitle">Manage User Access Requests</p>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '16px',
          }}
        >
          <UserCheck size={24} style={{ filter: 'drop-shadow(0 0 8px #fff)', color: '#fff' }} />
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '1px',
              textShadow: '0 0 10px rgba(255,255,255,0.5)',
              color: '#fff',
            }}
          >
            Pending Users
          </h2>
        </div>

        {message && (
          <div
            style={{
              padding: '12px',
              background: 'rgba(0, 255, 136, 0.1)',
              border: '1px solid var(--accent-success)',
              borderRadius: '8px',
              color: 'var(--accent-success)',
              fontSize: '13px',
              textAlign: 'center',
            }}
          >
            {message}
          </div>
        )}

        {pendingUsers.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '14px',
              fontStyle: 'italic',
              padding: '12px 0',
            }}
          >
            No pending access requests.
          </p>
        ) : (
          pendingUsers.map((pu) => (
            <div
              key={pu.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                background: 'rgba(255,255,255,0.05)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <span 
                style={{ 
                  fontSize: '14px', 
                  color: '#fff', 
                  fontWeight: 500,
                  wordBreak: 'break-all',
                  flex: '1 1 auto',
                  minWidth: '200px'
                }}
              >
                {pu.email}
              </span>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0, marginLeft: 'auto' }}>
                <button
                  onClick={() => handleApprove(pu.id)}
                  className="glass-button"
                  style={{
                    padding: '8px 16px',
                    color: '#00FF88',
                    borderColor: '#00FF88',
                    background: 'rgba(0,255,136,0.1)',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  GRANT
                </button>
                <button
                  onClick={() => handleReject(pu.id)}
                  className="glass-button"
                  style={{
                    padding: '8px 16px',
                    color: '#FF3366',
                    borderColor: '#FF3366',
                    background: 'rgba(255,51,102,0.1)',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  REJECT
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
