import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, Edit2, Trash2, Download, Eye, EyeOff, Image, Layout, Sparkles } from 'lucide-react';
import { designs, fabrics, collections } from '../mockData';
import { useToast } from '../hooks/use-toast';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('banner');
  const [showOnBanner, setShowOnBanner] = useState({
    'design-001': true,
    'design-002': false,
    'design-003': false
  });
  
  // Banner Images State (9 slots)
  const [bannerImages, setBannerImages] = useState(() => {
    const stored = localStorage.getItem('kalapop_banner_images');
    return stored ? JSON.parse(stored) : {};
  });
  
  // Featured Patterns State (8 slots)
  const [featuredPatterns, setFeaturedPatterns] = useState(() => {
    const stored = localStorage.getItem('kalapop_featured_patterns');
    return stored ? JSON.parse(stored) : {};
  });
  
  // Pattern to Fashion State (3 slots)
  const [fashionImages, setFashionImages] = useState(() => {
    const stored = localStorage.getItem('kalapop_fashion_images');
    return stored ? JSON.parse(stored) : {};
  });
  
  // Process Section Images (3 slots)
  const [processImages, setProcessImages] = useState(() => {
    const stored = localStorage.getItem('kalapop_process_images');
    return stored ? JSON.parse(stored) : {};
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

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

  const handleImageUpload = (category, slot, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        
        if (category === 'banner') {
          const updated = { ...bannerImages, [slot]: base64Image };
          setBannerImages(updated);
          localStorage.setItem('kalapop_banner_images', JSON.stringify(updated));
          toast({ title: "Banner image updated", description: `Slot ${slot.replace('slot', '')} uploaded and saved.` });
        } else if (category === 'featured') {
          const updated = { ...featuredPatterns, [slot]: base64Image };
          setFeaturedPatterns(updated);
          localStorage.setItem('kalapop_featured_patterns', JSON.stringify(updated));
          toast({ title: "Featured pattern updated", description: `Pattern ${slot.replace('pattern', '')} uploaded and saved.` });
        } else if (category === 'fashion') {
          const updated = { ...fashionImages, [slot]: base64Image };
          setFashionImages(updated);
          localStorage.setItem('kalapop_fashion_images', JSON.stringify(updated));
          toast({ title: "Fashion image updated", description: "Pattern to Fashion image uploaded and saved." });
        } else if (category === 'process') {
          const updated = { ...processImages, [slot]: base64Image };
          setProcessImages(updated);
          localStorage.setItem('kalapop_process_images', JSON.stringify(updated));
          toast({ title: "Process image updated", description: `${slot.charAt(0).toUpperCase() + slot.slice(1)} step image uploaded and saved.` });
        }
        
        // Dispatch custom event for same-tab updates
        window.dispatchEvent(new Event('kalapop-image-update'));
      };
      reader.readAsDataURL(file);
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

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="body-large">Authenticating...</p>
      </div>
    );
  }

  // Reusable Image Upload Card Component
  const ImageUploadCard = ({ label, currentImage, onUpload, size = "120px" }) => (
    <div style={{ 
      padding: '1rem', 
      background: 'var(--bg-page)', 
      border: '2px solid var(--text-primary)',
      boxShadow: '4px 4px 0 rgba(0,0,0,0.1)',
      borderRadius: '8px'
    }}>
      <p className="caption" style={{ marginBottom: '0.75rem', fontSize: '0.75rem' }}>{label}</p>
      {currentImage ? (
        <img src={currentImage} alt={label} style={{ width: '100%', height: size, objectFit: 'cover', marginBottom: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }} />
      ) : (
        <div style={{ width: '100%', height: size, background: '#f5f5f5', marginBottom: '0.75rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc' }}>
          <Image size={24} color="#999" />
        </div>
      )}
      <input type="file" accept="image/*" onChange={onUpload} style={{ fontSize: '0.75rem', width: '100%' }} />
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
          Manage all homepage images, designs, and content from one place.
        </p>

        {/* Section Tabs */}
        <div className="dashboard-tabs" style={{ flexWrap: 'wrap' }}>
          <button
            className={`tab-button ${activeSection === 'banner' ? 'active' : ''}`}
            onClick={() => setActiveSection('banner')}
            data-testid="tab-banner"
          >
            <Layout size={18} style={{ marginRight: '0.5rem' }} /> Banner Images (9)
          </button>
          <button
            className={`tab-button ${activeSection === 'featured' ? 'active' : ''}`}
            onClick={() => setActiveSection('featured')}
            data-testid="tab-featured"
          >
            <Sparkles size={18} style={{ marginRight: '0.5rem' }} /> Featured Patterns (8)
          </button>
          <button
            className={`tab-button ${activeSection === 'fashion' ? 'active' : ''}`}
            onClick={() => setActiveSection('fashion')}
            data-testid="tab-fashion"
          >
            <Image size={18} style={{ marginRight: '0.5rem' }} /> Pattern to Fashion (3)
          </button>
          <button
            className={`tab-button ${activeSection === 'process' ? 'active' : ''}`}
            onClick={() => setActiveSection('process')}
            data-testid="tab-process"
          >
            <Upload size={18} style={{ marginRight: '0.5rem' }} /> Process Steps (3)
          </button>
          <button
            className={`tab-button ${activeSection === 'designs' ? 'active' : ''}`}
            onClick={() => setActiveSection('designs')}
            data-testid="tab-designs"
          >
            <Edit2 size={18} style={{ marginRight: '0.5rem' }} /> Manage Designs
          </button>
          <button
            className={`tab-button ${activeSection === 'fabrics' ? 'active' : ''}`}
            onClick={() => setActiveSection('fabrics')}
            data-testid="tab-fabrics"
          >
            <Plus size={18} style={{ marginRight: '0.5rem' }} /> Manage Fabrics
          </button>
        </div>

        {/* SECTION 1: Banner Images (9 slots) */}
        {activeSection === 'banner' && (
          <div className="admin-section" style={{ background: 'var(--bg-vibrant-purple)', padding: '2rem' }} data-testid="section-banner">
            <h2 className="heading-3" style={{ marginBottom: '1rem' }}>Homepage Banner Images</h2>
            <p className="body-medium" style={{ marginBottom: '2rem', maxWidth: '70ch' }}>
              Upload 9 pattern images for the hero banner grid. These appear on the right side of your homepage.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <ImageUploadCard
                  key={num}
                  label={`Banner Slot ${num}`}
                  currentImage={bannerImages[`slot${num}`]}
                  onUpload={(e) => handleImageUpload('banner', `slot${num}`, e)}
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
              Upload 8 pattern images to showcase in the Featured Patterns section on homepage.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <ImageUploadCard
                  key={num}
                  label={`Featured ${num}`}
                  currentImage={featuredPatterns[`pattern${num}`]}
                  onUpload={(e) => handleImageUpload('featured', `pattern${num}`, e)}
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
              Upload 3 lifestyle/fashion images showing patterns applied to products.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {['Fashion Look 1', 'Fashion Look 2', 'Fashion Look 3'].map((label, idx) => (
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
              Upload images for Discover, Subscribe, and Download steps in "How It Works" section.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              <ImageUploadCard
                label="Discover Step"
                currentImage={processImages.discover}
                onUpload={(e) => handleImageUpload('process', 'discover', e)}
                size="120px"
              />
              <ImageUploadCard
                label="Subscribe Step"
                currentImage={processImages.subscribe}
                onUpload={(e) => handleImageUpload('process', 'subscribe', e)}
                size="120px"
              />
              <ImageUploadCard
                label="Download Step"
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
              <h2 className="heading-3" style={{ marginBottom: '1.5rem' }}>Upload New Design (Auto Watermark)</h2>
              <p className="body-medium" style={{ marginBottom: '2rem', maxWidth: '70ch' }}>
                Uploaded images will automatically have "KALAPOP" watermark applied. As admin, you can download original files without watermark.
              </p>
              <form onSubmit={handleUploadDesign}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="caption" htmlFor="design-name">Design Name</label>
                    <input type="text" id="design-name" className="form-input" placeholder="E.g., Geometric Horizon" required />
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
                    <input type="text" id="design-category" className="form-input" placeholder="E.g., Geometric, Organic" required />
                  </div>
                  <div className="form-group">
                    <label className="caption" htmlFor="design-style">Style</label>
                    <input type="text" id="design-style" className="form-input" placeholder="E.g., Contemporary Minimalist" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="caption" htmlFor="design-description">Description</label>
                  <textarea id="design-description" className="form-input" rows="3" placeholder="Brief description" required />
                </div>
                <div className="form-group">
                  <label className="caption" htmlFor="design-image">Upload Design Image</label>
                  <input type="file" id="design-image" className="form-input" accept="image/*" required />
                  <p className="body-small" style={{ marginTop: '0.5rem', fontWeight: 600 }}>Watermark auto-applied on upload</p>
                </div>
                <button type="submit" className="btn-primary">
                  <Upload size={18} style={{ marginRight: '0.5rem' }} /> Upload with Watermark
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
                  <div className="form-group">
                    <label className="caption" htmlFor="fabric-suitability">Suitability</label>
                    <input type="text" id="fabric-suitability" className="form-input" placeholder="E.g., Apparel" required />
                  </div>
                  <div className="form-group">
                    <label className="caption" htmlFor="fabric-techniques">Printing Techniques</label>
                    <input type="text" id="fabric-techniques" className="form-input" placeholder="E.g., Digital" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="caption" htmlFor="fabric-description">Description</label>
                  <textarea id="fabric-description" className="form-input" rows="3" placeholder="Brief description" required />
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
                      <button className="btn-tertiary" style={{ padding: '0.5rem 1rem' }}><Edit2 size={16} /></button>
                      <button className="btn-tertiary" style={{ padding: '0.5rem 1rem', color: 'var(--destructive)', borderColor: 'var(--destructive)' }}><Trash2 size={16} /></button>
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
