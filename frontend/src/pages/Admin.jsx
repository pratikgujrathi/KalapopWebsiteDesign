import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, Edit2, Trash2, Download, Eye, EyeOff } from 'lucide-react';
import { designs, fabrics, collections } from '../mockData';
import { useToast } from '../hooks/use-toast';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('designs');
  const [showOnBanner, setShowOnBanner] = useState({
    'design-001': true,
    'design-002': false,
    'design-003': false
  });
  const [bannerSlots, setBannerSlots] = useState({
    slot1: null,
    slot2: null,
    slot3: null,
    slot4: null
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is admin (in real implementation, check auth state)
  const isAdminAuthenticated = true; // Mock - should check actual auth

  React.useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin-login');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleUploadDesign = (e) => {
    e.preventDefault();
    toast({
      title: "Design uploaded with watermark",
      description: "Watermark has been automatically applied to the uploaded image.",
    });
  };

  const handleDownloadWithoutWatermark = (designId) => {
    toast({
      title: "Downloading without watermark",
      description: "Admin download: Original image without watermark.",
    });
    // In real implementation: fetch original image from server
  };

  const toggleBannerDisplay = (designId) => {
    setShowOnBanner(prev => ({
      ...prev,
      [designId]: !prev[designId]
    }));
    toast({
      title: showOnBanner[designId] ? "Removed from banner" : "Added to banner",
      description: `Design ${showOnBanner[designId] ? 'hidden from' : 'displayed on'} homepage banner.`,
    });
  };

  const handleAddFabric = (e) => {
    e.preventDefault();
    toast({
      title: "Fabric added",
      description: "New fabric option has been added to the library.",
    });
  };

  return (
    <div className="admin-page">
      <section className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Link to="/dashboard" className="btn-tertiary">
            <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back to Dashboard
          </Link>
          <div style={{ 
            padding: '0.75rem 1.5rem', 
            background: 'var(--bg-vibrant-yellow)', 
            border: '3px solid var(--text-primary)',
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '0.875rem'
          }}>
            Admin Mode - Secure Access
          </div>
        </div>

        <h1 className="heading-1" style={{ marginBottom: '1rem' }}>ADMIN PANEL</h1>
        <p className="body-medium" style={{ marginBottom: '3rem' }}>
          Manage designs, upload images with automatic watermarking, control banner display, and download original files.
        </p>

        {/* Section Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeSection === 'designs' ? 'active' : ''}`}
            onClick={() => setActiveSection('designs')}
          >
            <Edit2 size={18} style={{ marginRight: '0.5rem' }} /> Manage Designs & Banner
          </button>
          <button
            className={`tab-button ${activeSection === 'fabrics' ? 'active' : ''}`}
            onClick={() => setActiveSection('fabrics')}
          >
            <Plus size={18} style={{ marginRight: '0.5rem' }} /> Manage Fabrics
          </button>
        </div>

        {/* Manage Designs Section */}
        {activeSection === 'designs' && (
          <div>
            <div className="admin-section" style={{ background: 'var(--bg-vibrant-purple)', color: 'var(--text-primary)' }}>
              <h2 className="heading-3" style={{ marginBottom: '1.5rem' }}>Upload New Design (Auto Watermark)</h2>
              <p className="body-medium" style={{ marginBottom: '2rem', maxWidth: '70ch' }}>
                Upload images will automatically have "KALAPOP" watermark applied. As admin, you can download original files without watermark.
              </p>
              <form onSubmit={handleUploadDesign}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="caption" htmlFor="design-name">Design Name</label>
                    <input
                      type="text"
                      id="design-name"
                      className="form-input"
                      placeholder="E.g., Geometric Horizon"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="caption" htmlFor="design-collection">Assign to Collection</label>
                    <select id="design-collection" className="form-input form-select" required>
                      <option value="">Select collection</option>
                      {collections.map(col => (
                        <option key={col.id} value={col.tier}>{col.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="caption" htmlFor="design-category">Category</label>
                    <input
                      type="text"
                      id="design-category"
                      className="form-input"
                      placeholder="E.g., Geometric, Organic, Abstract"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="caption" htmlFor="design-style">Style</label>
                    <input
                      type="text"
                      id="design-style"
                      className="form-input"
                      placeholder="E.g., Contemporary Minimalist"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="caption" htmlFor="design-description">Description</label>
                  <textarea
                    id="design-description"
                    className="form-input"
                    rows="3"
                    placeholder="Brief description of the design"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="caption" htmlFor="design-image">Upload Design Image</label>
                  <input
                    type="file"
                    id="design-image"
                    className="form-input"
                    accept="image/*"
                    required
                  />
                  <p className="body-small" style={{ marginTop: '0.5rem', fontWeight: 600 }}>
                    ⚠️ Watermark will be automatically added upon upload
                  </p>
                </div>

                <button type="submit" className="btn-primary">
                  <Upload size={18} style={{ marginRight: '0.5rem' }} /> Upload with Watermark
                </button>
              </form>
            </div>

            <div className="admin-section">
              <h2 className="heading-3" style={{ marginBottom: '1.5rem' }}>Existing Designs - Banner & Download Control</h2>
              <p className="body-medium" style={{ marginBottom: '2rem' }}>
                Toggle banner display and download original images without watermark (admin only).
              </p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {designs.map((design) => (
                  <div key={design.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '1.5rem', 
                    background: showOnBanner[design.id] ? 'var(--bg-vibrant-yellow)' : 'var(--bg-page)', 
                    border: '3px solid var(--text-primary)',
                    boxShadow: 'var(--shadow-bold)'
                  }}>
                    <div style={{ flex: 1 }}>
                      <p className="body-medium" style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{design.name}</p>
                      <p className="caption">{design.collection.toUpperCase()} • {design.category}</p>
                      {showOnBanner[design.id] && (
                        <span style={{ 
                          display: 'inline-block',
                          marginTop: '0.5rem',
                          padding: '0.25rem 0.75rem',
                          background: 'var(--text-primary)',
                          color: 'var(--text-inverse)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}>
                          Displayed on Banner
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className="btn-tertiary" 
                        style={{ padding: '0.75rem 1rem' }}
                        onClick={() => toggleBannerDisplay(design.id)}
                        title={showOnBanner[design.id] ? "Remove from banner" : "Show on banner"}
                      >
                        {showOnBanner[design.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button 
                        className="btn-tertiary" 
                        style={{ padding: '0.75rem 1rem' }}
                        onClick={() => handleDownloadWithoutWatermark(design.id)}
                        title="Download without watermark (admin only)"
                      >
                        <Download size={18} />
                      </button>
                      <button className="btn-tertiary" style={{ padding: '0.75rem 1rem' }}>
                        <Edit2 size={18} />
                      </button>
                      <button className="btn-tertiary" style={{ padding: '0.75rem 1rem', borderColor: '#E74C3C', color: '#E74C3C' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Manage Fabrics Section */}
        {activeSection === 'fabrics' && (
          <div>
            <div className="admin-section">
              <h2 className="heading-3" style={{ marginBottom: '1.5rem' }}>Add New Fabric</h2>
              <form onSubmit={handleAddFabric}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="caption" htmlFor="fabric-name">Fabric Name</label>
                    <input
                      type="text"
                      id="fabric-name"
                      className="form-input"
                      placeholder="E.g., Cotton Poplin"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="caption" htmlFor="fabric-weight">Weight (GSM)</label>
                    <input
                      type="text"
                      id="fabric-weight"
                      className="form-input"
                      placeholder="E.g., 120 GSM"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="caption" htmlFor="fabric-suitability">Suitability</label>
                    <input
                      type="text"
                      id="fabric-suitability"
                      className="form-input"
                      placeholder="E.g., Apparel, Light furnishings"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="caption" htmlFor="fabric-techniques">Printing Techniques</label>
                    <input
                      type="text"
                      id="fabric-techniques"
                      className="form-input"
                      placeholder="E.g., Digital, Screen printing"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="caption" htmlFor="fabric-description">Description</label>
                  <textarea
                    id="fabric-description"
                    className="form-input"
                    rows="3"
                    placeholder="Brief description of the fabric characteristics"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary">
                  <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Fabric
                </button>
              </form>
            </div>

            <div className="admin-section">
              <h2 className="heading-3" style={{ marginBottom: '1.5rem' }}>Existing Fabrics</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {fabrics.map((fabric) => (
                  <div key={fabric.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-page)', border: '1px solid var(--border-light)' }}>
                    <div>
                      <p className="body-medium" style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{fabric.name}</p>
                      <p className="caption">{fabric.weight} • {fabric.suitability}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-tertiary" style={{ padding: '0.5rem 1rem' }}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-tertiary" style={{ padding: '0.5rem 1rem', color: 'var(--destructive)', borderColor: 'var(--destructive)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;