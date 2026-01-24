import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockUser, designs, fabrics } from '../mockData';
import { Heart, Mail, LogOut, Settings } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('saved');
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const { toast } = useToast();
  const user = mockUser;
  const savedDesigns = designs.filter(d => user.savedDesigns.includes(d.id));

  const handleFabricToggle = (fabricId) => {
    setSelectedFabrics(prev => 
      prev.includes(fabricId)
        ? prev.filter(id => id !== fabricId)
        : [...prev, fabricId]
    );
  };

  const handleRequestOrder = (e) => {
    e.preventDefault();
    toast({
      title: "Request sent",
      description: "Our team will contact you shortly about your order.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="dashboard-page">
      <section className="section-container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="heading-1" style={{ marginBottom: '0.5rem' }}>My Studio</h1>
            <p className="body-medium">Welcome back, {user.name}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {user.isAdmin && (
              <Link to="/admin" className="btn-secondary">
                <Settings size={18} style={{ marginRight: '0.5rem' }} /> Admin
              </Link>
            )}
            <button onClick={handleLogout} className="btn-tertiary">
              <LogOut size={18} style={{ marginRight: '0.5rem' }} /> Sign Out
            </button>
          </div>
        </div>

        {/* Account Info */}
        <div style={{ background: 'var(--bg-section)', padding: '2rem', border: '1px solid var(--border-light)', marginBottom: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <p className="caption">Email</p>
              <p className="body-medium" style={{ marginTop: '0.5rem' }}>{user.email}</p>
            </div>
            <div>
              <p className="caption">Access Tier</p>
              <p className="body-medium" style={{ marginTop: '0.5rem', textTransform: 'capitalize' }}>{user.tier}</p>
            </div>
            <div>
              <p className="caption">Saved Designs</p>
              <p className="body-medium" style={{ marginTop: '0.5rem' }}>{savedDesigns.length} patterns</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <Heart size={18} style={{ marginRight: '0.5rem' }} /> Saved Designs
          </button>
          <button
            className={`tab-button ${activeTab === 'request' ? 'active' : ''}`}
            onClick={() => setActiveTab('request')}
          >
            <Mail size={18} style={{ marginRight: '0.5rem' }} /> Request Order
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'saved' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 className="heading-3" style={{ marginBottom: '0.5rem' }}>Your Saved Designs</h2>
              <p className="body-medium">
                {savedDesigns.length} patterns saved for your projects
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
                      <div className="design-watermark">KALAPOP</div>
                      <div className={`pattern-preview ${design.thumbnail}`}></div>
                    </div>
                    <div className="design-info">
                      <h3 className="heading-5" style={{ marginBottom: '0.5rem' }}>
                        {design.name}
                      </h3>
                      <p className="caption">{design.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-section)', border: '1px solid var(--border-light)' }}>
                <Heart size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }} />
                <p className="body-large" style={{ marginBottom: '1.5rem' }}>
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
          <div>
            <div style={{ maxWidth: '700px' }}>
              <h2 className="heading-3" style={{ marginBottom: '1rem' }}>Request Custom Order</h2>
              <p className="body-medium" style={{ marginBottom: '2rem' }}>
                Provide details about your project. Our team will prepare design files and coordinate with trusted printing partners.
              </p>

              <form onSubmit={handleRequestOrder}>
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
                  <label className="caption" htmlFor="design-id">Select Design</label>
                  <select id="design-id" className="form-input form-select" required>
                    <option value="">Choose a design</option>
                    {savedDesigns.map(design => (
                      <option key={design.id} value={design.id}>{design.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="caption">Select Fabrics (Optional)</label>
                  <p className="body-small" style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                    Choose fabrics suitable for your project. This helps us prepare accurately.
                  </p>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {fabrics.slice(0, 4).map((fabric) => (
                      <div
                        key={fabric.id}
                        className={`fabric-option ${selectedFabrics.includes(fabric.id) ? 'selected' : ''}`}
                        onClick={() => handleFabricToggle(fabric.id)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <p className="body-medium" style={{ fontWeight: 600 }}>{fabric.name}</p>
                          <p className="caption">{fabric.weight}</p>
                        </div>
                        <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                          {fabric.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="caption" htmlFor="scale">Scale Preference</label>
                  <input
                    type="text"
                    id="scale"
                    className="form-input"
                    placeholder="E.g., 24x24 inch repeat"
                  />
                </div>

                <div className="form-group">
                  <label className="caption" htmlFor="requirements">Additional Requirements</label>
                  <textarea
                    id="requirements"
                    className="form-input"
                    rows="6"
                    placeholder="Describe your project needs, timeline, quantity, etc."
                    required
                  />
                </div>

                <button type="submit" className="btn-primary">
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