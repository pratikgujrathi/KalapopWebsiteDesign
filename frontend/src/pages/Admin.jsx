import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, Edit2, Trash2 } from 'lucide-react';
import { designs, fabrics, collections } from '../mockData';
import { useToast } from '../hooks/use-toast';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('designs');
  const { toast } = useToast();

  const handleUploadDesign = (e) => {
    e.preventDefault();
    toast({
      title: "Design uploaded",
      description: "New design has been added to the collection.",
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
        <Link to="/dashboard" className="btn-tertiary" style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back to Dashboard
        </Link>

        <h1 className="heading-1" style={{ marginBottom: '3rem' }}>Admin Panel</h1>

        {/* Section Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeSection === 'designs' ? 'active' : ''}`}
            onClick={() => setActiveSection('designs')}
          >
            <Edit2 size={18} style={{ marginRight: '0.5rem' }} /> Manage Designs
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
            <div className="admin-section">
              <h2 className="heading-3" style={{ marginBottom: '1.5rem' }}>Upload New Design</h2>
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
                  <label className="caption" htmlFor="design-intent">Design Intent</label>
                  <textarea
                    id="design-intent"
                    className="form-input"
                    rows="3"
                    placeholder="Inspiration and conceptual thinking behind the design"
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
                  <p className="body-small" style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)' }}>
                    Recommended: High-resolution image, minimum 2000x2000px
                  </p>
                </div>

                <button type="submit" className="btn-primary">
                  <Upload size={18} style={{ marginRight: '0.5rem' }} /> Upload Design
                </button>
              </form>
            </div>

            <div className="admin-section">
              <h2 className="heading-3" style={{ marginBottom: '1.5rem' }}>Existing Designs</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {designs.map((design) => (
                  <div key={design.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-page)', border: '1px solid var(--border-light)' }}>
                    <div>
                      <p className="body-medium" style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{design.name}</p>
                      <p className="caption">{design.collection.toUpperCase()} • {design.category}</p>
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