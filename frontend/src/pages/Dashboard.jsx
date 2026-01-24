import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockUser, designs } from '../mockData';
import { Heart, Download, Mail, User, LogOut } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const { toast } = useToast();
  const user = mockUser;
  const savedDesigns = designs.filter(d => user.savedDesigns.includes(d.id));

  const handleRequestOrder = () => {
    toast({
      title: "Request sent",
      description: "Our team will contact you shortly about your custom order.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // In real implementation, this would clear session and redirect
  };

  return (
    <div className="dashboard-page">
      <section className="section-container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="heading-1" style={{ fontSize: '3rem', marginBottom: '16px' }}>
              My Studio
            </h1>
            <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
              Welcome back, {user.name}
            </p>
          </div>
          <button onClick={handleLogout} className="btn-secondary">
            <LogOut size={20} /> <span style={{ marginLeft: '8px' }}>Sign Out</span>
          </button>
        </div>

        {/* Account Info */}
        <div className="account-info-card">
          <div className="account-info-grid">
            <div className="info-item">
              <User size={20} style={{ color: 'var(--text-secondary)' }} />
              <div style={{ marginLeft: '12px' }}>
                <p className="caption">Account</p>
                <p className="body-small" style={{ marginTop: '4px' }}>{user.name}</p>
              </div>
            </div>
            <div className="info-item">
              <Mail size={20} style={{ color: 'var(--text-secondary)' }} />
              <div style={{ marginLeft: '12px' }}>
                <p className="caption">Email</p>
                <p className="body-small" style={{ marginTop: '4px' }}>{user.email}</p>
              </div>
            </div>
            <div className="info-item">
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--brand-primary)' }} />
              <div style={{ marginLeft: '12px' }}>
                <p className="caption">Tier</p>
                <p className="body-small" style={{ marginTop: '4px', textTransform: 'capitalize' }}>{user.tier}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <Heart size={18} /> <span style={{ marginLeft: '8px' }}>Saved Designs</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'request' ? 'active' : ''}`}
            onClick={() => setActiveTab('request')}
          >
            <Mail size={18} /> <span style={{ marginLeft: '8px' }}>Request Order</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'saved' && (
          <div className="tab-content">
            <div style={{ marginBottom: '32px' }}>
              <h2 className="heading-4" style={{ marginBottom: '8px' }}>Your Saved Designs</h2>
              <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                {savedDesigns.length} patterns saved
              </p>
            </div>

            {savedDesigns.length > 0 ? (
              <div className="designs-grid">
                {savedDesigns.map((design) => (
                  <Link
                    key={design.id}
                    to={`/design/${design.id}`}
                    className="design-card"
                  >
                    <div className="design-thumbnail">
                      <div className={`pattern-preview ${design.thumbnail}`}></div>
                    </div>
                    <div className="design-info">
                      <h3 className="heading-5" style={{ marginBottom: '8px' }}>
                        {design.name}
                      </h3>
                      <p className="caption" style={{ color: 'var(--text-secondary)' }}>
                        {design.category}
                      </p>
                      <button className="download-button">
                        <Download size={16} /> <span style={{ marginLeft: '8px' }}>Download</span>
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Heart size={48} style={{ color: 'var(--text-secondary)', marginBottom: '16px' }} />
                <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  No saved designs yet
                </p>
                <Link to="/collections" className="btn-primary">
                  Browse Collections
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'request' && (
          <div className="tab-content">
            <div style={{ maxWidth: '600px' }}>
              <h2 className="heading-4" style={{ marginBottom: '16px' }}>Request Custom Order</h2>
              <p className="body-small" style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                Need a custom pattern or colorway? Fill out your requirements and our team will reach out.
              </p>

              <form className="request-form" onSubmit={(e) => { e.preventDefault(); handleRequestOrder(); }}>
                <div className="form-group">
                  <label className="caption" htmlFor="project-name">Project Name</label>
                  <input
                    type="text"
                    id="project-name"
                    className="form-input"
                    placeholder="E.g., Spring 2026 Collection"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="caption" htmlFor="design-type">Design Type</label>
                  <select id="design-type" className="form-input" required>
                    <option value="">Select a type</option>
                    <option value="geometric">Geometric</option>
                    <option value="organic">Organic</option>
                    <option value="abstract">Abstract</option>
                    <option value="textural">Textural</option>
                    <option value="custom">Custom / Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="caption" htmlFor="requirements">Requirements</label>
                  <textarea
                    id="requirements"
                    className="form-input"
                    rows="6"
                    placeholder="Describe your pattern needs, color preferences, intended use, timeline, etc."
                    required
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
