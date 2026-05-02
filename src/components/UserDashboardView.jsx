import React, { useState } from 'react';
import { Users, Clock, Search, Filter, Mail, UserCheck, UserX, ChevronDown, ChevronUp } from 'lucide-react';
import { useAdminData } from '../hooks/useAdminData';

export function UserDashboardView() {
  const { getTrackedUsers, loading } = useAdminData();
  const trackedUsers = getTrackedUsers();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'inactive'
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedUserId, setExpandedUserId] = useState(null);
  
  const itemsPerPage = 10;

  const isUserActive = (user) => {
    const pumpDate = user.activePump?.installedAt || 0;
    const sensorDate = user.activeSensor?.installedAt || 0;
    const lastActivity = Math.max(pumpDate, sensorDate);
    if (lastActivity === 0) return false;
    const tenDaysAgo = Date.now() - (10 * 24 * 60 * 60 * 1000);
    return lastActivity > tenDaysAgo;
  };

  const getLastActivityText = (user) => {
    const pumpDate = user.activePump?.installedAt || 0;
    const sensorDate = user.activeSensor?.installedAt || 0;
    const lastActivity = Math.max(pumpDate, sensorDate);
    if (lastActivity === 0) return 'No devices logged';
    const daysAgo = Math.floor((Date.now() - lastActivity) / (1000 * 60 * 60 * 24));
    if (daysAgo === 0) return 'Active today';
    if (daysAgo === 1) return 'Active yesterday';
    return `Last active ${daysAgo} days ago`;
  };

  const handleResetPassword = (email, e) => {
    e.stopPropagation(); // prevent accordion from closing
    alert(`Reset password email trigger for ${email} will be implemented in Phase 4.`);
  };

  const toggleExpand = (id) => {
    setExpandedUserId(expandedUserId === id ? null : id);
  };

  // KPIs
  const totalUsers = trackedUsers.length;
  const activeUsers = trackedUsers.filter(isUserActive).length;
  const inactiveUsers = totalUsers - activeUsers;

  // 1. Sort by lastActivity (newest first)
  const sortedUsers = [...trackedUsers].sort((a, b) => {
    const aDate = Math.max(a.activePump?.installedAt || 0, a.activeSensor?.installedAt || 0);
    const bDate = Math.max(b.activePump?.installedAt || 0, b.activeSensor?.installedAt || 0);
    return bDate - aDate;
  });

  // 2. Filter & Search
  const filteredUsers = sortedUsers.filter(u => {
    const emailStr = (u.email || '').toLowerCase();
    const searchMatch = emailStr.includes(searchTerm.toLowerCase());
    const active = isUserActive(u);
    let filterMatch = true;
    if (filter === 'active') filterMatch = active;
    if (filter === 'inactive') filterMatch = !active;
    return searchMatch && filterMatch;
  });

  // 3. Paginate
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <div className="page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'var(--accent-primary)', fontSize: '14px', letterSpacing: '2px' }}>
          LOADING USERS...
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ paddingBottom: '120px' }}>
      <div>
        <h1 className="page-title">USERS</h1>
        <p className="page-subtitle">User Access & Password Management</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
        <div className="glass-panel" style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Users size={18} style={{ color: 'var(--text-main)' }} />
          <div style={{ fontSize: '20px', fontWeight: 600, color: '#fff' }}>{totalUsers}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total</div>
        </div>
        <div className="glass-panel" style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', border: '1px solid rgba(0,255,136,0.3)', background: 'rgba(0,255,136,0.05)' }}>
          <UserCheck size={18} style={{ color: '#00FF88' }} />
          <div style={{ fontSize: '20px', fontWeight: 600, color: '#fff' }}>{activeUsers}</div>
          <div style={{ fontSize: '10px', color: '#00FF88', textTransform: 'uppercase' }}>Active</div>
        </div>
        <div className="glass-panel" style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <UserX size={18} style={{ color: 'var(--text-muted)' }} />
          <div style={{ fontSize: '20px', fontWeight: 600, color: '#fff' }}>{inactiveUsers}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Inactive</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Search & Filter Header */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search email..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '8px 12px 8px 32px',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '13px'
              }}
            />
          </div>
          <div style={{ position: 'relative', minWidth: '110px' }}>
            <Filter size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <select
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '8px 12px 8px 32px',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '13px',
                appearance: 'none'
              }}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* User List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          {paginatedUsers.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic', padding: '12px 0' }}>
              No users match your criteria.
            </p>
          ) : (
            paginatedUsers.map((u) => {
              const active = isUserActive(u);
              const statusColor = active ? '#00FF88' : 'var(--text-muted)';
              const bgGlow = active ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.05)';
              const isExpanded = expandedUserId === u.id;

              return (
                <div
                  key={u.id}
                  onClick={() => toggleExpand(u.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: bgGlow,
                    padding: '12px', // Compact padding
                    borderRadius: '8px',
                    border: `1px solid ${active ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{u.email || 'Unknown User'}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                        <Clock size={10} />
                        <span style={{ fontSize: '10px' }}>{getLastActivityText(u)}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: statusColor,
                            boxShadow: `0 0 6px ${statusColor}`,
                          }}
                        />
                        <span style={{ fontSize: '10px', color: statusColor, fontWeight: 600, textTransform: 'uppercase' }}>
                          {active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                    </div>
                  </div>

                  {/* Folded Accordion Content */}
                  {isExpanded && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'flex-start' }}>
                      <button
                        onClick={(e) => handleResetPassword(u.email || 'Unknown User', e)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.2)',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          color: 'var(--text-main)',
                          fontSize: '11px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <Mail size={12} />
                        Reset Password
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                color: currentPage === 1 ? 'var(--text-muted)' : '#fff',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              PREV
            </button>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                color: currentPage === totalPages ? 'var(--text-muted)' : '#fff',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
