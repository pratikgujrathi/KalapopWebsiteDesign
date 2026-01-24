import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-column">
            <h3 className="heading-5" style={{ marginBottom: '16px' }}>Kalapop</h3>
            <p className="body-small" style={{ color: 'var(--text-secondary)', maxWidth: '35ch' }}>
              Contemporary surface design and textile patterns for creative professionals.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="footer-column">
            <p className="caption" style={{ marginBottom: '16px' }}>Explore</p>
            <ul className="footer-links">
              <li><Link to="/collections" className="link-text">Collections</Link></li>
              <li><Link to="/how-it-works" className="link-text">How It Works</Link></li>
              <li><Link to="/login" className="link-text">Sign In</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <p className="caption" style={{ marginBottom: '16px' }}>Connect</p>
            <ul className="footer-links">
              <li><a href="mailto:hello@kalapop.design" className="link-text">hello@kalapop.design</a></li>
              <li><span className="body-small" style={{ color: 'var(--text-secondary)' }}>For B2B inquiries</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="caption" style={{ color: 'var(--text-secondary)' }}>
            © 2025 Kalapop. Surface design for contemporary spaces.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
