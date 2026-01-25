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
      <section className=\"process-section\">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className=\"heading-2\" style={{ marginBottom: '1.5rem' }}>THE KALAPOP PROCESS</h2>
          <p className=\"body-large\" style={{ maxWidth: '60ch', margin: '0 auto' }}>
            From curated design to thoughtful printing in three bold steps.
          </p>
        </div>
        <div className=\"process-grid\">
          {processSteps.map((step, index) => (\n            <div key={step.id} className=\"process-block\" style={{ textAlign: 'center' }}>\n              <div className=\"process-block-pattern\">\n                <div className={`pattern-preview abstract-${step.id === 1 ? 'geometric' : step.id === 2 ? 'organic' : 'texture'}-1`}></div>\n              </div>\n              <h3 className=\"heading-3\" style={{ \n                marginBottom: '1.5rem',\n                color: step.id === 3 ? 'var(--text-inverse)' : 'var(--text-primary)'\n              }}>\n                {step.title}\n              </h3>\n              <p className=\"body-medium\" style={{ \n                fontSize: '1.125rem',\n                color: step.id === 3 ? 'var(--text-inverse)' : 'var(--text-primary)'\n              }}>\n                {step.description}\n              </p>\n            </div>\n          ))}\n        </div>\n      </section>

      {/* Philosophy Section with Bold Background */}\n      <section className=\"philosophy-section\">\n        <div className=\"section-narrow\" style={{ position: 'relative', zIndex: 2 }}>\n          <h2 className=\"heading-2\" style={{ marginBottom: '2rem', textAlign: 'center' }}>\n            {philosophyContent.heading}\n          </h2>\n          <p className=\"body-large\" style={{ maxWidth: '70ch', margin: '0 auto', textAlign: 'center', fontSize: '1.5rem' }}>\n            {philosophyContent.body}\n          </p>\n        </div>\n      </section>

      {/* Collections Preview with Bold Cards */}\n      <section style={{ background: 'var(--bg-page)', padding: '8rem 3rem' }}>\n        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>\n          <div style={{ marginBottom: '5rem', textAlign: 'center' }}>\n            <h2 className=\"heading-2\" style={{ marginBottom: '1.5rem' }}>OUR COLLECTIONS</h2>\n            <p className=\"body-large\" style={{ fontSize: '1.25rem' }}>\n              Three curated tiers designed for different creative needs.\n            </p>\n          </div>

          <div className=\"collections-grid\">\n            {collections.map((collection) => (\n              <Link\n                key={collection.id}\n                to={`/collections#${collection.tier}`}\n                className=\"collection-card\"\n              >\n                <span className=\"collection-badge\">{collection.access}</span>\n                <h3 className=\"heading-3\" style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>\n                  {collection.name}\n                </h3>\n                <p className=\"body-medium\" style={{ marginBottom: '2rem', fontSize: '1.125rem' }}>\n                  {collection.description}\n                </p>\n                <p className=\"caption\" style={{ fontSize: '0.875rem' }}>\n                  {collection.designCount} PATTERNS\n                </p>\n              </Link>\n            ))}\n          </div>

          <div style={{ textAlign: 'center', marginTop: '5rem' }}>\n            <Link to=\"/collections\" className=\"btn-primary\">\n              View All Collections\n            </Link>\n          </div>\n        </div>\n      </section>\n    </div>\n  );\n};\n\nexport default Home;
