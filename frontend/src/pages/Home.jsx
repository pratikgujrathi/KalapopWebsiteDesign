import React from 'react';
import { Link } from 'react-router-dom';
import { philosophyContent, processSteps } from '../mockData';

const Home = () => {
  return (
    <div className="home-page" data-testid="home-page">
      {/* Hero Banner - 9 Square Images in Elegant Grid */}
      <section className="hero-banner" data-testid="hero-banner" style={{ 
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
              <Link to="/collections" className="btn-primary" data-testid="browse-patterns-btn" style={{ fontSize: '1rem' }}>
                Browse Patterns
              </Link>
              <Link to="/how-it-works" className="btn-secondary" data-testid="view-plans-btn" style={{ fontSize: '1rem' }}>
                View Subscription Plans
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - 9 Square Images (3x3 Grid) - Exclusive Aesthetic */}
          <div style={{ position: 'relative' }} data-testid="banner-image-grid">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 130px)',
              gap: '0.75rem',
              position: 'relative',
              background: 'rgba(255,255,255,0.1)',
              padding: '1rem',
              borderRadius: '24px',
              backdropFilter: 'blur(10px)'
            }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <div key={num} data-testid={`banner-img-${num}`} style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '3px solid var(--text-primary)',
                  background: 'var(--bg-page)',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.2)';
                  e.currentTarget.style.zIndex = '10';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.15)';
                  e.currentTarget.style.zIndex = '1';
                }}
                >
                  <div className={`pattern-preview abstract-${['geometric', 'organic', 'texture', 'angular', 'layered', 'optical', 'geometric', 'organic', 'texture'][num - 1]}-1`} style={{ opacity: 0.85 }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kalapop Studio Section - Bubble Font Style */}
      <section style={{ background: 'var(--bg-page)', padding: '4rem 3rem 2rem' }} data-testid="kalapop-studio-section">
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="bubble-text" style={{ 
              background: 'linear-gradient(135deg, #FF6B9D 0%, #C44FE2 50%, #7B68EE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: '"Pacifico", "Lobster", cursive',
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 400,
              textShadow: '3px 3px 0 rgba(196, 79, 226, 0.3)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
            }}>Kalapop</span>
            <span style={{ 
              fontFamily: '"Pacifico", "Lobster", cursive',
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 400,
              color: 'var(--text-primary)',
              marginLeft: '0.25rem'
            }}>Studio</span>
          </h2>
          <p className="body-large" style={{ 
            fontSize: '1.25rem', 
            lineHeight: '1.8',
            color: 'var(--text-primary)',
            maxWidth: '75ch',
            margin: '0 auto'
          }}>
            Kalapop is a curated surface design studio offering production-ready textile patterns for modern fashion brands. Designers can access seamless patterns through subscription and use them for commercial collections.
          </p>
        </div>
      </section>

      {/* How It Works - With Pattern Images */}
      <section className="process-section" style={{ paddingTop: '3rem' }} data-testid="process-section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.25rem', textTransform: 'uppercase', marginBottom: '1rem' }}>How It Works</h2>
          <p className="body-large" style={{ maxWidth: '60ch', margin: '0 auto' }}>
            Discover, Subscribe, Download — Simple access to professional textile patterns.
          </p>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <div key={step.id} className="process-block" style={{ textAlign: 'center' }} data-testid={`process-step-${step.id}`}>
              <div className="process-block-pattern" data-testid={`process-img-${step.id}`}>
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

      {/* Featured Pattern Strip - 8 items, No labels */}
      <section style={{ background: 'var(--bg-page)', padding: '4rem 3rem' }} data-testid="featured-patterns-section">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.25rem', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>Featured Patterns</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem'
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} data-testid={`featured-pattern-${num}`} style={{
                height: '200px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '3px solid var(--text-primary)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: 'var(--shadow-bold)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '10px 10px 0 rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-bold)';
              }}
              >
                <div className={`pattern-preview abstract-${['geometric', 'organic', 'texture', 'angular', 'layered', 'optical', 'geometric', 'organic'][(num - 1) % 8]}-1`} style={{ opacity: 0.9 }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pattern to Fashion - 3 boxes, clean labels */}
      <section style={{ background: '#F8F9FA', padding: '4rem 3rem' }} data-testid="pattern-to-fashion-section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2.25rem', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>Pattern to Fashion</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            {/* Fashion Box 1 */}
            <div data-testid="fashion-box-1" style={{
              height: '280px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '3px solid var(--text-primary)',
              background: 'var(--bg-page)',
              position: 'relative',
              boxShadow: 'var(--shadow-bold)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #E0E0E0 25%, #F5F5F5 25%, #F5F5F5 50%, #E0E0E0 50%, #E0E0E0 75%, #F5F5F5 75%)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            {/* Fashion Box 2 */}
            <div data-testid="fashion-box-2" style={{
              height: '280px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '3px solid var(--text-primary)',
              background: 'var(--bg-page)',
              position: 'relative',
              boxShadow: 'var(--shadow-bold)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, #FFE5E5 30%, #FFF0F0 30%, #FFF0F0 50%, #FFE5E5 50%)',
                backgroundSize: '60px 60px'
              }}></div>
            </div>

            {/* Fashion Box 3 */}
            <div data-testid="fashion-box-3" style={{
              height: '280px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '3px solid var(--text-primary)',
              background: 'var(--bg-page)',
              position: 'relative',
              boxShadow: 'var(--shadow-bold)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(60deg, #E8F5E9 20%, #C8E6C9 40%, #A5D6A7 60%, #81C784 80%)',
                backgroundSize: '100% 100%'
              }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Compact with styled printing note */}
      <section className="philosophy-section" style={{ padding: '3rem 2rem' }} data-testid="philosophy-section">
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h2 style={{ marginBottom: '1rem', textAlign: 'center', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase' }}>
            {philosophyContent.heading}
          </h2>
          <p style={{ maxWidth: '60ch', margin: '0 auto', textAlign: 'center', fontSize: '1.15rem', lineHeight: 1.6 }}>
            {philosophyContent.body}
          </p>
          <p style={{ 
            marginTop: '1.5rem', 
            textAlign: 'center', 
            fontFamily: '"Pacifico", "Lobster", cursive',
            fontSize: '1.6rem',
            background: 'linear-gradient(135deg, #FF6B9D 0%, #C44FE2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 400
          }}>
            Optional fabric printing available through our print partners
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
