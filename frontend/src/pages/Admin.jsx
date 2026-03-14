import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, Edit2, Trash2, Download, Eye, EyeOff, Image, Layout, Sparkles } from 'lucide-react';
import { designs, fabrics, collections } from '../mockData';
import { useToast } from '../hooks/use-toast';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Admin = () => {
  const [activeSection, setActiveSection] = useState('banner');
  const [showOnBanner, setShowOnBanner] = useState({
    'design-001': true,
    'design-002': false,
    'design-003': false
  });
  
  // Image states - loaded from backend
  const [bannerImages, setBannerImages] = useState({});
  const [featuredPatterns, setFeaturedPatterns] = useState({});
  const [fashionImages, setFashionImages] = useState({});
  const [processImages, setProcessImages] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Load images from backend on mount
  useEffect(() => {
    fetchSiteImages();
  }, []);

  const fetchSiteImages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/site-images`);
      if (response.ok) {
        const data = await response.json();
        setBannerImages(data.banner_images || {});
        setFeaturedPatterns(data.featured_patterns || {});
        setFashionImages(data.fashion_images || {});
        setProcessImages(data.process_images || {});
      }
    } catch (error) {
      console.error('Error fetching site images:', error);
    }
  };

  React.useEffect(() => {
    const authStatus = localStorage.getItem('kalapop_admin_auth');
    const sessionTime = localStorage.getItem('kalapop_admin_session');
    const isSessionValid = sessionTime && (Date.now() - parseInt(sessionTime)) < 24 * 60 * 60 * 1000;
    
    if (authStatus === 'true' && isSessionValid) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('kalapop_admin_auth');
      localStorage.removeItem('kalapop_admin_session');
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleImageUpload = async (category, slot, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_URL}/api/upload-image/${category}/${slot}`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update local state with new image URL
        if (category === 'banner') {
          setBannerImages(prev => ({ ...prev, [slot]: data.image_url }));
        } else if (category === 'featured') {
          setFeaturedPatterns(prev => ({ ...prev, [slot]: data.image_url }));
        } else if (category === 'fashion') {
          setFashionImages(prev => ({ ...prev, [slot]: data.image_url }));
        } else if (category === 'process') {
          setProcessImages(prev => ({ ...prev, [slot]: data.image_url }));
        }

        toast({ 
          title: "Image uploaded!", 
          description: `${category} image saved successfully.` 
        });

        // Trigger refresh event for homepage
        window.dispatchEvent(new Event('kalapop-image-update'));
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({ 
        title: "Upload failed", 
        description: "Please try again with a smaller image.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

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
  };

  const toggleBannerDisplay = (designId) => {
    setShowOnBanner(prev => ({ ...prev, [designId]: !prev[designId] }));
    toast({
      title: showOnBanner[designId] ? "Removed from banner" : "Added to banner",
      description: `Design ${showOnBanner[designId] ? 'hidden from' : 'displayed on'} homepage banner.`,
    });
  };

  const handleAddFabric = (e) => {
    e.preventDefault();
    toast({ title: "Fabric added", description: "New fabric option has been added to the library." });
  };

  const handleLogout = () => {
    localStorage.removeItem('kalapop_admin_auth');
    localStorage.removeItem('kalapop_admin_session');
    toast({ title: "Logged out", description: "You have been logged out successfully." });
    navigate('/admin-login');
  };

  const handleDeletePattern = async (category, slot) => {
    if (!window.confirm('Are you sure you want to delete this pattern?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/site-images/${category}/${slot}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Update local state
        if (category === 'banner') {
          setBannerImages(prev => {
            const updated = { ...prev };
            delete updated[slot];
            return updated;
          });
        } else if (category === 'featured') {
          setFeaturedPatterns(prev => {
            const updated = { ...prev };
            delete updated[slot];
            return updated;
          });
        } else if (category === 'fashion') {
          setFashionImages(prev => {
            const updated = { ...prev };
            delete updated[slot];
            return updated;
          });
        } else if (category === 'process') {
          setProcessImages(prev => {
            const updated = { ...prev };
            delete updated[slot];
            return updated;
          });
        }

        toast({ 
          title: "Pattern deleted", 
          description: "The pattern has been removed successfully." 
        });

        // Trigger refresh event for homepage
        window.dispatchEvent(new Event('kalapop-image-update'));
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast({ 
        title: "Delete failed", 
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="body-large">Authenticating...</p>
      </div>
    );
  }

  // Reusable Image Upload Card Component
  const ImageUploadCard = ({ label, currentImage, onUpload, onDelete, size = "120px" }) => (
    <div style={{ 
      padding: '1rem', 
      background: 'var(--bg-page)', 
      border: '2px solid var(--text-primary)',
      boxShadow: '4px 4px 0 rgba(0,0,0,0.1)',
      borderRadius: '8px',
      position: 'relative'
    }}>
      <p className="caption" style={{ marginBottom: '0.75rem', fontSize: '0.75rem' }}>{label}</p>
      {currentImage ? (
        <>
          <img 
            src={currentImage.startsWith('/api') ? `${API_URL}${currentImage}` : currentImage} 
            alt={label} 
            style={{ width: '100%', height: size, objectFit: 'cover', marginBottom: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }} 
          />
          {onDelete && (
            <button
              onClick={onDelete}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: '#E74C3C',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
              title="Delete pattern"
            >
              <Trash2 size={14} />
            </button>
          )}
        </>
      ) : (
        <div style={{ width: '100%', height: size, background: '#f5f5f5', marginBottom: '0.75rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc' }}>
          <Image size={24} color="#999" />
        </div>
      )}
      <input 
        type="file" 
        accept="image/*" 
        onChange={onUpload} 
        disabled={isUploading}
        style={{ fontSize: '0.75rem', width: '100%' }} 
      />
      {isUploading && <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.5rem' }}>Uploading...</p>}
    </div>
  );

  return (
    <div className="admin-page" data-testid="admin-page">
      <section className="section-container">
        {/* Header with Sign Out */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Link to="/dashboard" className="btn-tertiary" data-testid="back-to-dashboard-btn">
            <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back to Dashboard
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              padding: '0.75rem 1.5rem', 
              background: 'var(--bg-vibrant-yellow)', 
              border: '3px solid var(--text-primary)',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.875rem'
            }}>
              Admin Mode
            </div>
            <button 
              onClick={handleLogout} 
              className="btn-tertiary"
              data-testid="admin-signout-btn"
              style={{ 
                padding: '0.75rem 1.5rem',
                background: 'var(--bg-vibrant-pink)',
                color: 'var(--text-inverse)',
                border: '3px solid var(--text-primary)',
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '0.875rem'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        <h1 className="heading-1" style={{ marginBottom: '1rem' }}>ADMIN PANEL</h1>
        <p className="body-medium" style={{ marginBottom: '3rem' }}>
          Manage all homepage images, designs, and content. Images are stored on the server.
        </p>

        {/* Section Tabs */}
        <div className="dashboard-tabs" style={{ flexWrap: 'wrap' }}>
          <button
            className={`tab-button ${activeSection === 'banner' ? 'active' : ''}`}
            onClick={() => setActiveSection('banner')}
            data-testid="tab-banner"
          >
            <Layout size={18} style={{ marginRight: '0.5rem' }} /> Banner (9)
          </button>
          <button
            className={`tab-button ${activeSection === 'featured' ? 'active' : ''}`}
            onClick={() => setActiveSection('featured')}
            data-testid="tab-featured"
          >
            <Sparkles size={18} style={{ marginRight: '0.5rem' }} /> Featured (8)
          </button>
          <button
            className={`tab-button ${activeSection === 'fashion' ? 'active' : ''}`}
            onClick={() => setActiveSection('fashion')}
            data-testid="tab-fashion"
          >
            <Image size={18} style={{ marginRight: '0.5rem' }} /> Fashion (3)
          </button>
          <button
            className={`tab-button ${activeSection === 'process' ? 'active' : ''}`}
            onClick={() => setActiveSection('process')}
            data-testid="tab-process"
          >
            <Upload size={18} style={{ marginRight: '0.5rem' }} /> Process (3)
          </button>
          <button
            className={`tab-button ${activeSection === 'designs' ? 'active' : ''}`}
            onClick={() => setActiveSection('designs')}
            data-testid="tab-designs"
          >
            <Edit2 size={18} style={{ marginRight: '0.5rem' }} /> Designs
          </button>
          <button
            className={`tab-button ${activeSection === 'fabrics' ? 'active' : ''}`}
            onClick={() => setActiveSection('fabrics')}
            data-testid="tab-fabrics"
          >
            <Plus size={18} style={{ marginRight: '0.5rem' }} /> Fabrics
          </button>
        </div>

        {/* SECTION 1: Banner Images (9 slots) */}
        {activeSection === 'banner' && (
          <div className="admin-section" style={{ background: 'var(--bg-vibrant-purple)', padding: '2rem' }} data-testid="section-banner">
            <h2 className="heading-3" style={{ marginBottom: '1rem' }}>Homepage Banner Images</h2>
            <p className="body-medium" style={{ marginBottom: '2rem', maxWidth: '70ch' }}>
              Upload 9 pattern images for the hero banner grid. Click the red button to delete.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <ImageUploadCard
                  key={num}
                  label={`Slot ${num}`}
                  currentImage={bannerImages[`slot${num}`]}
                  onUpload={(e) => handleImageUpload('banner', `slot${num}`, e)}
                  onDelete={bannerImages[`slot${num}`] ? () => handleDeletePattern('banner', `slot${num}`) : null}
                  size="100px"
                />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: Featured Patterns (8 slots) */}
        {activeSection === 'featured' && (
          <div className="admin-section" style={{ background: 'var(--bg-vibrant-yellow)', padding: '2rem' }} data-testid="section-featured">
            <h2 className="heading-3" style={{ marginBottom: '1rem' }}>Featured Patterns</h2>
            <p className="body-medium" style={{ marginBottom: '2rem', maxWidth: '70ch' }}>
              Upload 8 pattern images for the Featured Patterns section. Click the red button to delete.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <ImageUploadCard
                  key={num}
                  label={`Pattern ${num}`}
                  currentImage={featuredPatterns[`pattern${num}`]}
                  onUpload={(e) => handleImageUpload('featured', `pattern${num}`, e)}
                  onDelete={featuredPatterns[`pattern${num}`] ? () => handleDeletePattern('featured', `pattern${num}`) : null}
                  size="120px"
                />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: Pattern to Fashion (3 slots) */}
        {activeSection === 'fashion' && (
          <div className="admin-section" style={{ background: 'var(--bg-vibrant-orange)', padding: '2rem' }} data-testid="section-fashion">
            <h2 className="heading-3" style={{ marginBottom: '1rem', color: 'var(--text-inverse)' }}>Pattern to Fashion</h2>
            <p className="body-medium" style={{ marginBottom: '2rem', maxWidth: '70ch', color: 'var(--text-inverse)' }}>
              Upload 3 fashion mockup images showing patterns on clothing.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {['Look 1', 'Look 2', 'Look 3'].map((label, idx) => (
                <ImageUploadCard
                  key={idx}
                  label={label}
                  currentImage={fashionImages[`fashion${idx + 1}`]}
                  onUpload={(e) => handleImageUpload('fashion', `fashion${idx + 1}`, e)}
                  size="180px"
                />
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Process Step Images (3 slots) */}
        {activeSection === 'process' && (
          <div className="admin-section" style={{ background: 'var(--bg-vibrant-pink)', padding: '2rem' }} data-testid="section-process">
            <h2 className="heading-3" style={{ marginBottom: '1rem', color: 'var(--text-inverse)' }}>Process Step Images</h2>
            <p className="body-medium" style={{ marginBottom: '2rem', maxWidth: '70ch', color: 'var(--text-inverse)' }}>
              Upload images for Discover, Subscribe, and Download steps.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              <ImageUploadCard
                label="Discover"
                currentImage={processImages.discover}
                onUpload={(e) => handleImageUpload('process', 'discover', e)}
                size="120px"
              />
              <ImageUploadCard
                label="Subscribe"
                currentImage={processImages.subscribe}
                onUpload={(e) => handleImageUpload('process', 'subscribe', e)}
                size="120px"
              />
              <ImageUploadCard
                label="Download"
                currentImage={processImages.download}
                onUpload={(e) => handleImageUpload('process', 'download', e)}
                size="120px"
              />
            </div>
          </div>
        )}

        {/* SECTION 5: Manage Designs */}
        {activeSection === 'designs' && (
          <div>
            <div className="admin-section" style={{ background: 'var(--bg-vibrant-purple)', color: 'var(--text-primary)' }}>
              <h2 className="heading-3" style={{ marginBottom: '1.5rem' }}>Upload New Design</h2>
              <form onSubmit={handleUploadDesign}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="caption" htmlFor="design-name">Design Name</label>
                    <input type="text" id="design-name" className="form-input" placeholder="E.g., Geometric Horizon" required />
                  </div>
                  <div className="form-group">
                    <label className="caption" htmlFor="design-collection">Collection</label>
                    <select id="design-collection" className="form-input form-select" required>
                      <option value="">Select collection</option>
                      {collections.map(col => (
                        <option key={col.id} value={col.tier}>{col.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="caption" htmlFor="design-category">Category</label>
                    <input type="text" id="design-category" className="form-input" placeholder="E.g., Geometric" required />
                  </div>
                  <div className="form-group">
                    <label className="caption" htmlFor="design-style">Style</label>
                    <input type="text" id="design-style" className="form-input" placeholder="E.g., Modern" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="caption" htmlFor="design-image">Upload Image</label>
                  <input type="file" id="design-image" className="form-input" accept="image/*" required />
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
                  <div key={design.id} style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    padding: '1.5rem', background: showOnBanner[design.id] ? 'var(--bg-vibrant-yellow)' : 'var(--bg-page)', 
                    border: '3px solid var(--text-primary)', boxShadow: 'var(--shadow-bold)'
                  }}>
                    <div style={{ flex: 1 }}>
                      <p className="body-medium" style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{design.name}</p>
                      <p className="caption">{design.collection.toUpperCase()} • {design.category}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-tertiary" style={{ padding: '0.75rem 1rem' }} onClick={() => toggleBannerDisplay(design.id)}>
                        {showOnBanner[design.id] ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button className="btn-tertiary" style={{ padding: '0.75rem 1rem' }} onClick={() => handleDownloadWithoutWatermark(design.id)}>
                        <Download size={18} />
                      </button>
                      <button className="btn-tertiary" style={{ padding: '0.75rem 1rem' }}><Edit2 size={18} /></button>
                      <button className="btn-tertiary" style={{ padding: '0.75rem 1rem', borderColor: '#E74C3C', color: '#E74C3C' }}><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: Manage Fabrics */}
        {activeSection === 'fabrics' && (
          <div>
            <div className="admin-section">
              <h2 className="heading-3" style={{ marginBottom: '1.5rem' }}>Add New Fabric</h2>
              <form onSubmit={handleAddFabric}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="caption" htmlFor="fabric-name">Fabric Name</label>
                    <input type="text" id="fabric-name" className="form-input" placeholder="E.g., Cotton Poplin" required />
                  </div>
                  <div className="form-group">
                    <label className="caption" htmlFor="fabric-weight">Weight (GSM)</label>
                    <input type="text" id="fabric-weight" className="form-input" placeholder="E.g., 120 GSM" required />
                  </div>
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
                      <p className="body-medium" style={{ fontWeight: 600 }}>{fabric.name}</p>
                      <p className="caption">{fabric.weight}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-tertiary" style={{ padding: '0.5rem 1rem' }}><Edit2 size={16} /></button>
                      <button className="btn-tertiary" style={{ padding: '0.5rem 1rem', color: '#E74C3C', borderColor: '#E74C3C' }}><Trash2 size={16} /></button>
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
