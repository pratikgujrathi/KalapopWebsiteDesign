import React from 'react';
import { Link } from 'react-router-dom';
import { collections, philosophyContent, howItWorksSteps } from '../mockData';
import { ArrowRight, Grid3x3, Layers, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Surface Design for Contemporary Spaces</h1>
          <p className="body-large" style={{ color: 'var(--text-secondary)', marginTop: '32px', maxWidth: '40ch' }}>
            Curated pattern libraries for boutiques, designers, and creative professionals who demand distinction.
          </p>
          <div style={{ marginTop: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/collections" className="btn-primary">
              Explore Collections
            </Link>
            <Link to="/how-it-works" className="btn-secondary">
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="section-container">
          <div className="philosophy-content">
            <p className="caption" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Our Philosophy
            </p>
            <h2 className="heading-2" style={{ marginBottom: '32px' }}>
              {philosophyContent.heading}
            </h2>
            <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '65ch' }}>
              {philosophyContent.subheading}
            </p>
            <p className="body-small" style={{ maxWidth: '65ch' }}>
              {philosophyContent.body}
            </p>
          </div>

          {/* Abstract visual element */}
          <div className="philosophy-visual">
            <div className="abstract-pattern-1"></div>
            <div className="abstract-pattern-2"></div>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="how-it-works-preview">
        <div className="section-container">
          <h2 className="heading-2" style={{ marginBottom: '64px', textAlign: 'center' }}>
            Simple Process
          </h2>
          <div className="steps-grid">
            {howItWorksSteps.map((step) => (
              <div key={step.step} className="step-card">
                <div className="step-number">{step.step}</div>
                <h3 className="heading-4" style={{ marginTop: '24px', marginBottom: '16px' }}>
                  {step.title}
                </h3>
                <p className="body-small">{step.description}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <Link to="/how-it-works" className="link-text">
              Learn more <ArrowRight size={16} style={{ display: 'inline', marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="collections-preview">
        <div className="section-container">
          <div style={{ marginBottom: '64px' }}>
            <h2 className="heading-2" style={{ marginBottom: '24px' }}>Collections Overview</h2>
            <p className="body-medium" style={{ color: 'var(--text-secondary)', maxWidth: '65ch' }}>
              Three distinct tiers designed for different creative needs and business scales.
            </p>
          </div>

          <div className="collections-grid">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/collections#${collection.tier}`}
                className="collection-preview-card"
              >
                <div className="collection-icon">
                  {collection.tier === 'starter' && <Grid3x3 size={32} />}
                  {collection.tier === 'controlled' && <Layers size={32} />}
                  {collection.tier === 'exclusive' && <Sparkles size={32} />}
                </div>
                <h3 className="heading-4" style={{ marginBottom: '16px' }}>
                  {collection.name}
                </h3>
                <p className="body-small" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  {collection.description}
                </p>
                <div className="caption" style={{ color: 'var(--brand-primary)' }}>
                  {collection.designCount} Patterns
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
