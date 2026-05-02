import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export function AdminRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Validate against admin UID from environment variables
        const adminUid = import.meta.env.VITE_ADMIN_UID;
        
        if (currentUser.uid === adminUid) {
          setUser(currentUser);
        } else {
          // If a non-admin tries to log in, instantly sign them out
          console.error("Unauthorized access attempt. UID does not match Admin UID.");
          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'var(--accent-primary)', fontSize: '14px', letterSpacing: '2px' }}>
          VERIFYING ADMIN CREDENTIALS...
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
