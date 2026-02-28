import React from 'react';
import { Link } from 'react-router-dom';
import { collections, philosophyContent, processSteps } from '../mockData';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Banner - Reduced Height, No Background Text */}
      <section className="hero-banner" style={{ 
        background: 'var(--bg-vibrant-purple)', 
        minHeight: '70vh',
        padding: '4rem 3rem 5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          maxWidth: '1600px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* LEFT SIDE - Text Block */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              background: 'var(--bg-vibrant-green)',
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
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: '1.1',
              textAlign: 'center'
            }}>
              Bold Patterns<br/>for Modern<br/>Brands
            </h1>
            
            <p className="body-large" style={{ 
              marginBottom: '3rem',
              maxWidth: '50ch',
              margin: '0 auto 3rem',
              fontSize: '1.125rem',
              lineHeight: '1.7',
              color: 'var(--text-primary)',
              textAlign: 'center'
            }}>
              Design-led surface studio creating curated patterns for boutiques, designers, and creative professionals.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/collections" className="btn-primary" style={{ fontSize: '1rem' }}>
                Browse Patterns
              </Link>
              <Link to="/how-it-works" className="btn-secondary" style={{ fontSize: '1rem' }}>
                View Subscription Plans
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - 6 Pattern Collage (Admin Uploadable) */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 180px)',
              gap: '1rem',
              position: 'relative'
            }}>
              {/* Banner Image 1 */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)',
                boxShadow: 'var(--shadow-bold)',
                transform: 'rotate(-2deg)',
                position: 'relative'
              }}>
                <div className="pattern-preview abstract-geometric-1" style={{ opacity: 0.8 }}></div>
              </div>
              
              {/* Banner Image 2 */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)',
                boxShadow: 'var(--shadow-bold)',
                transform: 'rotate(2deg)',
                position: 'relative'
              }}>
                <div className="pattern-preview abstract-organic-1" style={{ opacity: 0.8 }}></div>
              </div>
              
              {/* Banner Image 3 */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)',
                boxShadow: 'var(--shadow-bold)',
                transform: 'rotate(-1deg)',
                position: 'relative'
              }}>
                <div className="pattern-preview abstract-texture-1" style={{ opacity: 0.8 }}></div>
              </div>
              
              {/* Banner Image 4 */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)',
                boxShadow: 'var(--shadow-bold)',
                transform: 'rotate(1deg)',
                position: 'relative'
              }}>
                <div className="pattern-preview abstract-angular-1" style={{ opacity: 0.8 }}></div>
              </div>
              
              {/* Banner Image 5 */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)',
                boxShadow: 'var(--shadow-bold)',
                transform: 'rotate(-2deg)',
                position: 'relative'
              }}>
                <div className="pattern-preview abstract-layered-1" style={{ opacity: 0.8 }}></div>
              </div>
              
              {/* Banner Image 6 */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '4px solid var(--text-primary)',
                background: 'var(--bg-page)',
                boxShadow: 'var(--shadow-bold)',
                transform: 'rotate(2deg)',
                position: 'relative'
              }}>
                <div className="pattern-preview abstract-optical-1" style={{ opacity: 0.8 }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Kalapop Section - NEW */}
      <section style={{ background: 'var(--bg-page)', padding: '6rem 3rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="heading-2" style={{ marginBottom: '2rem' }}>What is Kalapop?</h2>
          <p className="body-large" style={{ 
            fontSize: '1.25rem', 
            lineHeight: '1.8',
            color: 'var(--text-primary)',
            maxWidth: '75ch',
            margin: '0 auto'
          }}>
            Kalapop is a curated surface design studio offering production-ready textile patterns for modern fashion brands. Designers can access seamless patterns through subscription and use them for commercial collections. Fabric printing is available as an optional service for those who need small-batch production.
          </p>
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
