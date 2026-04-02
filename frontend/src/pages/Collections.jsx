import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Collection definitions matching Admin panel
const COLLECTIONS = [
  {
    id: 'collection',
    name: 'Collection',
    tier: 'collection',
    access: 'Open Access',
    description: 'Curated surface patterns for modern brands and boutiques. Entry-level access to foundational designs perfect for emerging designers.',
    priceRange: 'Accessible for all brands'
  },
  {
    id: 'limited_edition',
    name: 'Limited Edition',
    tier: 'limited_edition',
    access: 'Exclusive Access',
    description: 'Premium exclusive patterns with limited availability. Bespoke surface solutions with unlimited creative freedom for established brands.',
    priceRange: 'Premium exclusive collection'
  }
];

const Collections = () => {
  const location = useLocation();
  const hash = location.hash.replace('#', '');
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch designs from backend
  useEffect(() => {
    fetchDesigns();
    
    // Listen for design updates from Admin panel
    const handleUpdate = () => fetchDesigns();
    window.addEventListener('kalapop-designs-update', handleUpdate);
    return () => window.removeEventListener('kalapop-designs-update', handleUpdate);
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
    } finally {
      setIsLoading(false);
    }
  };

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
  
  // Get actual design count for each collection
  const getDesignCount = (tier) => {
    return designs.filter(design => design.collection === tier).length;
  };

  return (
    <div className="collections-page">
      <section className="section-narrow" style={{ paddingBottom: '3rem', textAlign: 'center' }}>
        <p className="caption" style={{ marginBottom: '1rem' }}>Surface Design Library</p>
        <h1 className="heading-1" style={{ marginBottom: '1.5rem' }}>Collections</h1>
        <p className="body-large" style={{ maxWidth: '60ch', margin: '0 auto' }}>
          Two curated tiers, each offering distinct patterns, licensing structures, and support levels for modern brands.
        </p>
      </section>

      {COLLECTIONS.map((collection, index) => (
        <section
          key={collection.id}
          id={collection.tier}
          style={{ 
            background: index % 2 === 0 ? 'var(--bg-page)' : 'var(--bg-section)',
            padding: '6rem 2rem'
          }}
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem', maxWidth: '800px' }}>
              <span className="collection-badge">{collection.access}</span>
              <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
                {collection.name}
              </h2>
              <p className="body-large" style={{ marginBottom: '2rem' }}>
                {collection.description}
              </p>
              <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <div>
                  <p className="caption">Pattern Count</p>
                  <p className="heading-4" style={{ marginTop: '0.5rem' }}>{getDesignCount(collection.tier)}</p>
                </div>
                <div>
                  <p className="caption">Tier</p>
                  <p className="body-medium" style={{ marginTop: '0.5rem' }}>{collection.priceRange}</p>
                </div>
              </div>
            </div>

            {/* Design Preview Grid */}
            <div className="designs-grid">
              {isLoading ? (
                <p className="body-medium" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                  Loading designs...
                </p>
              ) : getDesignsByTier(collection.tier).length === 0 ? (
                <p className="body-medium" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#888' }}>
                  No designs uploaded yet for this collection. Add designs in the Admin panel.
                </p>
              ) : (
                getDesignsByTier(collection.tier).map((design) => (
                  <Link
                    key={design.id}
                    to={`/design/${design.id}`}
                    className="design-card"
                  >
                    <div className="design-thumbnail">
                      <div className="design-watermark">KALAPOP</div>
                      {design.image_url ? (
                        <img 
                          src={design.image_url.startsWith('/api') ? `${API_URL}${design.image_url}` : design.image_url}
                          alt={design.name}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0
                          }}
                        />
                      ) : (
                        <div className={`pattern-preview ${design.thumbnail}`}></div>
                      )}
                    </div>
                    <div className="design-info">
                      <h3 className="heading-5" style={{ marginBottom: '0.5rem' }}>
                        {design.name}
                      </h3>
                      <p className="caption">{design.category}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      ))}

      <section style={{ background: 'var(--bg-page)', padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Ready to Access?</h2>
          <p className="body-large" style={{ marginBottom: '2rem' }}>
            Sign up to explore designs and request custom orders.
          </p>
          <Link to="/login" className="btn-primary">
            Sign Up
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Collections;