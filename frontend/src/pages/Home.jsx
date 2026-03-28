import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, CreditCard } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Banner collage image (uploaded by user)
const BANNER_COLLAGE_IMAGE = "https://customer-assets.emergentagent.com/job_ac53fef2-b223-41a6-943f-33daaf77d05e/artifacts/61omomwf_freepik_create-a-collage-as-individual-images-stitched-together-for-banner-image-that-looks-classic-design-aesthetics-without-typography-and-show-images-individually.-keep-the-collage-as-per-atta_0001.png";

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
      {/* Hero Banner - Pink Background with Single Collage Image on Right */}
      <section className="hero-v2" data-testid="hero-banner">
        <div className="hero-content-v2">
          <span className="hero-badge-v2">Surface Design Studio</span>
          <h1 className="hero-title-v2">
            Bold Patterns for Modern Brands
          </h1>
          <p className="hero-desc-v2">
            Curated surface patterns for fashion, interiors, and creative collections. Designed for high-end digital and physical applications.
          </p>
          <div className="hero-buttons-v2">
            <Link to="/collections" className="btn-browse">Browse Patterns</Link>
            <Link to="/how-it-works" className="btn-plans">View Plans</Link>
          </div>
        </div>
        
        <div className="hero-image-v2">
          <div className="hero-collage">
            <img 
              src={BANNER_COLLAGE_IMAGE} 
              alt="Pattern collage moodboard"
            />
          </div>
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
              <span className="card-check orange">✓</span>
              <span className="card-text-v2">Commercial Licensing</span>
            </div>
            <div className="studio-card-v2">
              <span className="card-check blue">✓</span>
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

      {/* From Pattern to Product - Green Background, 2-column layout */}
      <section className="pattern-product-v2" data-testid="pattern-to-fashion-section">
        <div className="pp-header-v2">
          <h2 className="pp-title-v2">From Pattern to Product</h2>
          <p className="pp-subtitle-v2">See how our curated patterns transform into beautiful fashion and interior goods.</p>
        </div>
        <div className="pp-grid-v2">
          {/* Row 1 */}
          <div className="pp-row">
            <div className="pp-card-v2">
              <div className="pp-card-image">
                {featuredPatterns.pattern1 ? (
                  <img src={getImageUrl(featuredPatterns.pattern1)} alt="Pattern 1" />
                ) : (
                  <div className="pp-card-placeholder pattern-bg-1"></div>
                )}
              </div>
              <div className="pp-card-info">
                <h3 className="pp-card-title">Floral Bloom</h3>
                <p className="pp-card-category">Pattern</p>
              </div>
            </div>
            <div className="pp-card-v2">
              <div className="pp-card-image">
                {fashionImages.fashion1 ? (
                  <img src={getImageUrl(fashionImages.fashion1)} alt="Summer Dress" />
                ) : (
                  <div className="pp-card-placeholder style-bg"></div>
                )}
              </div>
              <div className="pp-card-info">
                <h3 className="pp-card-title">Summer Dress</h3>
                <p className="pp-card-category">Style</p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="pp-row">
            <div className="pp-card-v2">
              <div className="pp-card-image">
                {featuredPatterns.pattern2 ? (
                  <img src={getImageUrl(featuredPatterns.pattern2)} alt="Pattern 2" />
                ) : (
                  <div className="pp-card-placeholder pattern-bg-2"></div>
                )}
              </div>
              <div className="pp-card-info">
                <h3 className="pp-card-title">Geometric Wave</h3>
                <p className="pp-card-category">Pattern</p>
              </div>
            </div>
            <div className="pp-card-v2">
              <div className="pp-card-image">
                {fashionImages.fashion2 ? (
                  <img src={getImageUrl(fashionImages.fashion2)} alt="Co-ord Set" />
                ) : (
                  <div className="pp-card-placeholder style-bg"></div>
                )}
              </div>
              <div className="pp-card-info">
                <h3 className="pp-card-title">Co-ord Set</h3>
                <p className="pp-card-category">Style</p>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="pp-row">
            <div className="pp-card-v2">
              <div className="pp-card-image">
                {featuredPatterns.pattern3 ? (
                  <img src={getImageUrl(featuredPatterns.pattern3)} alt="Pattern 3" />
                ) : (
                  <div className="pp-card-placeholder pattern-bg-3"></div>
                )}
              </div>
              <div className="pp-card-info">
                <h3 className="pp-card-title">Botanical Garden</h3>
                <p className="pp-card-category">Pattern</p>
              </div>
            </div>
            <div className="pp-card-v2">
              <div className="pp-card-image">
                {fashionImages.fashion3 ? (
                  <img src={getImageUrl(fashionImages.fashion3)} alt="Cushion" />
                ) : (
                  <div className="pp-card-placeholder style-bg"></div>
                )}
              </div>
              <div className="pp-card-info">
                <h3 className="pp-card-title">Home Cushion</h3>
                <p className="pp-card-category">Style</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Additions - Patterns with card layout */}
      <section className="latest-v2" data-testid="featured-patterns-section">
        <div className="latest-header-v2">
          <h2 className="section-title-v2">Latest Additions</h2>
          <Link to="/collections" className="view-link-v2">View All Library →</Link>
        </div>
        <div className="latest-grid-v2">
          {[
            { num: 1, name: 'Geometric Horizon', category: 'Geometric' },
            { num: 2, name: 'Organic Flow', category: 'Organic' },
            { num: 3, name: 'Texture Bloom', category: 'Texture' },
            { num: 4, name: 'Angular Vision', category: 'Angular' }
          ].map((item) => (
            <Link to={`/design/design-00${item.num}`} key={item.num} className="latest-card-v2" data-testid={`featured-pattern-${item.num}`}>
              <div className="latest-image-v2">
                {featuredPatterns[`pattern${item.num}`] ? (
                  <img src={getImageUrl(featuredPatterns[`pattern${item.num}`])} alt={item.name} />
                ) : (
                  <div className={`pattern-preview abstract-${['geometric', 'organic', 'texture', 'angular'][item.num - 1]}-1`}></div>
                )}
              </div>
              <div className="latest-info-v2">
                <h3 className="latest-name-v2">{item.name}</h3>
                <p className="latest-category-v2">{item.category}</p>
              </div>
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
