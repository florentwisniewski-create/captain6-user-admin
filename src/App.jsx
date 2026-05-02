import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from './components/LoginView';
import { AdminRoute } from './components/AdminRoute';
import { Navigation } from './components/Navigation';
import { UserDashboardView } from './components/UserDashboardView';
import { ApprovalQueueView } from './components/ApprovalQueueView';
import { CapacityDashboardView } from './components/CapacityDashboardView';
import './App.css'; 

// Layout wrapper for authenticated admin screens
function AdminLayout({ children }) {
  return (
    <>
      {children}
      <Navigation />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        
        <Route 
          path="/" 
          element={
            <AdminRoute>
              <AdminLayout>
                <CapacityDashboardView />
              </AdminLayout>
            </AdminRoute>
          } 
        />

        <Route 
          path="/users" 
          element={
            <AdminRoute>
              <AdminLayout>
                <UserDashboardView />
              </AdminLayout>
            </AdminRoute>
          } 
        />

        <Route 
          path="/approvals" 
          element={
            <AdminRoute>
              <AdminLayout>
                <ApprovalQueueView />
              </AdminLayout>
            </AdminRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
