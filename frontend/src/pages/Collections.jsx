import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collections, designs } from '../mockData';
import { ArrowRight } from 'lucide-react';

const Collections = () => {
  const location = useLocation();
  const hash = location.hash.replace('#', '');

  React.useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const getDesignsByTier = (tier) => {
    return designs.filter(design => design.collection === tier);
  };

  return (
    <div className="collections-page">
      <section className="page-hero">
        <div className="section-container">
          <h1 className="heading-1" style={{ marginBottom: '24px' }}>Pattern Collections</h1>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '60ch' }}>
            Explore our three-tier system. Each collection offers distinct patterns, licensing, and support levels.
          </p>
        </div>
      </section>

      {collections.map((collection, index) => (
        <section
          key={collection.id}
          id={collection.tier}
          className="collection-section"
          style={{ background: index % 2 === 0 ? 'var(--bg-page)' : 'var(--bg-card)' }}
        >
          <div className="section-container">
            <div className="collection-header">
              <div>
                <p className="caption" style={{ marginBottom: '16px' }}>
                  {collection.tier.toUpperCase()}
                </p>
                <h2 className="heading-2" style={{ marginBottom: '24px' }}>
                  {collection.name}
                </h2>
                <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '60ch' }}>
                  {collection.description}
                </p>
                <div className="collection-features">
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {collection.features.map((feature, i) => (
                      <li key={i} className="body-small" style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--brand-primary)' }}>•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="collection-meta">
                <div className="meta-item">
                  <p className="caption">Pattern Count</p>
                  <p className="heading-4" style={{ marginTop: '8px' }}>{collection.designCount}</p>
                </div>
                <div className="meta-item" style={{ marginTop: '24px' }}>
                  <p className="caption">Pricing</p>
                  <p className="body-small" style={{ marginTop: '8px' }}>{collection.priceRange}</p>
                </div>
              </div>
            </div>

            {/* Design Preview Grid */}
            <div className="designs-grid" style={{ marginTop: '64px' }}>
              {getDesignsByTier(collection.tier).map((design) => (
                <Link
                  key={design.id}
                  to={`/design/${design.id}`}
                  className="design-card"
                >
                  <div className="design-thumbnail">
                    {/* Abstract pattern preview based on design style */}
                    <div className={`pattern-preview ${design.thumbnail}`}></div>
                  </div>
                  <div className="design-info">
                    <h3 className="heading-5" style={{ marginBottom: '8px' }}>
                      {design.name}
                    </h3>
                    <p className="caption" style={{ color: 'var(--text-secondary)' }}>
                      {design.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="cta-section">
        <div className="section-container" style={{ textAlign: 'center' }}>
          <h2 className="heading-2" style={{ marginBottom: '24px' }}>Ready to Access Our Library?</h2>
          <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
            Sign up to explore full-resolution patterns and start your creative journey.
          </p>
          <Link to="/login" className="btn-primary">
            Get Started <ArrowRight size={20} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Collections;
