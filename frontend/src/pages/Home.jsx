import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, CreditCard } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Default banner images
const DEFAULT_BANNER_IMAGES = [
  "https://customer-assets.emergentagent.com/job_55db3810-dbd9-4c37-9856-95460402dcf4/artifacts/njd5cche_pgujrati_create_a_stylish_bright_colored_design_pattern_mood__c626fb47-9154-4f3f-bed8-6e2e89c6e318_0.png",
  "https://customer-assets.emergentagent.com/job_55db3810-dbd9-4c37-9856-95460402dcf4/artifacts/v9mux4eo_pgujrati_create_a_stylish_bright_colored_design_pattern_mood__531ddc23-7de4-438f-99e4-a7b886f0b842_2.png"
];

const Home = () => {
  const [featuredPatterns, setFeaturedPatterns] = useState({});
  const [fashionImages, setFashionImages] = useState({});
  const [bannerImages, setBannerImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/site-images`);
        if (response.ok) {
          const data = await response.json();
          setFeaturedPatterns(data.featured_patterns || {});
          setFashionImages(data.fashion_images || {});
          setBannerImages(data.banner_images || {});
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
    <div className="home-page-new" data-testid="home-page">
      {/* Hero Banner - Pink Background */}
      <section className="hero-banner-new" data-testid="hero-banner">
        <div className="hero-container-new">
          <div className="hero-content-new">
            <span className="hero-badge-new">Surface Design Studio</span>
            <h1 className="hero-title-new">
              Bold Patterns<br/>for Modern<br/>Brands
            </h1>
            <p className="hero-description-new">
              Curated textile patterns for fashion, interiors, and creative applications. Designed for high-end digital and physical applications.
            </p>
            <div className="hero-buttons-new">
              <Link to="/collections" className="btn-hero-primary" data-testid="browse-patterns-btn">
                Browse Patterns
              </Link>
              <Link to="/how-it-works" className="btn-hero-secondary" data-testid="view-plans-btn">
                View Plans
              </Link>
            </div>
          </div>
          
          <div className="hero-images-new">
            <div className="hero-image-card hero-image-1">
              <img 
                src={getImageUrl(bannerImages.slot1) || DEFAULT_BANNER_IMAGES[0]} 
                alt="Fashion textile pattern moodboard"
                loading="eager"
              />
            </div>
            <div className="hero-image-card hero-image-2">
              <img 
                src={getImageUrl(bannerImages.slot2) || DEFAULT_BANNER_IMAGES[1]} 
                alt="Modern surface design pattern"
                loading="eager"
              />
            </div>
            <div className="hero-image-card hero-image-3">
              <img 
                src={getImageUrl(bannerImages.slot3) || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"} 
                alt="Decorative pattern sample"
                loading="eager"
              />
            </div>
            <div className="hero-image-card hero-image-4">
              <img 
                src={getImageUrl(bannerImages.slot4) || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"} 
                alt="Abstract design pattern"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kalapop Studio Section - Yellow-Green Background */}
      <section className="studio-section-new2" data-testid="kalapop-studio-section">
        <div className="studio-container-new2">
          <div className="studio-left">
            <h2 className="studio-title-new2">Kalapop Studio</h2>
            <p className="studio-description-new2">
              Kalapop is a curated surface design studio offering commercially licensed textile patterns for fashion, interiors and modern design brands. Each design is created for real-world use — built to bring your creative vision to life.
            </p>
          </div>
          <div className="studio-features">
            <div className="studio-feature-item">
              <span className="feature-icon feature-icon-pink">✓</span>
              <span className="feature-text">Curated Pattern Library</span>
            </div>
            <div className="studio-feature-item">
              <span className="feature-icon feature-icon-white">✓</span>
              <span className="feature-text">Commercial Licensing</span>
            </div>
            <div className="studio-feature-item">
              <span className="feature-icon feature-icon-white">✓</span>
              <span className="feature-text">Small Batch Fabric Printing</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Beige Background */}
      <section className="how-it-works-new" data-testid="process-section">
        <h2 className="section-title-new">How It Works</h2>
        <div className="process-grid-new">
          <div className="process-step-new">
            <div className="process-icon process-icon-pink">
              <Search size={24} />
            </div>
            <h3 className="process-step-title">Discover</h3>
            <p className="process-step-desc">Browse our curated library of high-quality textile patterns</p>
          </div>
          <div className="process-step-new">
            <div className="process-icon process-icon-red">
              <CreditCard size={24} />
            </div>
            <h3 className="process-step-title">Subscribe</h3>
            <p className="process-step-desc">Choose a plan that fits your creative needs</p>
          </div>
          <div className="process-step-new">
            <div className="process-icon process-icon-green">
              <Download size={24} />
            </div>
            <h3 className="process-step-title">Download</h3>
            <p className="process-step-desc">Get instant access to full-resolution files</p>
          </div>
        </div>
      </section>

      {/* From Pattern to Product - Green Background */}
      <section className="pattern-to-product-new" data-testid="pattern-to-fashion-section">
        <div className="pattern-product-header">
          <h2 className="section-title-dark">From Pattern to Product</h2>
          <p className="section-subtitle-dark">See how our curated patterns transform into beautiful fashion and interior goods.</p>
        </div>
        <div className="pattern-product-grid">
          <div className="product-card product-card-pink">
            {featuredPatterns.pattern1 ? (
              <img src={getImageUrl(featuredPatterns.pattern1)} alt="Pattern sample" />
            ) : (
              <div className="product-placeholder"></div>
            )}
          </div>
          <div className="product-card product-card-peach">
            {fashionImages.fashion1 ? (
              <img src={getImageUrl(fashionImages.fashion1)} alt="Fashion dress with pattern" />
            ) : (
              <div className="product-placeholder">
                <span>Pattern + Dress</span>
              </div>
            )}
          </div>
          <div className="product-card product-card-dark">
            {featuredPatterns.pattern2 ? (
              <img src={getImageUrl(featuredPatterns.pattern2)} alt="Dark pattern sample" />
            ) : (
              <div className="product-placeholder dark"></div>
            )}
          </div>
          <div className="product-card product-card-teal">
            {fashionImages.fashion2 ? (
              <img src={getImageUrl(fashionImages.fashion2)} alt="Shirt with pattern" />
            ) : (
              <div className="product-placeholder">
                <span>Pattern + Shortset</span>
              </div>
            )}
          </div>
          <div className="product-card product-card-sand">
            {featuredPatterns.pattern3 ? (
              <img src={getImageUrl(featuredPatterns.pattern3)} alt="Sand pattern sample" />
            ) : (
              <div className="product-placeholder sand"></div>
            )}
          </div>
          <div className="product-card product-card-beige">
            {fashionImages.fashion3 ? (
              <img src={getImageUrl(fashionImages.fashion3)} alt="Cushion with pattern" />
            ) : (
              <div className="product-placeholder">
                <span>Pattern + Cushion</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest Additions */}
      <section className="latest-additions-new" data-testid="featured-patterns-section">
        <div className="latest-header">
          <h2 className="section-title-new">Latest Additions</h2>
          <Link to="/collections" className="view-all-link">View All Library →</Link>
        </div>
        <div className="latest-grid">
          {[1, 2, 3, 4].map((num) => (
            <Link to={`/design/design-00${num}`} key={num} className="latest-item" data-testid={`featured-pattern-${num}`}>
              {featuredPatterns[`pattern${num}`] ? (
                <img 
                  src={getImageUrl(featuredPatterns[`pattern${num}`])} 
                  alt={`Latest pattern ${num}`}
                  loading="lazy"
                />
              ) : (
                <div className={`pattern-preview abstract-${['geometric', 'organic', 'texture', 'angular'][num - 1]}-1`}></div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section - Coral/Terracotta */}
      <section className="cta-section-new">
        <div className="cta-content">
          <h2 className="cta-title">Bring your products to life.</h2>
          <p className="cta-description">
            Start today with access to our growing pattern library with a flexible monthly plan. Commercial licenses for all downloads.
          </p>
          <Link to="/how-it-works" className="btn-cta">View Plans</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
