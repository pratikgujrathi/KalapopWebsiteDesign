import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Shield, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin credentials (in production, this should be in environment variables)
  const ADMIN_USERNAME = 'kalapop_admin';
  const ADMIN_PASSWORD = 'Kalapop@2025!Secure';

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate authentication delay
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Store admin session
        localStorage.setItem('kalapop_admin_auth', 'true');
        localStorage.setItem('kalapop_admin_session', Date.now().toString());
        
        toast({
          title: "Login successful",
          description: "Welcome to Kalapop Admin Panel",
        });
        
        navigate('/admin');
      } else {
        setError('Invalid credentials. Please try again.');
        toast({
          title: "Login failed",
          description: "Invalid username or password",
        });
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', background: '#F8F9FA' }}>
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

        <form onSubmit={handleAdminLogin} style={{ 
          background: 'var(--bg-page)', 
          border: '4px solid var(--text-primary)', 
          padding: '3rem',
          boxShadow: 'var(--shadow-bold)'
        }}>
          <h2 className="heading-4" style={{ marginBottom: '1.5rem' }}>Sign in as Administrator</h2>
          
          {error && (
            <div style={{
              padding: '1rem',
              background: '#FEE2E2',
              border: '2px solid #DC2626',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <AlertCircle size={20} style={{ color: '#DC2626' }} />
              <p style={{ fontSize: '0.875rem', color: '#DC2626', fontWeight: 600 }}>{error}</p>
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="caption" htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter admin username"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="caption" htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter admin password"
              required
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            <LogIn size={20} style={{ marginRight: '0.75rem' }} /> 
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div style={{ marginTop: '2rem', padding: '1rem', background: '#F0F9FF', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.75rem' }}>
              <strong>Admin access provides:</strong>
            </p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.75rem', color: '#6B7280' }}>
              <li style={{ marginBottom: '0.5rem' }}>• Upload and manage banner images</li>
              <li style={{ marginBottom: '0.5rem' }}>• Upload featured patterns</li>
              <li style={{ marginBottom: '0.5rem' }}>• Upload lifestyle mockups</li>
              <li style={{ marginBottom: '0.5rem' }}>• Manage designs with watermarks</li>
              <li>• Download original files</li>
            </ul>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            onClick={() => navigate('/')} 
            className="btn-tertiary"
          >
            Back to Home
          </button>
        </div>

        {/* Credentials display for development (REMOVE IN PRODUCTION) */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#FFF9E6',
          border: '2px dashed #F59E0B',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400E', marginBottom: '0.5rem' }}>
            ⚠️ Admin Credentials (Dev Only)
          </p>
          <p style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: '#92400E' }}>
            <strong>Username:</strong> kalapop_admin
          </p>
          <p style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: '#92400E' }}>
            <strong>Password:</strong> Kalapop@2025!Secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
