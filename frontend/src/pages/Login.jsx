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
      <section className="section-narrow" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="heading-1" style={{ marginBottom: '1rem' }}>
            Welcome to Kalapop
          </h1>
          <p className="body-large" style={{ marginBottom: '3rem' }}>
            Sign in to access your pattern library, save designs, and request custom orders.
          </p>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '3rem 2rem' }}>
            <h2 className="heading-4" style={{ marginBottom: '1.5rem' }}>Sign in with Google</h2>
            <p className="body-medium" style={{ marginBottom: '2rem' }}>
              Quick and secure authentication for boutiques, designers, and creative professionals.
            </p>
            <button onClick={handleGoogleLogin} className="btn-primary" style={{ width: '100%' }}>
              <LogIn size={20} style={{ marginRight: '0.75rem' }} /> Continue with Google
            </button>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <p className="body-small" style={{ marginBottom: '1rem' }}>What you get:</p>
            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
              <li className="body-small" style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                Access to curated pattern collections
              </li>
              <li className="body-small" style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                Save and organize your designs
              </li>
              <li className="body-small" style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                Request custom orders with fabric selection
              </li>
              <li className="body-small" style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                Access to design specifications and print guidance
              </li>
            </ul>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <Link to="/collections" className="body-small" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>
              Browse collections without signing in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;