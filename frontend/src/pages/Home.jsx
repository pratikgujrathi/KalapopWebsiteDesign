import React from 'react';
import { Link } from 'react-router-dom';
import { philosophyContent, processSteps } from '../mockData';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Banner - 9 Square Images */}
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
              background: 'var(--bg-vibrant-pink)',
              border: '3px solid var(--text-primary)',
              marginBottom: '2rem',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-inverse)'
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

          {/* RIGHT SIDE - 9 Square Images (3x3 Grid) */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 140px)',
              gap: '1rem',
              position: 'relative'
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <div key={num} style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '4px solid var(--text-primary)',
                  background: 'var(--bg-page)',
                  boxShadow: 'var(--shadow-bold)',
                  transform: `rotate(${num % 2 === 0 ? '2deg' : '-2deg'})`,
                  position: 'relative'
                }}>
                  <div className={`pattern-preview abstract-${['geometric', 'organic', 'texture', 'angular', 'layered', 'optical'][num % 6]}-1`} style={{ opacity: 0.8 }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is Kalapop Section */}
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

      {/* Featured Pattern Strip - NEW */}
      <section style={{ background: 'var(--bg-page)', padding: '6rem 3rem' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <h2 className="heading-2" style={{ marginBottom: '3rem', textAlign: 'center' }}>Featured Patterns</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} style={{
                height: '350px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '3px solid var(--text-primary)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className={`pattern-preview abstract-${['geometric', 'organic', 'texture', 'angular', 'layered', 'optical'][num % 6]}-1`} style={{ opacity: 0.9 }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(0, 0, 0, 0.8)',
                  padding: '1.5rem',
                  color: 'white',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Pattern Name {num}</p>
                  <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Category: Geometric</p>
                  <p style={{ fontSize: '0.875rem' }}>License: Premium</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Mock Visuals - NEW */}
      <section style={{ background: '#F8F9FA', padding: '6rem 3rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3rem'
          }}>
            {/* Lifestyle Image 1 */}
            <div style={{
              height: '500px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '3px solid var(--text-primary)',
              background: 'var(--bg-page)',
              position: 'relative'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #E0E0E0 25%, #F5F5F5 25%, #F5F5F5 50%, #E0E0E0 50%, #E0E0E0 75%, #F5F5F5 75%)',
                backgroundSize: '40px 40px'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem',
                background: 'var(--bg-vibrant-yellow)',
                padding: '1rem 2rem',
                border: '3px solid var(--text-primary)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                From Pattern to Collection
              </div>
            </div>
            
            {/* Lifestyle Image 2 */}
            <div style={{
              height: '500px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '3px solid var(--text-primary)',
              background: 'var(--bg-page)',
              position: 'relative'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, #FFE5E5 30%, #FFF0F0 30%, #FFF0F0 50%, #FFE5E5 50%)',
                backgroundSize: '60px 60px'
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Updated Text */}
      <section className="process-section">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>How It Works</h2>
          <p className="body-large" style={{ maxWidth: '60ch', margin: '0 auto' }}>
            Simple subscription-based access to professional textile patterns.
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
                color: step.id === 3 ? 'var(--text-inverse)' : 'var(--text-primary)',
                fontSize: '1.75rem'
              }}>
                {step.title}
              </h3>
              <p className="body-medium" style={{ 
                fontSize: '1.05rem',
                color: step.id === 3 ? 'var(--text-inverse)' : 'var(--text-primary)'
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Optional Printing Section - Secondary */}
      <section style={{ background: '#FFF9E6', padding: '5rem 3rem', borderTop: '3px solid var(--text-primary)', borderBottom: '3px solid var(--text-primary)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h3 className="heading-3" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Optional Fabric Printing</h3>
          <p className="body-large" style={{ fontSize: '1.125rem', maxWidth: '65ch', margin: '0 auto' }}>
            Need printed fabric? Order directly through our integrated print partner for small-batch production.
          </p>
          <Link to="/how-it-works" className="btn-secondary" style={{ marginTop: '2rem' }}>
            Learn About Print Service
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
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
    </div>
  );
};

export default Home;
