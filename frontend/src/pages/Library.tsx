import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SOFA_CATALOG } from '../data/sofas';
import type { Sofa } from '../data/sofas';
import './Library.css';


const Library = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'sectional' | 'sofa' | 'loveseat' | 'chair'>('all');
  const [selectedSofa, setSelectedSofa] = useState<Sofa | null>(null);

  // Form states for Bespoke Inquiry
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // Sync inquiry message pre-fill whenever a sofa is selected
  useEffect(() => {
    if (selectedSofa) {
      setMessage(
        `Greetings, YVD Team. I would like to explore options to commission a bespoke edition of "${
          selectedSofa.name
        }". Please contact me to schedule a materials and sizing consultation.`
      );
      // Reset form status when opening a new sofa
      setIsSubmitted(false);
      setName('');
      setEmail('');
    }
  }, [selectedSofa]);

  // Escape key closes the details modal naturally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSofa(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter items dynamically
  const filteredSofas = SOFA_CATALOG.filter(
    (sofa) => activeFilter === 'all' || sofa.category === activeFilter
  );

  // Handle Mock Bespoke Inquiry Form Submission
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    
    // Luxury delay simulator (1 second) to represent secure transmission to database
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  // Framer Motion Animation Presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className="library-container">
      {/* Back Button / Navigation Trail */}
      <div style={{ width: '100%', maxWidth: '1600px', marginBottom: '2rem' }}>
        <Link to="/" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '10px 20px', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.08)' }}>
          <ArrowLeft size={14} /> Back to Main
        </Link>
      </div>

      {/* 1. Header Block */}
      <header className="library-header">
        <motion.span 
          className="tech-badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Curated Product Index
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          THE DETAILED ARCHIVE
        </motion.h1>
        <div className="separator" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A comprehensive database showcasing the meticulous design, custom proportions, and luxury material options for each custom-engineered piece in the YVD catalog.
        </motion.p>
      </header>

      {/* 2. Interactive Filter Chips */}
      <div className="filter-bar">
        {[
          { label: 'All Seating', value: 'all' },
          { label: 'Sectionals', value: 'sectional' },
          { label: 'Grand Sofas', value: 'sofa' },
          { label: 'Loveseats', value: 'loveseat' },
          { label: 'Accent Chairs', value: 'chair' }
        ].map((filter) => (
          <button
            key={filter.value}
            className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.value as any)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* 3. High-Fidelity Product Cards Grid */}
      <motion.div 
        className="product-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeFilter} // Re-triggers staggered enter animation on filter shifts!
      >
        <AnimatePresence mode="popLayout">
          {filteredSofas.map((sofa) => (
            <motion.div
              key={sofa.id}
              className="product-card"
              variants={cardVariants}
              layout // Smooth transition when filters rearrange adjacent items
              onClick={() => setSelectedSofa(sofa)}
            >
              <div className="product-image-wrapper">
                <span className="category-badge">{sofa.category}</span>
                <img src={sofa.src} alt={sofa.name} loading="lazy" decoding="async" />
              </div>
              <div className="product-card-details">
                <h3>{sofa.name}</h3>
                <p>{sofa.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 4. Fullscreen Details Drawer Modal Overlay */}
      <AnimatePresence>
        {selectedSofa && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSofa(null)}
          >
            {/* Modal Box */}
            <motion.div 
              className="modal-content-wrapper"
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} // Click inside shouldn't close modal
            >
              {/* Close Button */}
              <button className="modal-close-btn" onClick={() => setSelectedSofa(null)} aria-label="Close details">
                <X size={20} />
              </button>

              {/* Left Side: Large Photo Media Frame */}
              <div className="modal-media">
                <img src={selectedSofa.src} alt={selectedSofa.name} />
                <div className="modal-media-overlay" />
              </div>

              {/* Right Side: Detailed specifications & bespoke commission inquiry form */}
              <div className="modal-specs-container">
                <span className="modal-header-meta">
                  ARCHITECTURAL SERIES
                </span>
                <h2>{selectedSofa.name}</h2>
                <p className="modal-description">{selectedSofa.description}</p>
                
                <div className="spec-divider" />
                
                {/* Product spec list */}
                <div className="inquiry-section">
                  <h3>TECHNICAL SPECIFICATIONS</h3>
                  <div className="specs-grid">
                    <div className="spec-row">
                      <span className="spec-label">Standard Sizing</span>
                      <span className="spec-value">{selectedSofa.dimensions}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Frame & Legs</span>
                      <span className="spec-value">Reinforced solid hardwood kiln-dried frame; custom leg finishes available.</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Cushion Filling</span>
                      <span className="spec-value">Multi-density high-resilience foam core encased in micro-feather wrap.</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Available Fabrics</span>
                      <div className="spec-value">
                        <div className="tags-list">
                          {selectedSofa.fabrics.map((fabric, idx) => (
                            <span key={idx} className="tag-item">{fabric}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Key Features</span>
                      <div className="spec-value">
                        <div className="tags-list">
                          {selectedSofa.features.map((feature, idx) => (
                            <span key={idx} className="tag-item" style={{ borderColor: 'rgba(212,175,55,0.2)', color: 'var(--color-mustard)' }}>
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="spec-divider" style={{ margin: '2rem 0 1.5rem 0' }} />

                {/* Interactive Commission inquiry form */}
                <div className="inquiry-section">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div
                        key="inquiry-form-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h3>REQUEST BESPOKE COMMISSION</h3>
                        <form className="inquiry-form" onSubmit={handleInquirySubmit}>
                          <div className="form-group">
                            <label htmlFor="inquiry-name">Your Full Name</label>
                            <input
                              id="inquiry-name"
                              type="text"
                              required
                              placeholder="e.g. Architect Sarah Jenkins"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="inquiry-email">Email Address</label>
                            <input
                              id="inquiry-email"
                              type="email"
                              required
                              placeholder="e.g. sarah@architects.in"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="inquiry-message">Bespoke Specifications Request</label>
                            <textarea
                              id="inquiry-message"
                              rows={4}
                              required
                              placeholder="Describe your architectural constraints or fabric selections..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                          </div>

                          <button type="submit" className="btn-submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <span className="bullet" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                                Processing Request...
                              </>
                            ) : (
                              <>
                                <Send size={15} /> Submit Inquiry Request
                              </>
                            )}
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success-banner"
                        className="form-success-banner"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', damping: 20 }}
                      >
                        <div className="success-icon">
                          <CheckCircle2 size={42} />
                        </div>
                        <h4>INQUIRY SECURELY RECEIVED</h4>
                        <p>
                          Your bespoke specification request for <strong>{selectedSofa.name}</strong> has been logged. 
                          Our custom manufacturing design desk will contact you at <strong>{email}</strong> within 12 business hours.
                        </p>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-mustard)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                          <Sparkles size={12} /> Designing Your Legacy
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;
