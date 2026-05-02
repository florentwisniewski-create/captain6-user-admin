import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';

export function LoginView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [localError, setLocalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Automatically redirect to dashboard if logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate('/', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLocalError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setLocalError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setLocalError(err.message || 'An error occurred during Google authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="page-container"
      style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: '0' }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '48px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'fadeIn 0.5s ease-out',
        }}
      >
        <div
          style={{
            width: '140px',
            height: '140px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="/gear-admin-logo-transparent.svg"
            alt="Captain 6 Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        <h1
          style={{
            fontFamily: 'Aquire, sans-serif',
            fontSize: '36px',
            letterSpacing: '6px',
            textAlign: 'center',
            marginBottom: '4px',
            color: '#fff',
            fontWeight: 'normal',
          }}
        >
          CAPTAIN 6
        </h1>
        <h2
          style={{
            fontFamily: 'Aquire, sans-serif',
            fontSize: '18px',
            letterSpacing: '4px',
            textAlign: 'center',
            marginBottom: '64px',
            color: 'var(--accent-primary)',
            fontWeight: 'normal',
          }}
        >
          ADMIN
        </h2>

        {localError && (
          <div
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255, 68, 68, 0.1)',
              border: '1px solid var(--accent-danger)',
              borderRadius: '8px',
              color: 'var(--accent-danger)',
              fontSize: '13px',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            {localError}
          </div>
        )}

        <button
          type="button"
          disabled={isLoading}
          className="glass-button"
          style={{
            width: '100%',
            padding: '14px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255,255,255,0.05)',
            color: 'var(--text-main)',
            border: '1px solid rgba(255,255,255,0.2)',
            fontWeight: 600,
            marginBottom: '24px',
            opacity: isLoading ? 0.5 : 1,
          }}
          onClick={handleGoogleSignIn}
        >
          G &nbsp; | &nbsp; {isLoading ? 'WORKING...' : 'Continue with Google'}
        </button>

        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.1)' }} />
          <span
            style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}
          >
            or use email
          </span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label" style={{ fontSize: '10px' }}>
              Email Address
            </label>
            <input
              type="email"
              className="custom-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label" style={{ fontSize: '10px' }}>
              Password
            </label>
            <input
              type="password"
              className="custom-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '4px',
            }}
          >
            <div
              onClick={() => setRememberMe(!rememberMe)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '4px 0',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '32px',
                  height: '18px',
                  background: rememberMe ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  transition: 'background 0.3s',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: rememberMe ? '16px' : '2px',
                    width: '14px',
                    height: '14px',
                    background: rememberMe ? 'var(--bg-dark)' : '#fff',
                    borderRadius: '50%',
                    transition: 'left 0.3s ease-out, background 0.3s',
                  }}
                />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Remember me</span>
            </div>
            <button
              type="button"
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                background: 'none',
                textDecoration: 'underline',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
              onClick={() =>
                alert('Contact system administrator to reset root password.')
              }
            >
              Forgot password?
            </button>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              type="submit"
              disabled={isLoading}
              className="glass-button"
              style={{
                flex: 1,
                padding: '14px',
                fontSize: '13px',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1px solid var(--accent-primary)',
                fontWeight: 600,
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              {isLoading ? 'WORKING...' : 'AUTHENTICATE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
