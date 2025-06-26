import React from 'react';

const Contact = ({
  form, formErrors, formStatus, formMsg, handleFormChange, handleFormSubmit, userLocation
}) => (
  <section id="contact-section" className="contact-section container">
    <h2>Contact Us</h2>
    <div className="contact-container" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}></div>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="contact-info" style={{ textAlign: 'center' }}>
          <p>Email: info@capella.com</p>
          <p>Phone: +254 700 000000</p>
          <p>Location: Nairobi, Kenya</p>
        </div>
        <div className="contact-form-container" style={{ width: '100%', maxWidth: 400 }}>
          <form className="contact-form" onSubmit={handleFormSubmit} noValidate>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleFormChange}
              required
              aria-invalid={!!formErrors.name}
              aria-describedby="contact-name-error"
            />
            {formErrors.name && <span className="form-msg" id="contact-name-error" style={{ color: 'red' }}>{formErrors.name}</span>}
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleFormChange}
              required
              aria-invalid={!!formErrors.email}
              aria-describedby="contact-email-error"
            />
            {formErrors.email && <span className="form-msg" id="contact-email-error" style={{ color: 'red' }}>{formErrors.email}</span>}
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleFormChange}
              required
              aria-invalid={!!formErrors.message}
              aria-describedby="contact-message-error"
            />
            {formErrors.message && <span className="form-msg" id="contact-message-error" style={{ color: 'red' }}>{formErrors.message}</span>}
            <button type="submit">Send Message</button>
            {formMsg && (
              <span
                className="form-msg"
                style={{ color: formStatus === 'success' ? '#27ae60' : formStatus === 'error' ? 'red' : undefined }}
              >
                {formMsg}
              </span>
            )}
          </form>
        </div>
      </div>
      <div className="map-container" style={{ flex: 2, minWidth: 300 }}>
        {userLocation ? (
          <iframe
            title="Google Map"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '8px' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=15&output=embed&markers=color:red%7C${userLocation.lat},${userLocation.lng}`}
          />
        ) : (
          <div className="map-placeholder">
            <p>Location not available</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default Contact; 