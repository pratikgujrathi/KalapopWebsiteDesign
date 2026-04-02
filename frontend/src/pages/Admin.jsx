import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, Edit2, Trash2, Download, Eye, EyeOff, Image, Layout, Sparkles, X } from 'lucide-react';
import { fabrics } from '../mockData';
import { useToast } from '../hooks/use-toast';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Collection options
const COLLECTION_OPTIONS = [
  { value: 'collection', label: 'Collection' },
  { value: 'limited_edition', label: 'Limited Edition' }
];

// Category options
const CATEGORY_OPTIONS = [
  'Floral',
  'Tropical',
  'Abstract',
  'Geometric',
  'Textures',
  'Minimal',
  'Bold'
];

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
  
  // Designs state - fetched from backend
  const [designs, setDesigns] = useState([]);
  
  // Keywords state for the tag input
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Fetch designs from backend on mount
  useEffect(() => {
    fetchDesigns();
  }, []);
  
  const fetchDesigns = async () => {
    try {
      const response = await fetch(`${API_URL}/api/designs`);
      if (response.ok) {
        const data = await response.json();
        setDesigns(data.designs || []);
      }
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };

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

  const handleUploadDesign = async (e) => {
    e.preventDefault();
    
    const name = e.target.querySelector('#design-name').value;
    const collection = e.target.querySelector('#design-collection').value;
    const category = e.target.querySelector('#design-category').value;
    const description = e.target.querySelector('#design-description').value;
    const fileInput = e.target.querySelector('#design-image');
    const file = fileInput.files[0];
    
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please select an image to upload.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Join keywords with commas for the API
      const keywordsString = keywords.join(',');
      
      const response = await fetch(
        `${API_URL}/api/designs?name=${encodeURIComponent(name)}&collection=${encodeURIComponent(collection)}&category=${encodeURIComponent(category)}&description=${encodeURIComponent(description)}&keywords=${encodeURIComponent(keywordsString)}`,
        {
          method: 'POST',
          body: formData
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        
        // Add the new design to local state
        setDesigns(prevDesigns => [...prevDesigns, data.design]);
        
        // Get collection label for toast
        const collectionLabel = COLLECTION_OPTIONS.find(c => c.value === collection)?.label || collection;
        
        toast({
          title: "Design uploaded with watermark!",
          description: `"${name}" has been added to ${collectionLabel}.`,
        });
        
        // Reset form and keywords
        e.target.reset();
        setKeywords([]);
        setKeywordInput('');
        
        // Trigger refresh event for Collections page
        window.dispatchEvent(new Event('kalapop-designs-update'));
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle adding a keyword
  const handleAddKeyword = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const keyword = keywordInput.trim().replace(',', '');
      if (keyword && !keywords.includes(keyword)) {
        setKeywords([...keywords, keyword]);
      }
      setKeywordInput('');
    }
  };
  
  // Handle removing a keyword
  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter(k => k !== keywordToRemove));
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

  // Delete design function - now calls backend
  const handleDeleteDesign = async (designId, designName) => {
    if (window.confirm(`Are you sure you want to delete "${designName}"?`)) {
      try {
        const response = await fetch(`${API_URL}/api/designs/${designId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setDesigns(prevDesigns => prevDesigns.filter(d => d.id !== designId));
          toast({
            title: "Design deleted",
            description: `"${designName}" has been removed successfully.`
          });
          
          // Trigger refresh event for Collections page
          window.dispatchEvent(new Event('kalapop-designs-update'));
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete();
              }}
              type="button"
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: '#E74C3C',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                zIndex: 100
              }}
              title="Delete image"
            >
              <Trash2 size={16} />
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

        {/* SECTION 3: Pattern to Product (Patterns + Styles) */}
        {activeSection === 'fashion' && (
          <div className="admin-section" style={{ background: 'var(--bg-vibrant-orange)', padding: '2rem' }} data-testid="section-fashion">
            <h2 className="heading-3" style={{ marginBottom: '1rem', color: 'var(--text-inverse)' }}>Pattern to Product</h2>
            <p className="body-medium" style={{ marginBottom: '2rem', maxWidth: '70ch', color: 'var(--text-inverse)' }}>
              Upload pattern images and their corresponding style/product images for the "Pattern to Product" section.
            </p>
            
            <h3 className="heading-4" style={{ marginBottom: '1rem', color: 'var(--text-inverse)' }}>Patterns</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
              {['Pattern 1', 'Pattern 2', 'Pattern 3'].map((label, idx) => (
                <ImageUploadCard
                  key={`pattern-${idx}`}
                  label={label}
                  currentImage={featuredPatterns[`pattern${idx + 1}`]}
                  onUpload={(e) => handleImageUpload('featured', `pattern${idx + 1}`, e)}
                  onDelete={featuredPatterns[`pattern${idx + 1}`] ? () => handleDeletePattern('featured', `pattern${idx + 1}`) : null}
                  size="120px"
                />
              ))}
            </div>

            <h3 className="heading-4" style={{ marginBottom: '1rem', color: 'var(--text-inverse)' }}>Styles (Products)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {['Summer Dress', 'Co-ord Set', 'Home Cushion'].map((label, idx) => (
                <ImageUploadCard
                  key={`style-${idx}`}
                  label={label}
                  currentImage={fashionImages[`fashion${idx + 1}`]}
                  onUpload={(e) => handleImageUpload('fashion', `fashion${idx + 1}`, e)}
                  onDelete={fashionImages[`fashion${idx + 1}`] ? () => handleDeletePattern('fashion', `fashion${idx + 1}`) : null}
                  size="150px"
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
                    <label className="caption" htmlFor="design-name">Design Name *</label>
                    <input type="text" id="design-name" className="form-input" placeholder="E.g., Tropical Paradise" required />
                  </div>
                  <div className="form-group">
                    <label className="caption" htmlFor="design-collection">Collection *</label>
                    <select id="design-collection" className="form-input form-select" required>
                      <option value="">Select collection</option>
                      {COLLECTION_OPTIONS.map(col => (
                        <option key={col.value} value={col.value}>{col.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="caption" htmlFor="design-category">Category *</label>
                    <select id="design-category" className="form-input form-select" required>
                      <option value="">Select category</option>
                      {CATEGORY_OPTIONS.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="caption" htmlFor="design-image">Upload Image *</label>
                    <input type="file" id="design-image" className="form-input" accept="image/*" required />
                  </div>
                </div>
                
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label className="caption" htmlFor="design-description">Description</label>
                  <textarea 
                    id="design-description" 
                    className="form-input" 
                    placeholder="Describe the pattern, its inspiration, and best use cases..."
                    rows={3}
                    style={{ resize: 'vertical', minHeight: '80px' }}
                  />
                </div>
                
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label className="caption">Keywords (press Enter or comma to add)</label>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.5rem', 
                    padding: '0.75rem', 
                    background: 'white', 
                    border: '2px solid var(--text-primary)',
                    borderRadius: '8px',
                    minHeight: '50px'
                  }}>
                    {keywords.map((keyword, idx) => (
                      <span 
                        key={idx} 
                        style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '0.25rem',
                          background: 'var(--bg-vibrant-yellow)', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          border: '2px solid var(--text-primary)'
                        }}
                      >
                        {keyword}
                        <button 
                          type="button"
                          onClick={() => handleRemoveKeyword(keyword)}
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer', 
                            padding: '2px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    <input 
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={handleAddKeyword}
                      placeholder={keywords.length === 0 ? "E.g., summer, vibrant, nature..." : "Add more..."}
                      style={{ 
                        border: 'none', 
                        outline: 'none', 
                        flex: 1, 
                        minWidth: '150px',
                        fontSize: '0.875rem',
                        background: 'transparent'
                      }}
                    />
                  </div>
                </div>
                
                <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem' }} disabled={isUploading}>
                  <Upload size={18} style={{ marginRight: '0.5rem' }} /> 
                  {isUploading ? 'Uploading...' : 'Upload Design'}
                </button>
              </form>
            </div>

            <div className="admin-section">
              <h2 className="heading-3" style={{ marginBottom: '1.5rem' }}>Existing Designs ({designs.length})</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {designs.map((design) => (
                  <div key={design.id} style={{ 
                    background: showOnBanner[design.id] ? 'var(--bg-vibrant-yellow)' : 'var(--bg-page)', 
                    border: '3px solid var(--text-primary)', 
                    boxShadow: 'var(--shadow-bold)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    {/* Design Image Preview */}
                    <div style={{ 
                      width: '100%', 
                      height: '180px', 
                      background: '#f5f5f5',
                      position: 'relative'
                    }}>
                      {design.image_url ? (
                        <img 
                          src={design.image_url.startsWith('/api') ? `${API_URL}${design.image_url}` : design.image_url}
                          alt={design.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div className={`pattern-preview ${design.thumbnail}`} style={{ 
                          width: '100%', 
                          height: '100%'
                        }}></div>
                      )}
                      {/* Delete Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteDesign(design.id, design.name);
                        }}
                        type="button"
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: '#E74C3C',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                          zIndex: 10
                        }}
                        title={`Delete ${design.name}`}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    {/* Design Info */}
                    <div style={{ padding: '1rem' }}>
                      <p className="body-medium" style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{design.name}</p>
                      <p className="caption" style={{ marginBottom: '0.5rem' }}>
                        {COLLECTION_OPTIONS.find(c => c.value === design.collection)?.label || design.collection} • {design.category}
                      </p>
                      {design.description && (
                        <p className="caption" style={{ marginBottom: '0.5rem', color: '#666', fontSize: '0.75rem' }}>
                          {design.description.length > 80 ? design.description.slice(0, 80) + '...' : design.description}
                        </p>
                      )}
                      {design.keywords && design.keywords.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.75rem' }}>
                          {design.keywords.slice(0, 4).map((keyword, idx) => (
                            <span key={idx} style={{ 
                              background: '#f0f0f0', 
                              padding: '0.15rem 0.5rem', 
                              borderRadius: '10px',
                              fontSize: '0.65rem',
                              color: '#555'
                            }}>
                              {keyword}
                            </span>
                          ))}
                          {design.keywords.length > 4 && (
                            <span style={{ fontSize: '0.65rem', color: '#888' }}>+{design.keywords.length - 4} more</span>
                          )}
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-tertiary" style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem' }} onClick={() => toggleBannerDisplay(design.id)}>
                          {showOnBanner[design.id] ? <><EyeOff size={14} /> Hide</> : <><Eye size={14} /> Show</>}
                        </button>
                        <button className="btn-tertiary" style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem' }} onClick={() => handleDownloadWithoutWatermark(design.id)}>
                          <Download size={14} /> Download
                        </button>
                      </div>
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
