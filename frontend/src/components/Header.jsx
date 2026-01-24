import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">Kalapop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link
            to="/collections"
            className={`nav-link ${isActive('/collections') ? 'active' : ''}`}
          >
            Collections
          </Link>
          <Link
            to="/how-it-works"
            className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`}
          >
            How It Works
          </Link>
          <Link to="/login" className="btn-primary" style={{ padding: '0.75em 1.5em' }}>
            Sign In
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="mobile-nav">
          <Link
            to="/collections"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            to="/how-it-works"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link
            to="/login"
            className="btn-primary"
            style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign In
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
