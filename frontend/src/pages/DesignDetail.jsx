import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { designs } from '../mockData';
import { ArrowLeft, Download, Heart } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const DesignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const design = designs.find(d => d.id === id);

  if (!design) {
    return (
      <div className="section-container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="heading-2" style={{ marginBottom: '24px' }}>Design Not Found</h2>
          <Link to="/collections" className="btn-primary">Back to Collections</Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    toast({
      title: "Sign up required",
      description: "Please sign up to save designs to your account.",
    });
  };

  return (
    <div className="design-detail-page">
      <section className="section-container">
        <button
          onClick={() => navigate(-1)}
          className="back-button"
          style={{ marginBottom: '40px' }}
        >
          <ArrowLeft size={20} /> <span style={{ marginLeft: '8px' }}>Back</span>
        </button>

        <div className="design-detail-layout">
          {/* Design Preview */}
          <div className="design-preview-large">
            <div className={`pattern-preview-large ${design.thumbnail}`}></div>
            <div className="design-actions" style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
              <button onClick={handleSave} className="btn-secondary">
                <Heart size={20} /> <span style={{ marginLeft: '8px' }}>Save Design</span>
              </button>
            </div>
          </div>

          {/* Design Information */}
          <div className="design-info-panel">
            <div>
              <p className="caption" style={{ marginBottom: '16px' }}>
                {design.collection.toUpperCase()} COLLECTION
              </p>
              <h1 className="heading-1" style={{ marginBottom: '24px', fontSize: '3rem' }}>
                {design.name}
              </h1>
              <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
                {design.description}
              </p>
            </div>

            <div className="design-specs">
              <div className="spec-item">
                <p className="caption">Category</p>
                <p className="body-small" style={{ marginTop: '8px' }}>{design.category}</p>
              </div>
              <div className="spec-item">
                <p className="caption">Style</p>
                <p className="body-small" style={{ marginTop: '8px' }}>{design.style}</p>
              </div>
              <div className="spec-item">
                <p className="caption">Repeat Structure</p>
                <p className="body-small" style={{ marginTop: '8px' }}>{design.repeat}</p>
              </div>
              <div className="spec-item">
                <p className="caption">Best Suited For</p>
                <p className="body-small" style={{ marginTop: '8px' }}>{design.suitability}</p>
              </div>
              <div className="spec-item">
                <p className="caption">Color Palette</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  {design.colors.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                        backgroundColor: color,
                        border: '1px solid var(--border-light)'
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="cta-panel">
              <div style={{ padding: '32px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-medium)' }}>
                <h3 className="heading-4" style={{ marginBottom: '16px' }}>Access This Design</h3>
                <p className="body-small" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Sign up to download high-resolution files and access our full pattern library.
                </p>
                <Link to="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Sign Up to Download
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignDetail;
