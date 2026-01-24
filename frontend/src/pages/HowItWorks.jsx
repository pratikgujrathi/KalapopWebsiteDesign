import React from 'react';
import { Link } from 'react-router-dom';
import { processSteps } from '../mockData';

const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
      <section className="section-narrow" style={{ paddingBottom: '3rem', textAlign: 'center' }}>
        <p className="caption" style={{ marginBottom: '1rem' }}>The Journey</p>
        <h1 className="heading-1" style={{ marginBottom: '1.5rem' }}>How It Works</h1>
        <p className="body-large" style={{ maxWidth: '60ch', margin: '0 auto' }}>
          From curated surface design to thoughtful printing orchestration — a streamlined path for brands and boutiques.
        </p>
      </section>

      <section style={{ background: 'var(--bg-section)' }}>
        <div className="section-container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                style={{
                  marginBottom: index < processSteps.length - 1 ? '4rem' : 0,
                  paddingBottom: index < processSteps.length - 1 ? '4rem' : 0,
                  borderBottom: index < processSteps.length - 1 ? '1px solid var(--border-light)' : 'none'
                }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="caption" style={{ color: 'var(--text-tertiary)' }}>Step {step.id}</span>
                </div>
                <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
                  {step.title}
                </h2>
                <p className="body-large">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-page)' }}>
        <div className="section-container" style={{ textAlign: 'center' }}>
          <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Additional Details</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 className="heading-4" style={{ marginBottom: '0.75rem' }}>Sign Up as a Boutique or Designer</h3>
              <p className="body-medium">
                Create your account with simple Google authentication. Gain immediate access to browse curated surface patterns designed for modern brands.
              </p>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 className="heading-4" style={{ marginBottom: '0.75rem' }}>Explore Curated Surface Designs</h3>
              <p className="body-medium">
                Navigate through three collection tiers — Starter, Controlled, and Exclusive. Each design includes detailed specifications, fabric recommendations, and printing technique guidance.
              </p>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 className="heading-4" style={{ marginBottom: '0.75rem' }}>Choose Fabric, Scale, and Request Order</h3>
              <p className="body-medium">
                Select from curated fabric options, specify your scale preferences, and submit your order request. Our team prepares your design files and coordinates with trusted printing partners for small-batch production.
              </p>
            </div>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <Link to="/login" className="btn-primary" style={{ marginRight: '1rem' }}>
              Get Started
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