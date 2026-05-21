import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Sofa3D from '../components/Sofa3D';
import DualMarqueeGallery from '../components/DualMarqueeGallery';
import './Home.css';

const Home = () => {
  const [bespokeInView, setBespokeInView] = useState(false);
  const [showcaseInView, setShowcaseInView] = useState(false);

  const bespokeRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bespokeRef.current) {
        const rect = bespokeRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
          setBespokeInView(true);
        }
      }
      if (showcaseRef.current) {
        const rect = showcaseRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
          setShowcaseInView(true);
        }
      }
    };

    // Listen to scroll events on both window and document
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check in case they are already in view on load
    handleScroll();
    // Run another check after assets load
    window.addEventListener('load', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
    };
  }, []);

  const { scrollY } = useScroll();

  // Hardware-accelerated smooth background parallax scroll
  const bgScale = useTransform(scrollY, [0, 1000], [1.0, 1.12]);
  const bgY = useTransform(scrollY, [0, 1000], [0, 80]);

  return (
    <div className="home-container">
      {/* 1. Pristine Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg" style={{ overflow: 'hidden' }}>
          <motion.img 
            src="/portfolio/sofa-1.jpg" 
            alt="YVD Bespoke Sofa" 
            style={{ y: bgY, scale: bgScale, willChange: 'transform' }}
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            <motion.span 
              className="tech-badge"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              The Architectural Series
            </motion.span>
            <br />
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              CRAFTED FOR <br/> <span className="glow-text">YOUR VISION.</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Brutalist Marquee Divider securely pinned to bottom */}
        <div className="tech-marquee-container">
          <div className="tech-marquee">
            <span>• YADHU ASSOCIATES • BESPOKE INTERIORS • SIGNATURE CRAFTSMANSHIP • 100% CUSTOMIZED • YADHU ASSOCIATES • BESPOKE INTERIORS • SIGNATURE CRAFTSMANSHIP • 100% CUSTOMIZED • </span>
          </div>
        </div>
      </section>

      {/* 2. The Bespoke Process */}
      <section className="bespoke" id="bespoke">
        <div className="bespoke-grid">
          <div 
            ref={bespokeRef}
            className={`bespoke-image-wrapper ${bespokeInView ? 'is-visible' : ''}`}
          >
            <div className="bespoke-curtain" />
            <img 
              src="/portfolio/sofa-2.jpg" 
              alt="Bespoke Craftsmanship" 
              className="bespoke-image" 
            />
          </div>

          <div className="bespoke-content">
            <motion.div
              initial="hidden"
              animate={bespokeInView ? 'visible' : 'hidden'}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.h2 
                className="section-title"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                Endless Options.
              </motion.h2>
              <motion.div 
                className="separator"
                variants={{
                  hidden: { scaleX: 0, originX: 0 },
                  visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              />
              <motion.h3 
                className="section-subtitle"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                Uncompromising Quality.
              </motion.h3>
              <motion.p 
                className="section-text"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                Every YVD piece is a masterclass in personalized engineering. 
                Choose from over 500 premium curated fabrics, exotic Italian leathers, 
                and precision-cut structural components. 
                Your vision, materialized without compromise.
              </motion.p>
              
              <motion.ul 
                className="bespoke-features"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08
                    }
                  }
                }}
              >
                {[
                  "Signature Hand-Stitching",
                  "Ergonomic Memory Foam",
                  "Hardwood Framework",
                  "Custom Dimensions"
                ].map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, x: -15 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                    }}
                  >
                    <span className="bullet"></span> {feature}
                  </motion.li>
                ))}
              </motion.ul>
              
              <motion.button 
                className="btn-secondary"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                Explore Materials
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The 3D Engine Showcase */}
      <section className="showcase-3d" id="showcase">
        <div 
          ref={showcaseRef}
          className={`showcase-black-cut ${showcaseInView ? 'is-visible' : ''}`}
        />
        
        <div className="newspaper-bg"></div>
        <div className="showcase-content">
          <Sofa3D />
          <motion.div 
            className="showcase-text"
            initial="hidden"
            animate={showcaseInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              Signature Geometry.
            </motion.h2>
            <motion.div 
              className="separator showcase-separator" 
              style={{ margin: "1.5rem 0" }}
              variants={{
                hidden: { scaleX: 0, originX: 0 },
                visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            />
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              Every piece we manufacture is a masterclass in structural integrity. We blend architectural precision with premium, hand-selected materials to deliver seating that acts as the absolute anchor of your living space.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 4. Dual-Row Infinite Portfolio */}
      <DualMarqueeGallery />

    </div>
  );
};
export default Home;
