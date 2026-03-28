import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { designs, fabrics } from '../mockData';
import { ArrowLeft, Download, Bookmark, Star } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DesignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const design = designs.find(d => d.id === id);
  const [selectedFabrics, setSelectedFabrics] = useState([]);

  // Get related patterns (exclude current)
  const relatedPatterns = designs.filter(d => d.id !== id).slice(0, 4);

  // Application images for mockups
  const applicationImages = [
    { type: 'fashion', label: 'High-Fashion Textile', size: 'large' },
    { type: 'bag', label: 'Tote Bag', size: 'small' },
    { type: 'fabric', label: 'Fabric Sample', size: 'small' },
    { type: 'shirt', label: 'Smart Shirt', size: 'small' }
  ];

  if (!design) {
    return (
      <div className="detail-not-found">
        <h2>Design Not Found</h2>
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
      {/* Top Section - Pattern Image & Info */}
      <section className="detail-hero">
        <div className="detail-hero-container">
          {/* Pattern Image */}
          <div className="detail-pattern-image">
            <span className="new-collection-badge">NEW COLLECTION</span>
            <div className={`pattern-large ${design.thumbnail}`}>
              <div className="watermark-overlay">KALAPOP</div>
            </div>
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

            <p className="detail-description">{design.description}</p>

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
              <div className={`app-mockup ${design.thumbnail}`}>
                <div className="app-label">High-Fashion Textile</div>
              </div>
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
                  <div className={`app-mockup-small ${design.thumbnail}`}></div>
                </div>
                <div className="app-image">
                  <div className="app-mockup-simple shirt-mockup">
                    <div className={`shirt-pattern ${design.thumbnail}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Patterns */}
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
              <div className={`related-image ${pattern.thumbnail}`}></div>
              <h3 className="related-name">{pattern.name}</h3>
              <p className="related-category">{pattern.style}</p>
            </Link>
          ))}
        </div>
      </section>

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
