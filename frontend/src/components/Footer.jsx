import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <h3 className="heading-4" style={{ marginBottom: '1rem' }}>Kalapop</h3>
            <p className="body-medium" style={{ maxWidth: '35ch' }}>
              Contemporary surface design studio — curated patterns for modern brands, thoughtfully produced.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <p className="caption" style={{ marginBottom: '1rem' }}>Explore</p>
            <ul className="footer-links">
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/login">Sign In</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <p className="caption" style={{ marginBottom: '1rem' }}>Connect</p>
            <ul className="footer-links">
              <li><a href="mailto:hello@kalapop.design">hello@kalapop.design</a></li>
              <li><span className="body-small">For boutiques, designers, and B2B inquiries</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="body-small">
            © 2025 Kalapop. Design-led surface patterns for contemporary spaces.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;