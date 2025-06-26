import React from 'react';
import heroFallback from './images/herobackground.jpg';
import { FaWhatsapp } from 'react-icons/fa';

const Hero = ({ setShowModal, setShowOrder }) => (
  <header className="hero-banner" style={{ width: '100vw', height: '100vh', minHeight: 500, position: 'relative', overflow: 'hidden', margin: 0, padding: 0 }}>
    <video
      className="hero-video-bg"
      src="/herobackground.mp4"
      autoPlay
      loop
      muted
      playsInline
      poster={heroFallback}
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: 500,
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        filter: 'brightness(0.7)',
        margin: 0,
        padding: 0
      }}
    />
    <div className="hero-content" style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center' }}>
      <h1>Capella</h1>
      <p>Fine dining with locally sourced ingredients</p>
      <button className="cta-button" onClick={() => setShowModal(true)}>Reserve a Table</button>
      <button className="order-button" onClick={() => setShowOrder(true)}>View Order</button>
    </div>
    {/* WhatsApp Chat Button */}
    <a
      href="https://wa.me/254778274899"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1001,
        background: '#25D366',
        color: 'white',
        borderRadius: '50%',
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        fontSize: 36,
        textDecoration: 'none',
        transition: 'background 0.2s',
      }}
      className="whatsapp-float-btn"
    >
      <FaWhatsapp />
    </a>
  </header>
);

export default Hero; 