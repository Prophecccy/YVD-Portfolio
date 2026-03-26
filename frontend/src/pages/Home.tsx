import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import Sofa3D from '../components/Sofa3D';
import DualMarqueeGallery from '../components/DualMarqueeGallery';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* 1. Pristine Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src="/portfolio/sofa-1.jpg" alt="YVD Bespoke Sofa" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <span className="tech-badge">The Architectural Series</span><br/>
            CRAFTED FOR <br/> <span className="glow-text">YOUR VISION.</span>
          </motion.h1>
         
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="hero-cta"
          >
            <MagneticButton className="btn-primary">Customize Yours</MagneticButton>
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
          <div className="bespoke-image-wrapper">
            <img src="/portfolio/sofa-2.jpg" alt="Bespoke Craftsmanship" className="bespoke-image" />
          </div>
          <div className="bespoke-content">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="section-title">Endless Options.</h2>
              <div className="separator"></div>
              <h3 className="section-subtitle">Uncompromising Quality.</h3>
              <p className="section-text">
                Every YVD piece is a masterclass in personalized engineering. 
                Choose from over 500 premium curated fabrics, exotic Italian leathers, 
                and precision-cut structural components. 
                Your vision, materialized without compromise.
              </p>
              
              <ul className="bespoke-features">
                <li><span className="bullet"></span> Signature Hand-Stitching</li>
                <li><span className="bullet"></span> Ergonomic Memory Foam</li>
                <li><span className="bullet"></span> Hardwood Framework</li>
                <li><span className="bullet"></span> Custom Dimensions</li>
              </ul>
              
              <button className="btn-secondary">Explore Materials</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The 3D Engine Showcase */}
      <section className="showcase-3d" id="showcase">
        {/* Animated Architectural Black Cut */}
        <motion.div
           style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.1 }}
           variants={{ hidden: {}, visible: {} }}
        >
          <motion.div 
            className="showcase-black-cut"
            variants={{
              hidden: { x: "100vw" },
              visible: { x: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
            }}
          />
        </motion.div>
        
        <div className="newspaper-bg"></div>
        <div className="showcase-content">
          <Sofa3D />
          <motion.div 
            className="showcase-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>Signature Geometry.</h2>
            <div className="separator" style={{ backgroundColor: "#111111", margin: "1.5rem 0" }}></div>
            <p>
              Every piece we manufacture is a masterclass in structural integrity. We blend architectural precision with premium, hand-selected materials to deliver seating that acts as the absolute anchor of your living space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Dual-Row Infinite Portfolio */}
      <DualMarqueeGallery />

    </div>
  );
};

export default Home;
