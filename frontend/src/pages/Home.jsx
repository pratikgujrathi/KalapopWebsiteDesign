import React from 'react';
import { Link } from 'react-router-dom';
import { collections, philosophyContent, processSteps } from '../mockData';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Banner - Updated with Left Text & Right Visual */}
      <section className="hero-banner" style={{ 
        background: 'var(--bg-page)', 
        minHeight: '85vh',
        padding: '4rem 3rem'
      }}>
        <div style={{ 
          maxWidth: '1600px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* LEFT SIDE - Text Block */}
          <div>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              background: 'var(--bg-vibrant-orange)',
              border: '3px solid var(--text-primary)',
              marginBottom: '2rem',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Surface Design Studio
            </div>
            
            <h1 className="heading-display" style={{ 
              marginBottom: '2rem',
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              lineHeight: '1'
            }}>
              Bold Patterns<br/>for Modern<br/>Brands
            </h1>
            
            <p className="body-large" style={{ 
              marginBottom: '3rem',
              maxWidth: '50ch',
              fontSize: '1.25rem',
              lineHeight: '1.7',
              color: 'var(--text-primary)'
            }}>
              Design-led surface studio creating curated patterns for boutiques, designers, and creative professionals.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/collections" className="btn-primary" style={{ fontSize: '1rem' }}>
                Browse Patterns
              </Link>
              <Link to="/how-it-works" className="btn-secondary" style={{ fontSize: '1rem' }}>
                View Subscription Plans
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - Visual Block with Pattern Composition */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              position: 'relative'
            }}>
              {/* Large Pattern Preview 1 */}
              <div style={{
                gridColumn: '1 / -1',
                height: '280px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)'
              }}>
                <div className="pattern-preview abstract-geometric-1" style={{ opacity: 0.8 }}></div>
              </div>
              
              {/* Pattern Preview 2 */}
              <div style={{
                height: '200px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)'
              }}>
                <div className="pattern-preview abstract-organic-1" style={{ opacity: 0.8 }}></div>
              </div>
              
              {/* Pattern Preview 3 */}
              <div style={{
                height: '200px',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)'
              }}>
                <div className="pattern-preview abstract-optical-1" style={{ opacity: 0.8 }}></div>
              </div>
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
