import React from 'react';
import { Link } from 'react-router-dom';
import { collections, philosophyContent, processSteps } from '../mockData';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Banner with Pattern Collage & Oversized Typography */}
      <section className="hero-banner">
        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="hero-pattern-collage">
            {/* Pattern tiles - bold mood board style */}
            <div className="pattern-tile large">
              <div className="pattern-preview abstract-geometric-1"></div>
            </div>
            <div className="pattern-tile">
              <div className="pattern-preview abstract-organic-1"></div>
            </div>
            <div className="pattern-tile">
              <div className="pattern-preview abstract-texture-1"></div>
            </div>
            <div className="pattern-tile tall">
              <div className="pattern-preview abstract-angular-1"></div>
            </div>
            <div className="pattern-tile">
              <div className="pattern-preview abstract-layered-1"></div>
            </div>
            <div className="pattern-tile wide">
              <div className="pattern-preview abstract-optical-1"></div>
            </div>
          </div>
          
          <div className="hero-content">
            <div className="hero-tagline">Surface Design Studio</div>
            <h1 className="heading-display" style={{ marginBottom: '2rem', color: '#1A1A1A' }}>
              BOLD PATTERNS<br/>FOR MODERN<br/>BRANDS
            </h1>
            <p className="body-large" style={{ maxWidth: '60ch', margin: '0 auto 3rem', fontSize: '1.5rem', fontWeight: 500 }}>
              Design-led surface studio creating curated patterns for boutiques, designers, and creative professionals.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/collections" className="btn-primary">
                Explore Collections
              </Link>
              <Link to="/how-it-works" className="btn-secondary">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Bold Editorial Blocks */}
      <section className="process-section">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>THE KALAPOP PROCESS</h2>
          <p className="body-large" style={{ maxWidth: '60ch', margin: '0 auto' }}>
            From curated design to thoughtful printing in three bold steps.
          </p>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <div key={step.id} className="process-block" style={{ textAlign: 'center' }}>
              <div className="process-block-pattern">
                <div className={`pattern-preview abstract-${step.id === 1 ? 'geometric' : step.id === 2 ? 'organic' : 'texture'}-1`}></div>
              </div>
              <h3 className="heading-3" style={{ 
                marginBottom: '1.5rem',
                color: step.id === 3 ? 'var(--text-inverse)' : 'var(--text-primary)'
              }}>
                {step.title}
              </h3>
              <p className="body-medium" style={{ 
                fontSize: '1.125rem',
                color: step.id === 3 ? 'var(--text-inverse)' : 'var(--text-primary)'
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section with Bold Background */}
      <section className="philosophy-section">
        <div className="section-narrow" style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="heading-2" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            {philosophyContent.heading}
          </h2>
          <p className="body-large" style={{ maxWidth: '70ch', margin: '0 auto', textAlign: 'center', fontSize: '1.5rem' }}>
            {philosophyContent.body}
          </p>
        </div>
      </section>

      {/* Collections Preview with Bold Cards */}
      <section style={{ background: 'var(--bg-page)', padding: '8rem 3rem' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
            <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>OUR COLLECTIONS</h2>
            <p className="body-large" style={{ fontSize: '1.25rem' }}>
              Three curated tiers designed for different creative needs.
            </p>
          </div>

          <div className="collections-grid">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/collections#${collection.tier}`}
                className="collection-card"
              >
                <span className="collection-badge">{collection.access}</span>
                <h3 className="heading-3" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>
                  {collection.name}
                </h3>
                <p className="body-medium" style={{ marginBottom: '2rem', fontSize: '1.125rem' }}>
                  {collection.description}
                </p>
                <p className="caption" style={{ fontSize: '0.875rem' }}>
                  {collection.designCount} PATTERNS
                </p>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <Link to="/collections" className="btn-primary">
              View All Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
