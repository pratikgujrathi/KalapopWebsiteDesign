import React from 'react';
import { Link } from 'react-router-dom';
import { collections, philosophyContent, processSteps } from '../mockData';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Banner - Updated with Left Text & Right Visual with Purple Background */}
      <section className="hero-banner" style={{ 
        background: 'var(--bg-vibrant-purple)', 
        minHeight: '85vh',
        padding: '6rem 3rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Typography Pattern */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          fontFamily: 'Archivo Black, sans-serif',
          fontSize: '30vw',
          fontWeight: 900,
          color: 'rgba(255, 87, 34, 0.15)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
          transform: 'rotate(-5deg)',
          pointerEvents: 'none',
          zIndex: 1,
          textTransform: 'uppercase'
        }}>
          KALAPOP
        </div>
        
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

          {/* RIGHT SIDE - Pattern Collage (Admin Uploadable) */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 200px)',
              gap: '1.5rem',
              position: 'relative'
            }}>
              {/* Banner Image 1 - Large (Admin Uploadable) */}
              <div style={{
                gridColumn: '1 / 3',
                gridRow: '1 / 2',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)',
                boxShadow: 'var(--shadow-bold)',
                transform: 'rotate(-2deg)'
              }}>
                <div className="pattern-preview abstract-geometric-1" style={{ opacity: 0.8 }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  fontSize: '0.7rem',
                  borderRadius: '4px'
                }}>Admin Upload Slot 1</div>
              </div>
              
              {/* Banner Image 2 - Small (Admin Uploadable) */}
              <div style={{
                gridColumn: '3 / 4',
                gridRow: '1 / 2',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)',
                boxShadow: 'var(--shadow-bold)',
                transform: 'rotate(3deg)'
              }}>
                <div className="pattern-preview abstract-organic-1" style={{ opacity: 0.8 }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  fontSize: '0.7rem',
                  borderRadius: '4px'
                }}>Slot 2</div>
              </div>
              
              {/* Banner Image 3 - Medium (Admin Uploadable) */}
              <div style={{
                gridColumn: '1 / 2',
                gridRow: '2 / 3',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)',
                boxShadow: 'var(--shadow-bold)',
                transform: 'rotate(-1deg)'
              }}>
                <div className="pattern-preview abstract-texture-1" style={{ opacity: 0.8 }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  fontSize: '0.7rem',
                  borderRadius: '4px'
                }}>Slot 3</div>
              </div>
              
              {/* Banner Image 4 - Wide (Admin Uploadable) */}
              <div style={{
                gridColumn: '2 / 4',
                gridRow: '2 / 3',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)',
                boxShadow: 'var(--shadow-bold)',
                transform: 'rotate(2deg)'
              }}>
                <div className="pattern-preview abstract-optical-1" style={{ opacity: 0.8 }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  fontSize: '0.7rem',
                  borderRadius: '4px'
                }}>Slot 4</div>
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
