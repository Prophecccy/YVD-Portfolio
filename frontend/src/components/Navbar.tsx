import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
        <div className="nav-content">
          <div className="nav-left">
            <button className="menu-btn" onClick={() => setMenuOpen(true)}>
              <span className="menu-text">MENU</span>
            </button>
          </div>
          
          <div className="nav-center">
            <a href="/" className="logo-link">
              <img src="/logo.png" alt="YVD Logo" className={`logo-img ${scrolled ? 'scaled' : ''}`} />
            </a>
          </div>

          <div className="nav-right">
            <a href="#contact" className="contact-link">Contact</a>
          </div>
        </div>
      </header>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="menu-overlay"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="menu-header">
              <button className="close-btn tech-btn" onClick={() => setMenuOpen(false)}>
                CLOSE
              </button>
            </div>
            <div className="menu-links">
              <a href="#hero" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#bespoke" onClick={() => setMenuOpen(false)}>Bespoke</a>
              <a href="#portfolio" onClick={() => setMenuOpen(false)}>Showcase</a>
              <a href="#craftsmanship" onClick={() => setMenuOpen(false)}>Craftsmanship</a>
            </div>
            <div className="menu-footer">
              <p>Yadhu Associates &copy; {new Date().getFullYear()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
