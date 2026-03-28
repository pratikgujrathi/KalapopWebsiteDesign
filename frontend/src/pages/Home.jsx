import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, CreditCard } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Default banner image
const DEFAULT_BANNER_IMAGE = "https://customer-assets.emergentagent.com/job_55db3810-dbd9-4c37-9856-95460402dcf4/artifacts/njd5cche_pgujrati_create_a_stylish_bright_colored_design_pattern_mood__c626fb47-9154-4f3f-bed8-6e2e89c6e318_0.png";

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
    <div className="home-page-v2" data-testid="home-page">
      {/* Hero Banner - Pink Background with Single Tilted Image */}
      <section className="hero-v2" data-testid="hero-banner">
        <div className="hero-content-v2">
          <span className="hero-badge-v2">Surface Design Studio</span>
          <h1 className="hero-title-v2">
            Bold Patterns<br/>for Modern<br/>Brands
          </h1>
          <p className="hero-desc-v2">
            Curated textile patterns for fashion, interiors, and creative applications. Designed for high-end digital and physical applications.
          </p>
          <div className="hero-buttons-v2">
            <Link to="/collections" className="btn-browse">Browse Patterns</Link>
            <Link to="/how-it-works" className="btn-plans">View Plans</Link>
          </div>
        </div>
        
        <div className="hero-image-v2">
          <div className="tilted-card main-card">
            <img 
              src={getImageUrl(bannerImages.slot1) || DEFAULT_BANNER_IMAGE} 
              alt="Pattern moodboard"
            />
          </div>
          <div className="tilted-card accent-card">
            <img 
              src={getImageUrl(bannerImages.slot2) || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200"} 
              alt="Texture sample"
            />
          </div>
          <div className="floating-shape"></div>
        </div>
      </section>

      {/* Kalapop Studio Section - Yellow Background with Curve */}
      <section className="studio-v2" data-testid="kalapop-studio-section">
        <div className="studio-inner-v2">
          <div className="studio-left-v2">
            <h2 className="studio-title-v2">Kalapop Studio</h2>
            <p className="studio-desc-v2">
              Kalapop is a curated surface design studio offering commercially licensed textile patterns for fashion, interiors and modern design brands. Each design is created for real-world use — built to bring your creative vision to life.
            </p>
          </div>
          <div className="studio-cards-v2">
            <div className="studio-card-v2">
              <span className="card-check pink">✓</span>
              <span className="card-text-v2">Curated Pattern Library</span>
            </div>
            <div className="studio-card-v2">
              <span className="card-check gray">✓</span>
              <span className="card-text-v2">Commercial Licensing</span>
            </div>
            <div className="studio-card-v2">
              <span className="card-check gray">✓</span>
              <span className="card-text-v2">Small Batch Fabric Printing</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - White Background */}
      <section className="how-works-v2" data-testid="process-section">
        <h2 className="section-title-v2">How It Works</h2>
        <div className="steps-grid-v2">
          <div className="step-v2">
            <div className="step-icon-v2 icon-pink">
              <Search size={24} />
            </div>
            <h3 className="step-title-v2">Discover</h3>
            <p className="step-desc-v2">Browse our curated library of high-quality textile patterns</p>
          </div>
          <div className="step-v2">
            <div className="step-icon-v2 icon-red">
              <CreditCard size={24} />
            </div>
            <h3 className="step-title-v2">Subscribe</h3>
            <p className="step-desc-v2">Choose a plan that fits your creative needs</p>
          </div>
          <div className="step-v2">
            <div className="step-icon-v2 icon-green">
              <Download size={24} />
            </div>
            <h3 className="step-title-v2">Download</h3>
            <p className="step-desc-v2">Get instant access to full-resolution files</p>
          </div>
        </div>
      </section>

      {/* From Pattern to Product - Green Background, Centered */}
      <section className="pattern-product-v2" data-testid="pattern-to-fashion-section">
        <div className="pp-header-v2">
          <h2 className="pp-title-v2">From Pattern to Product</h2>
          <p className="pp-subtitle-v2">See how our curated patterns transform into beautiful fashion and interior goods.</p>
        </div>
        <div className="pp-grid-v2">
          {/* Row 1 */}
          <div className="pp-row">
            <div className="pp-item pattern-item">
              {featuredPatterns.pattern1 ? (
                <img src={getImageUrl(featuredPatterns.pattern1)} alt="Pattern" />
              ) : (
                <div className="pp-placeholder pink-pattern"></div>
              )}
            </div>
            <div className="pp-item product-item">
              {fashionImages.fashion1 ? (
                <img src={getImageUrl(fashionImages.fashion1)} alt="Dress" />
              ) : (
                <div className="pp-placeholder">
                  <span className="pp-label">Pattern + Dress</span>
                </div>
              )}
            </div>
          </div>
          {/* Row 2 */}
          <div className="pp-row">
            <div className="pp-item pattern-item">
              {featuredPatterns.pattern2 ? (
                <img src={getImageUrl(featuredPatterns.pattern2)} alt="Pattern" />
              ) : (
                <div className="pp-placeholder dark-pattern"></div>
              )}
            </div>
            <div className="pp-item product-item">
              {fashionImages.fashion2 ? (
                <img src={getImageUrl(fashionImages.fashion2)} alt="Shirt" />
              ) : (
                <div className="pp-placeholder">
                  <span className="pp-label">Pattern + Shortset</span>
                </div>
              )}
            </div>
          </div>
          {/* Row 3 */}
          <div className="pp-row">
            <div className="pp-item pattern-item">
              {featuredPatterns.pattern3 ? (
                <img src={getImageUrl(featuredPatterns.pattern3)} alt="Pattern" />
              ) : (
                <div className="pp-placeholder sand-pattern"></div>
              )}
            </div>
            <div className="pp-item product-item">
              {fashionImages.fashion3 ? (
                <img src={getImageUrl(fashionImages.fashion3)} alt="Cushion" />
              ) : (
                <div className="pp-placeholder">
                  <span className="pp-label">Pattern + Cushion</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Additions - Patterns with white border */}
      <section className="latest-v2" data-testid="featured-patterns-section">
        <div className="latest-header-v2">
          <h2 className="section-title-v2">Latest Additions</h2>
          <Link to="/collections" className="view-link-v2">View All Library →</Link>
        </div>
        <div className="latest-grid-v2">
          {[1, 2, 3, 4].map((num) => (
            <Link to={`/design/design-00${num}`} key={num} className="latest-card-v2" data-testid={`featured-pattern-${num}`}>
              <div className="latest-image-v2">
                {featuredPatterns[`pattern${num}`] ? (
                  <img src={getImageUrl(featuredPatterns[`pattern${num}`])} alt={`Pattern ${num}`} />
                ) : (
                  <div className={`pattern-preview abstract-${['geometric', 'organic', 'texture', 'angular'][num - 1]}-1`}></div>
                )}
              </div>
              <div className="latest-border-v2"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-v2">
        <div className="cta-inner-v2">
          <h2 className="cta-title-v2">Bring your products to life.</h2>
          <p className="cta-desc-v2">
            Start today with access to our growing pattern library with a flexible monthly plan. Commercial licenses for all downloads.
          </p>
          <Link to="/how-it-works" className="btn-cta-v2">View Plans</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
