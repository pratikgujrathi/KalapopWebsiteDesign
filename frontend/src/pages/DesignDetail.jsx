import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { designs, fabrics } from '../mockData';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const DesignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const design = designs.find(d => d.id === id);
  const [selectedFabrics, setSelectedFabrics] = useState([]);

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
              <h1 className="heading-1" style={{ marginBottom: '1rem' }}>
                {design.name}
              </h1>
              <p className="body-large" style={{ marginBottom: '2rem' }}>
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

            {recommendedFabricsList.length > 0 && (
              <div className="info-section">
                <h3 className="heading-4" style={{ marginBottom: '1rem' }}>Recommended Fabrics</h3>
                <p className="body-small" style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  Select fabrics suitable for this design. This helps us prepare your order accurately.
                </p>
                <div className="fabric-grid">
                  {recommendedFabricsList.map((fabric) => (
                    <div
                      key={fabric.id}
                      className={`fabric-option ${selectedFabrics.includes(fabric.id) ? 'selected' : ''}`}
                      onClick={() => handleFabricToggle(fabric.id)}
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
      </section>
    </div>
  );
};

export default DesignDetail;