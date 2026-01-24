import React from 'react';
import { Link } from 'react-router-dom';
import { howItWorksSteps } from '../mockData';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
      <section className="page-hero">
        <div className="section-container">
          <h1 className="heading-1" style={{ marginBottom: '24px' }}>How It Works</h1>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '60ch' }}>
            Three simple steps to access professional surface design patterns for your creative projects.
          </p>
        </div>
      </section>

      <section className="steps-detail-section">
        <div className="section-container">
          {howItWorksSteps.map((step, index) => (
            <div key={step.step} className="step-detail-card">
              <div className="step-visual">
                <div className="step-number-large">{step.step}</div>
                <div className={`step-abstract-visual visual-${index + 1}`}></div>
              </div>
              <div className="step-content">
                <h2 className="heading-2" style={{ marginBottom: '24px' }}>
                  {step.title}
                </h2>
                <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '55ch' }}>
                  {step.description}
                </p>
                {index === 0 && (
                  <div className="step-features">
                    <div className="feature-item">
                      <CheckCircle size={20} style={{ color: 'var(--brand-primary)' }} />
                      <span className="body-small" style={{ marginLeft: '12px' }}>25-150+ patterns per tier</span>
                    </div>
                    <div className="feature-item">
                      <CheckCircle size={20} style={{ color: 'var(--brand-primary)' }} />
                      <span className="body-small" style={{ marginLeft: '12px' }}>Curated for commercial use</span>
                    </div>
                    <div className="feature-item">
                      <CheckCircle size={20} style={{ color: 'var(--brand-primary)' }} />
                      <span className="body-small" style={{ marginLeft: '12px' }}>Regular new releases</span>
                    </div>
                  </div>
                )}
                {index === 1 && (
                  <div className="step-features">
                    <div className="feature-item">
                      <CheckCircle size={20} style={{ color: 'var(--brand-primary)' }} />
                      <span className="body-small" style={{ marginLeft: '12px' }}>Quick Google authentication</span>
                    </div>
                    <div className="feature-item">
                      <CheckCircle size={20} style={{ color: 'var(--brand-primary)' }} />
                      <span className="body-small" style={{ marginLeft: '12px' }}>Immediate library access</span>
                    </div>
                    <div className="feature-item">
                      <CheckCircle size={20} style={{ color: 'var(--brand-primary)' }} />
                      <span className="body-small" style={{ marginLeft: '12px' }}>Flexible tier selection</span>
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="step-features">
                    <div className="feature-item">
                      <CheckCircle size={20} style={{ color: 'var(--brand-primary)' }} />
                      <span className="body-small" style={{ marginLeft: '12px' }}>High-resolution file downloads</span>
                    </div>
                    <div className="feature-item">
                      <CheckCircle size={20} style={{ color: 'var(--brand-primary)' }} />
                      <span className="body-small" style={{ marginLeft: '12px' }}>Custom order requests</span>
                    </div>
                    <div className="feature-item">
                      <CheckCircle size={20} style={{ color: 'var(--brand-primary)' }} />
                      <span className="body-small" style={{ marginLeft: '12px' }}>Dedicated support</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="section-container" style={{ textAlign: 'center' }}>
          <h2 className="heading-2" style={{ marginBottom: '24px' }}>Start Creating Today</h2>
          <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '60ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Join creative professionals using Kalapop's surface design library.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn-primary">
              Sign Up Now <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/collections" className="btn-secondary">
              View Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
