import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Shield } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/admin';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Shield size={64} style={{ margin: '0 auto 1.5rem', color: 'var(--text-primary)' }} />
          <h1 className="heading-1" style={{ marginBottom: '1rem', fontSize: '3rem' }}>
            ADMIN ACCESS
          </h1>
          <p className="body-large">
            Secure authentication required for admin panel access.
          </p>
        </div>

        <div style={{ 
          background: 'var(--bg-page)', 
          border: '4px solid var(--text-primary)', 
          padding: '3rem',
          boxShadow: 'var(--shadow-bold)'
        }}>
          <h2 className="heading-4" style={{ marginBottom: '1.5rem' }}>Sign in as Administrator</h2>
          <p className="body-medium" style={{ marginBottom: '2rem' }}>
            Admin authentication provides access to:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
            <li className="body-small" style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0 }}>•</span>
              Upload and manage design images
            </li>
            <li className="body-small" style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0 }}>•</span>
              Control banner image display
            </li>
            <li className="body-small" style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0 }}>•</span>
              Download images without watermark
            </li>
            <li className="body-small" style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0 }}>•</span>
              Manage fabric options
            </li>
          </ul>
          <button onClick={handleAdminLogin} className="btn-primary" style={{ width: '100%' }}>
            <LogIn size={20} style={{ marginRight: '0.75rem' }} /> Continue with Google
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            onClick={() => navigate('/')} 
            className="btn-tertiary"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
