import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { designs, fabrics } from '../mockData';
import { ArrowLeft, Shirt } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DesignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const design = designs.find(d => d.id === id);
  const [selectedFabrics, setSelectedFabrics] = useState([]);

  // Garment display names and CSS classes
  const garmentTypes = [
    { key: 'coord_set', label: 'Modern Coord Set', cssClass: 'garment-coord-set' },
    { key: 'sun_dress', label: 'Sun Dress', cssClass: 'garment-sun-dress' },
    { key: 'smart_shirt', label: 'Smart Shirt', cssClass: 'garment-smart-shirt' },
    { key: 'tote_bag', label: 'Tote Bag', cssClass: 'garment-tote-bag' }
  ];

  // Get pattern image URL from mockData or featured patterns
  const getPatternImageUrl = () => {
    // Use the design thumbnail class to create a gradient/pattern
    // Or fetch from featured patterns if available
    if (design?.thumbnail) {
      return null; // Will use CSS class
    }
    return null;
  };

  if (!design) {
    return (
      <div className="section-container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Design Not Found</h2>
          <Link to="/collections" className="btn-primary">Back to Collections</Link>
        </div>
      </div>
    );
  }

  const recommendedFabricsList = design.recommendedFabrics
    ? fabrics.filter(f => design.recommendedFabrics.includes(f.id))
    : [];

  const handleFabricToggle = (fabricId) => {
    setSelectedFabrics(prev => 
      prev.includes(fabricId)
        ? prev.filter(id => id !== fabricId)
        : [...prev, fabricId]
    );
  };

  const handleRequestAccess = () => {
    toast({
      title: "Sign up required",
      description: "Please sign up to request access to this design.",
    });
  };

  return (
    <div className="design-detail-page">
      <section className="section-container">
        <button
          onClick={() => navigate(-1)}
          className="btn-tertiary"
          style={{ marginBottom: '2rem' }}
        >
          <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back
        </button>

        <div className="design-detail-layout">
          {/* Design Preview */}
          <div className="design-preview-large">
            <div className="design-watermark">KALAPOP</div>
            <div className={`pattern-preview ${design.thumbnail}`} style={{ width: '100%', height: '500px' }}></div>
            <p className="caption" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              Watermarked preview • Full resolution available post-approval
            </p>
          </div>

          {/* Design Information */}
          <div className="design-info-panel">
            <div>
              <span className="collection-badge">{design.collection.toUpperCase()}</span>
              <h1 className="heading-3" style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>
                {design.name}
              </h1>
              <p className="body-medium" style={{ marginBottom: '1.5rem' }}>
                {design.description}
              </p>
            </div>

            <div className="info-section">
              <h3 className="heading-4" style={{ marginBottom: '1rem' }}>Design Intent</h3>
              <p className="body-medium">{design.designIntent}</p>
            </div>

            <div className="info-section">
              <h3 className="heading-4" style={{ marginBottom: '1rem' }}>Specifications</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <p className="caption">Category</p>
                  <p className="body-medium" style={{ marginTop: '0.25rem' }}>{design.category}</p>
                </div>
                <div>
                  <p className="caption">Style</p>
                  <p className="body-medium" style={{ marginTop: '0.25rem' }}>{design.style}</p>
                </div>
                <div>
                  <p className="caption">Repeat Structure</p>
                  <p className="body-medium" style={{ marginTop: '0.25rem' }}>{design.scale}</p>
                </div>
                <div>
                  <p className="caption">Suitable Techniques</p>
                  <p className="body-medium" style={{ marginTop: '0.25rem' }}>
                    {design.suitableTechniques.join(', ')}
                  </p>
                </div>
                <div>
                  <p className="caption">Color Palette</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {design.colors.map((color, i) => (
                      <div
                        key={i}
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: color,
                          border: '1px solid var(--border-light)'
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="info-section" style={{ background: 'var(--bg-section)' }}>
              <h3 className="heading-4" style={{ marginBottom: '1rem' }}>Request Access</h3>
              <p className="body-medium" style={{ marginBottom: '1.5rem' }}>
                Sign up to request access to full-resolution files and begin your order.
              </p>
              <button onClick={handleRequestAccess} className="btn-primary" style={{ width: '100%' }}>
                Sign Up to Access
              </button>
            </div>
          </div>
        </div>

        {/* CSS-Based Fashion Mockups Section */}
        <div className="fashion-mockups-section" style={{ marginTop: '4rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h2 className="heading-3" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem' }}>
                <Shirt size={24} />
                Fashion Mock Previews
              </h2>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Visualize this pattern on different garments
              </p>
            </div>
          </div>

          <div className="css-mockup-container">
            {garmentTypes.map(({ key, label, cssClass }) => (
              <div key={key} className="css-mockup-card" data-testid={`mockup-${key}`}>
                <div className="css-mockup-preview">
                  <div className="garment-silhouette">
                    <div 
                      className={`garment-shape ${cssClass} ${design.thumbnail}`}
                      style={{
                        backgroundSize: key === 'tote_bag' ? '60px 60px' : '80px 80px'
                      }}
                      title={`${design.name} on ${label}`}
                    />
                  </div>
                </div>
                <div className="css-mockup-label">
                  <h4>{label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Fabrics Section - Below Mockups */}
        {recommendedFabricsList.length > 0 && (
          <div className="recommended-fabrics-section" style={{ marginTop: '3rem' }}>
            <h2 className="heading-3" style={{ marginBottom: '0.5rem' }}>Recommended Fabrics</h2>
            <p className="body-small" style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Select fabrics suitable for this design. This helps us prepare your order accurately.
            </p>
            <div className="fabric-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {recommendedFabricsList.map((fabric) => (
                <div
                  key={fabric.id}
                  className={`fabric-option ${selectedFabrics.includes(fabric.id) ? 'selected' : ''}`}
                  onClick={() => handleFabricToggle(fabric.id)}
                  style={{
                    padding: '1.25rem',
                    background: selectedFabrics.includes(fabric.id) ? 'var(--bg-vibrant-yellow)' : 'var(--bg-page)',
                    border: '2px solid var(--text-primary)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <p className="body-medium" style={{ fontWeight: 600 }}>{fabric.name}</p>
                    <p className="caption">{fabric.weight}</p>
                  </div>
                  <p className="body-small" style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    {fabric.description}
                  </p>
                  <p className="caption">Suitable for: {fabric.suitability}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default DesignDetail;
