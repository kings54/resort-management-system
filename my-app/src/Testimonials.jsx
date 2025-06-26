import React from 'react';

const Testimonials = ({ testimonials }) => (
  <section id="testimonials-section" className="testimonials-section container">
    <h2>What Our Guests Say</h2>
    <div className="testimonials-grid">
      {testimonials.map(t => (
        <div key={t.id} className="testimonial-card">
          <div className="testimonial-text">"{t.text}"</div>
          <div className="testimonial-author">- {t.author}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials; 