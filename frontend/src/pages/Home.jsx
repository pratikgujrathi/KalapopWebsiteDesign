import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { philosophyContent, processSteps } from '../mockData';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const [bannerImages, setBannerImages] = useState({});
  const [featuredPatterns, setFeaturedPatterns] = useState({});
  const [fashionImages, setFashionImages] = useState({});
  const [processImages, setProcessImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/site-images`);
        if (response.ok) {
          const data = await response.json();
          setBannerImages(data.banner_images || {});
          setFeaturedPatterns(data.featured_patterns || {});
          setFashionImages(data.fashion_images || {});
          setProcessImages(data.process_images || {});
        }
      } catch (error) {
        console.error('Error fetching site images:', error);
      }
    };

    fetchImages();
    const handleUpdate = () => fetchImages();
    window.addEventListener('kalapop-image-update', handleUpdate);
    return () => window.removeEventListener('kalapop-image-update', handleUpdate);
  }, []);

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith('/api') ? `${API_URL}${path}` : path;
  };

  return (
    <div className="home-page" data-testid="home-page">
      {/* Hero Banner */}
      <section className="hero-banner" data-testid="hero-banner">
        <div className="hero-container">
          {/* Text Block */}
          <div className="hero-text">
            <div className="hero-badge">Surface Design Studio</div>
            <h1 className="hero-title">Bold Patterns<br/>for Modern<br/>Brands</h1>
            <p className="hero-description">
              Design-led surface studio creating curated patterns for boutiques, designers, and creative professionals.
            </p>
            <div className="hero-buttons">
              <Link to="/collections" className="btn-primary" data-testid="browse-patterns-btn">
                Browse Patterns
              </Link>
              <Link to="/how-it-works" className="btn-secondary" data-testid="view-plans-btn">
                View Plans
              </Link>
            </div>
          </div>

          {/* 9 Image Grid */}
          <div className="hero-grid" data-testid="banner-image-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div key={num} className="hero-grid-item" data-testid={`banner-img-${num}`}>
                {bannerImages[`slot${num}`] ? (
                  <img src={getImageUrl(bannerImages[`slot${num}`])} alt={`Banner ${num}`} />
                ) : (
                  <div className={`pattern-preview abstract-${['geometric', 'organic', 'texture', 'angular', 'layered', 'optical', 'geometric', 'organic', 'texture'][num - 1]}-1`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kalapop Studio Section */}
      <section className="studio-section" data-testid="kalapop-studio-section">
        <div className="studio-container">
          <h2 className="studio-title">
            <span className="studio-kalapop">Kalapop</span>
            <span className="studio-word">Studio</span>
          </h2>
          <p className="studio-description">
            Kalapop is a curated surface design studio offering production-ready textile patterns for modern fashion brands. Designers can access seamless patterns through subscription and use them for commercial collections.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="process-section" data-testid="process-section">
        <div className="process-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Discover, Subscribe, Download — Simple access to professional textile patterns.</p>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <div key={step.id} className="process-block" data-testid={`process-step-${step.id}`}>
              <div className="process-block-pattern">
                {processImages[step.id === 1 ? 'discover' : step.id === 2 ? 'subscribe' : 'download'] ? (
                  <img src={getImageUrl(processImages[step.id === 1 ? 'discover' : step.id === 2 ? 'subscribe' : 'download'])} alt={step.title} />
                ) : (
                  <div className={`pattern-preview abstract-${step.id === 1 ? 'geometric' : step.id === 2 ? 'organic' : 'texture'}-1`}></div>
                )}
              </div>
              <h3 className="process-title" style={{ color: step.id === 3 ? 'var(--text-inverse)' : 'var(--text-primary)' }}>
                {step.title}
              </h3>
              <p className="process-desc" style={{ color: step.id === 3 ? 'var(--text-inverse)' : 'var(--text-primary)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Patterns */}
      <section className="featured-section" data-testid="featured-patterns-section">
        <h2 className="section-title">Featured Patterns</h2>
        <div className="featured-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className="featured-item" data-testid={`featured-pattern-${num}`}>
              {featuredPatterns[`pattern${num}`] ? (
                <img src={getImageUrl(featuredPatterns[`pattern${num}`])} alt={`Featured ${num}`} />
              ) : (
                <div className={`pattern-preview abstract-${['geometric', 'organic', 'texture', 'angular', 'layered', 'optical', 'geometric', 'organic'][(num - 1) % 8]}-1`}></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pattern to Fashion - Card Style */}
      <section className="fashion-section" data-testid="pattern-to-fashion-section">
        <h2 className="section-title" style={{ color: 'white', marginBottom: '2rem' }}>Pattern to Fashion</h2>
        <div className="fashion-grid">
          {/* Card 1 */}
          <div className="fashion-card" data-testid="fashion-box-1">
            <div className="fashion-card-image">
              {fashionImages.fashion1 ? (
                <img src={getImageUrl(fashionImages.fashion1)} alt="Fashion 1" />
              ) : (
                <div className={`pattern-preview abstract-geometric-1`}></div>
              )}
            </div>
            <div className="fashion-card-content">
              <h3 className="fashion-card-title">Summer Dress</h3>
              <p className="fashion-card-desc">Vibrant patterns for lightweight summer collections.</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="fashion-card" data-testid="fashion-box-2">
            <div className="fashion-card-image">
              {fashionImages.fashion2 ? (
                <img src={getImageUrl(fashionImages.fashion2)} alt="Fashion 2" />
              ) : (
                <div className={`pattern-preview abstract-organic-1`}></div>
              )}
            </div>
            <div className="fashion-card-content">
              <h3 className="fashion-card-title">Resort Wear</h3>
              <p className="fashion-card-desc">Elegant prints for resort and vacation styles.</p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="fashion-card" data-testid="fashion-box-3">
            <div className="fashion-card-image">
              {fashionImages.fashion3 ? (
                <img src={getImageUrl(fashionImages.fashion3)} alt="Fashion 3" />
              ) : (
                <div className={`pattern-preview abstract-texture-1`}></div>
              )}
            </div>
            <div className="fashion-card-content">
              <h3 className="fashion-card-title">Casual Chic</h3>
              <p className="fashion-card-desc">Modern patterns for everyday fashion statements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section" data-testid="philosophy-section">
        <div className="philosophy-container">
          <h2 className="philosophy-title">{philosophyContent.heading}</h2>
          <p className="philosophy-body">{philosophyContent.body}</p>
          <p className="philosophy-printing">
            Kalapop offers fabric printing for selected patterns in small quantity or low MOQ
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
