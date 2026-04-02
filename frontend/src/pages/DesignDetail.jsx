import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fabrics } from '../mockData';
import { ArrowLeft, Download, Bookmark, Star } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DesignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [design, setDesign] = useState(null);
  const [allDesigns, setAllDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFabrics, setSelectedFabrics] = useState([]);

  // Fetch designs from backend
  useEffect(() => {
    fetchDesigns();
  }, [id]);

  const fetchDesigns = async () => {
    try {
      const response = await fetch(`${API_URL}/api/designs`);
      if (response.ok) {
        const data = await response.json();
        const designs = data.designs || [];
        setAllDesigns(designs);
        
        // Find the current design by ID
        const currentDesign = designs.find(d => d.id === id);
        setDesign(currentDesign || null);
      }
    } catch (error) {
      console.error('Error fetching designs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get related patterns (exclude current)
  const relatedPatterns = allDesigns.filter(d => d.id !== id).slice(0, 4);

  // Application images for mockups
  const applicationImages = [
    { type: 'fashion', label: 'High-Fashion Textile', size: 'large' },
    { type: 'bag', label: 'Tote Bag', size: 'small' },
    { type: 'fabric', label: 'Fabric Sample', size: 'small' },
    { type: 'shirt', label: 'Smart Shirt', size: 'small' }
  ];

  if (isLoading) {
    return (
      <div className="detail-not-found" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <p className="body-large">Loading design...</p>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="detail-not-found" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 className="heading-2" style={{ marginBottom: '1rem' }}>Design Not Found</h2>
        <p className="body-medium" style={{ marginBottom: '2rem' }}>This design may have been removed or doesn't exist.</p>
        <Link to="/collections" className="btn-primary">Back to Collections</Link>
      </div>
    );
  }

  const handleDownload = () => {
    toast({
      title: "Sign up required",
      description: "Please sign up to download this pattern.",
    });
  };

  const handleSaveToLibrary = () => {
    toast({
      title: "Sign up required",
      description: "Please sign up to save patterns to your library.",
    });
  };

  return (
    <div className="design-detail-new" data-testid="design-detail-page">
      {/* Back Button */}
      <div style={{ padding: '1rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <Link to="/collections" className="btn-tertiary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={18} /> Back to Collections
        </Link>
      </div>
      
      {/* Top Section - Pattern Image & Info */}
      <section className="detail-hero">
        <div className="detail-hero-container">
          {/* Pattern Image */}
          <div className="detail-pattern-image">
            <span className="new-collection-badge">NEW COLLECTION</span>
            {design.image_url ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img 
                  src={design.image_url.startsWith('/api') ? `${API_URL}${design.image_url}` : design.image_url}
                  alt={design.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <div className="watermark-overlay">KALAPOP</div>
              </div>
            ) : (
              <div className={`pattern-large ${design.thumbnail}`}>
                <div className="watermark-overlay">KALAPOP</div>
              </div>
            )}
          </div>

          {/* Pattern Info Panel */}
          <div className="detail-info-panel">
            <div className="detail-category">
              <Star size={16} />
              <span>{design.category}</span>
            </div>
            
            <h1 className="detail-title">{design.name}</h1>
            
            <div className="detail-badges">
              <span className="badge-premium">
                <span className="badge-icon">✓</span>
                Premium License
              </span>
              <span className="badge-format">
                <span className="badge-icon">✓</span>
                Vector + Raster
              </span>
            </div>

            {design.description && (
              <p className="detail-description">{design.description}</p>
            )}
            
            {design.keywords && design.keywords.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {design.keywords.map((keyword, idx) => (
                  <span key={idx} style={{ 
                    background: 'var(--bg-vibrant-yellow)', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: '2px solid var(--text-primary)'
                  }}>
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            <div className="detail-actions">
              <button className="btn-download" onClick={handleDownload}>
                <Download size={18} />
                Download Pattern
              </button>
              <button className="btn-save" onClick={handleSaveToLibrary}>
                <Bookmark size={18} />
                Save to Library
              </button>
            </div>

            <div className="detail-specs">
              <div className="spec-row">
                <span className="spec-label">Category</span>
                <span className="spec-value">{design.category}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Dimensions</span>
                <span className="spec-value">8000 x 8000 px</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">File Format</span>
                <span className="spec-value">AI, PNG, TIFF</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Color Profile</span>
                <span className="spec-value">Adobe RGB 1998</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern in Application - Yellow-Green Section */}
      <section className="pattern-application">
        <div className="application-container">
          <h2 className="application-title">Pattern in Application</h2>
          <p className="application-subtitle">
            Visualizing {design.name} across different mediums. From high-fashion garments to artisanal home decor.
          </p>

          <div className="application-grid">
            {/* Large Fashion Image */}
            <div className="app-image app-image-large">
              {design.image_url ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img 
                    src={design.image_url.startsWith('/api') ? `${API_URL}${design.image_url}` : design.image_url}
                    alt="High-Fashion Textile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="app-label">High-Fashion Textile</div>
                </div>
              ) : (
                <div className={`app-mockup ${design.thumbnail}`}>
                  <div className="app-label">High-Fashion Textile</div>
                </div>
              )}
            </div>
            
            {/* Right Column - 3 smaller images */}
            <div className="app-images-right">
              <div className="app-image app-image-top">
                <div className="app-mockup-simple bag-mockup">
                  <img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" alt="Tote bag mockup" />
                </div>
              </div>
              <div className="app-images-bottom">
                <div className="app-image">
                  {design.image_url ? (
                    <img 
                      src={design.image_url.startsWith('/api') ? `${API_URL}${design.image_url}` : design.image_url}
                      alt="Fabric Sample"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className={`app-mockup-small ${design.thumbnail}`}></div>
                  )}
                </div>
                <div className="app-image">
                  <div className="app-mockup-simple shirt-mockup">
                    {design.image_url ? (
                      <img 
                        src={design.image_url.startsWith('/api') ? `${API_URL}${design.image_url}` : design.image_url}
                        alt="Smart Shirt"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                      />
                    ) : (
                      <div className={`shirt-pattern ${design.thumbnail}`}></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Patterns */}
      {relatedPatterns.length > 0 && (
        <section className="related-patterns">
          <div className="related-header">
            <h2 className="related-title">Related Patterns</h2>
            <Link to="/collections" className="view-library-link">
              View Library <span>→</span>
            </Link>
          </div>

          <div className="related-grid">
            {relatedPatterns.map((pattern) => (
              <Link to={`/design/${pattern.id}`} key={pattern.id} className="related-card">
                {pattern.image_url ? (
                  <img 
                    src={pattern.image_url.startsWith('/api') ? `${API_URL}${pattern.image_url}` : pattern.image_url}
                    alt={pattern.name}
                    className="related-image"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className={`related-image ${pattern.thumbnail}`}></div>
                )}
                <h3 className="related-name">{pattern.name}</h3>
                <p className="related-category">{pattern.style || pattern.category}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="detail-footer">
        <div className="footer-content">
          <h3 className="footer-brand">KALAPOP STUDIO</h3>
          <div className="footer-links">
            <Link to="/collections">Library</Link>
            <Link to="/how-it-works">Pricing</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <p className="footer-copyright">© 2024 Kalapop Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DesignDetail;
