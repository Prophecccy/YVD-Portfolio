import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHashNav = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      // Delay slightly to let the home page mount before scrolling
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
            <Link to="/" className="logo-link">
              <img src="/logo.png" alt="YVD Logo" className={`logo-img ${scrolled ? 'scaled' : ''}`} />
            </Link>
          </div>

          <div className="nav-right">
            <a href="#contact" className="contact-link" onClick={(e) => handleHashNav(e, '#contact')}>Contact</a>
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
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <a href="#bespoke" onClick={(e) => handleHashNav(e, '#bespoke')}>Bespoke</a>
              <a href="#portfolio" onClick={(e) => handleHashNav(e, '#portfolio')}>Portfolio</a>
              <Link to="/library" onClick={() => setMenuOpen(false)} className="text-gold">Detailed Library</Link>
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

