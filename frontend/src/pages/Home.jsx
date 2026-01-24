import React from 'react';
import { Link } from 'react-router-dom';
import { collections, philosophyContent, processSteps } from '../mockData';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Banner with Pattern Collage */}
      <section className="hero-banner">
        <div className="hero-pattern-collage">
          {/* Pattern tiles - mood board style */}
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
          <p className="hero-tagline">Surface Design Studio</p>
          <h1 className="heading-display" style={{ marginBottom: '1.5rem' }}>
            From Curated Design to Small-Batch Printing
          </h1>
          <p className="body-large" style={{ maxWidth: '60ch', margin: '0 auto' }}>
            Thoughtfully designed patterns for modern brands, boutiques, and creative professionals.
          </p>
        </div>
      </section>

      {/* Process Section - Editorial Blocks */}
      <section className="process-section">
        <div className="process-grid">
          {processSteps.map((step) => (
            <div key={step.id} className="process-block">
              <div className="process-block-pattern">
                <div className={`pattern-preview abstract-${step.id === 1 ? 'geometric' : step.id === 2 ? 'organic' : 'texture'}-1`}></div>
              </div>
              <h3 className="heading-3" style={{ marginBottom: '1rem' }}>
                {step.title}
              </h3>
              <p className="body-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="section-narrow">
          <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>
            {philosophyContent.heading}
          </h2>
          <p className="body-large" style={{ maxWidth: '70ch', margin: '0 auto' }}>
            {philosophyContent.body}
          </p>
        </div>
      </section>

      {/* Collections Preview */}
      <section style={{ background: 'var(--bg-section)' }}>
        <div className="section-container">
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 className="heading-2" style={{ marginBottom: '1rem' }}>Collections</h2>
            <p className="body-medium">
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
                <h3 className="heading-3" style={{ marginBottom: '1rem' }}>
                  {collection.name}
                </h3>
                <p className="body-medium" style={{ marginBottom: '1.5rem' }}>
                  {collection.description}
                </p>
                <p className="caption">
                  {collection.designCount} Patterns
                </p>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
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
