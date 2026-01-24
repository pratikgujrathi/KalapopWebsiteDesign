import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
  const handleGoogleLogin = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/dashboard';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1 className="heading-1" style={{ fontSize: '3rem', marginBottom: '16px' }}>
              Welcome to Kalapop
            </h1>
            <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '45ch' }}>
              Sign in to access your pattern library, save designs, and request custom orders.
            </p>
          </div>

          <div className="login-card">
            <h2 className="heading-4" style={{ marginBottom: '24px' }}>Sign in with Google</h2>
            <p className="body-small" style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Quick and secure authentication. Access your account in seconds.
            </p>
            <button onClick={handleGoogleLogin} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <LogIn size={20} /> <span style={{ marginLeft: '12px' }}>Continue with Google</span>
            </button>
          </div>

          <div className="login-benefits">
            <p className="caption" style={{ marginBottom: '24px' }}>What you get:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li className="body-small" style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--brand-primary)' }}>•</span>
                Access to curated pattern collections
              </li>
              <li className="body-small" style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--brand-primary)' }}>•</span>
                Save and organize your favorite designs
              </li>
              <li className="body-small" style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--brand-primary)' }}>•</span>
                Request custom pattern development
              </li>
              <li className="body-small" style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--brand-primary)' }}>•</span>
                Download high-resolution files
              </li>
            </ul>
          </div>

          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <Link to="/collections" className="link-text">
              Browse collections without signing in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
