import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { designs, fabrics } from '../mockData';
import { ArrowLeft, Loader2, Shirt, ShoppingBag } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DesignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const design = designs.find(d => d.id === id);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [mockups, setMockups] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStarted, setGenerationStarted] = useState(false);

  // Garment display names
  const garmentLabels = {
    coord_set: "Modern Coord Set",
    sun_dress: "Sun Dress",
    smart_shirt: "Smart Shirt",
    tote_bag: "Tote Bag"
  };

  // Auto-generate mockups when page loads
  useEffect(() => {
    if (design && !generationStarted) {
      generateMockups();
    }
  }, [design]);

  const generateMockups = async () => {
    if (!design) return;
    
    setIsGenerating(true);
    setGenerationStarted(true);
    
    try {
      const response = await fetch(`${API_URL}/api/generate-fashion-mockups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pattern_name: design.name,
          pattern_description: design.description,
          pattern_colors: design.colors || []
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMockups(data.mockups);
          toast({
            title: "Fashion Mockups Generated!",
            description: "AI has created 4 fashion visualizations for this pattern.",
          });
        }
      } else {
        throw new Error('Generation failed');
      }
    } catch (error) {
      console.error('Error generating mockups:', error);
      toast({
        title: "Generation in Progress",
        description: "AI mockups are being created. This may take a moment.",
        variant: "default"
      });
    } finally {
      setIsGenerating(false);
    }
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

        {/* AI Fashion Mockups Section */}
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
              <h2 className="heading-2" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Shirt size={28} />
                Fashion Mock Previews
              </h2>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                AI-generated visualizations of this pattern on different garments
              </p>
            </div>
            {!isGenerating && Object.keys(mockups).length === 0 && (
              <button 
                onClick={generateMockups} 
                className="btn-secondary"
                disabled={isGenerating}
              >
                Generate Mockups
              </button>
            )}
          </div>

          {isGenerating && (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '4rem 2rem',
              background: 'var(--bg-section)',
              borderRadius: '16px',
              border: '3px solid var(--text-primary)'
            }}>
              <Loader2 size={48} className="animate-spin" style={{ marginBottom: '1.5rem' }} />
              <h3 className="heading-3" style={{ marginBottom: '0.5rem' }}>Generating Fashion Mockups...</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                AI is creating 4 unique fashion visualizations for "{design.name}"
              </p>
            </div>
          )}

          {!isGenerating && Object.keys(mockups).length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem'
            }} className="mockups-grid">
              {Object.entries(garmentLabels).map(([key, label]) => (
                <div key={key} className="mockup-card" style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '3px solid var(--text-primary)',
                  boxShadow: 'var(--shadow-bold)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ 
                    height: '280px', 
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {mockups[key] ? (
                      <img 
                        src={`data:image/png;base64,${mockups[key]}`}
                        alt={`${label} with ${design.name} pattern`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ textAlign: 'center', color: '#999' }}>
                        <ShoppingBag size={48} style={{ marginBottom: '0.5rem' }} />
                        <p>Generating...</p>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1.25rem', textAlign: 'center' }}>
                    <h4 style={{ 
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)'
                    }}>
                      {label}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isGenerating && Object.keys(mockups).length === 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem'
            }} className="mockups-grid">
              {Object.entries(garmentLabels).map(([key, label]) => (
                <div key={key} className="mockup-card-placeholder" style={{
                  background: '#f9f9f9',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '3px dashed #ccc',
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    height: '200px', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999'
                  }}>
                    <ShoppingBag size={48} style={{ marginBottom: '1rem' }} />
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {label}
                    </h4>
                    <p style={{ fontSize: '0.875rem' }}>Click "Generate Mockups" to preview</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
