import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        {/* Massive Typographic Hero CTA */}
        <div className="footer-cta">
          <h2>DESIGN YOUR</h2>
          <h2 className="text-gold">LEGACY.</h2>
        </div>

        {/* 3-Column Grid for Details */}
        <div className="footer-details-grid">
          <div className="detail-column">
            <h4>Location</h4>
            <p>BDA Layout 5th Cross,<br />
              HAL 3rd Stage, Muniswamappa Layout,<br />
              Bengaluru, Karnataka 560017
            </p>
            <a href="https://maps.app.goo.gl/mnNTbzo2WU719QyQ7" className="gold-link" target="_blank" rel="noopener noreferrer">
              View on Maps
            </a>
          </div>

          <div className="detail-column">
            <h4>Contact</h4>
            <p>Inquiries & Appointments</p>
            <a href="tel:+919341133441" className="gold-link text-large">+91 93411 33441</a>
          </div>

          <div className="detail-column">
            <h4>Hours</h4>
            <p>Mon - Sat: 9:00 AM – 7:00 PM</p>
            <p className="text-gold">Sun: Closed</p>
          </div>
        </div>
      </div>

      {/* Absolute Anchored Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-brand-logo">
          <img src="/logo.png" alt="Yadhu Associates Logo" className="footer-logo-img" />
          <span><strong>YADHU ASSOCIATES</strong></span>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} 100% Bespoke Manufacturing. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
