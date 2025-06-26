import React, { useState, useEffect } from 'react';
import './RestaurantHome.css';
import { useNavigate } from 'react-router-dom';
import imgValeriya25524075 from './images/pexels-valeriya-25524075.jpg';
import imgTroopper84 from './images/pexels-troopper84-26838689.jpg';
import imgAmine11581120 from './images/pexels-amine-1285347-11581120.jpg';
import imgNadin24038051 from './images/pexels-nadin-sh-78971847-24038051.jpg';
import imgJeferson15523622 from './images/pexels-jeferson-gomes-24831766-15523622.jpg';
import imgSami10484521 from './images/pexels-sami-aksu-48867324-10484521.jpg';
import imgAriana1162455 from './images/pexels-ariana-gavra-388697-1162455.jpg';
import imgViktor341048 from './images/pexels-viktor-tasnadi-87585-341048.jpg';
import imgValeriya9957547 from './images/pexels-valeriya-9957547.jpg';
import { FaInstagram, FaFacebook, FaTwitter, FaSpinner } from 'react-icons/fa';
import heroFallback from './images/herobackground.jpg';
import Hero from './Hero';
import About from './About';
import Menu from './Menu';
import Testimonials from './Testimonials';
import Contact from './Contact';

const defaultMenu = [
  // Mains
  { id: 1, name: 'Truffle Pasta', price: 'Ksh 2200', description: 'Handmade pasta with black truffle cream sauce', type: 'Main', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', tags: ['vegetarian', 'contains dairy'] },
  { id: 2, name: 'Grilled Salmon', price: 'Ksh 900', description: 'Fresh Atlantic salmon with lemon butter sauce', type: 'Main', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80', tags: ['seafood', 'gluten-free'] },
  { id: 3, name: 'Filet Mignon', price: 'Ksh 1200', description: '8oz prime cut with roasted vegetables', type: 'Main', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80', tags: ['gluten-free'] },
  // Desserts
  { id: 4, name: 'Chocolate Lava Cake', price: 'Ksh 600', description: 'Warm chocolate cake with molten center', type: 'Dessert', image: imgValeriya25524075, tags: ['vegetarian', 'contains dairy', 'contains nuts'] },
  { id: 5, name: 'Mango Cheesecake', price: 'Ksh 550', description: 'Creamy cheesecake with mango topping', type: 'Dessert', image: imgTroopper84, tags: ['vegetarian', 'contains dairy'] },
  { id: 6, name: 'Tiramisu', price: 'Ksh 700', description: 'Classic Italian dessert with coffee and mascarpone', type: 'Dessert', image: imgValeriya9957547, tags: ['vegetarian', 'contains dairy'] },
  { id: 7, name: 'Fruit Tart', price: 'Ksh 500', description: 'Crispy tart with fresh seasonal fruits', type: 'Dessert', image: imgAmine11581120, tags: ['vegetarian', 'contains nuts'] },
  // Drinks
  { id: 8, name: 'Mango Smoothie', price: 'Ksh 350', description: 'Fresh mango blended with yogurt', type: 'Drinks', image: imgNadin24038051, tags: ['vegetarian', 'contains dairy'] },
  { id: 9, name: 'Passion Mojito', price: 'Ksh 400', description: 'Passion fruit, mint, and soda', type: 'Drinks', image: imgJeferson15523622, tags: ['vegan', 'gluten-free'] },
  { id: 10, name: 'Classic Lemonade', price: 'Ksh 250', description: 'Freshly squeezed lemons, sugar, and water', type: 'Drinks', image: imgSami10484521, tags: ['vegan', 'gluten-free'] },
  { id: 11, name: 'Iced Coffee', price: 'Ksh 300', description: 'Chilled coffee with milk and ice', type: 'Drinks', image: imgAriana1162455, tags: ['vegetarian', 'contains dairy'] },
];

function getMenuData() {
  const stored = localStorage.getItem('menu');
  if (stored) {
    try {
      const arr = JSON.parse(stored);
      return arr.map(dish => ({
        ...dish,
        description: dish.description || 'Delicious and freshly prepared.'
      }));
    } catch {
      return defaultMenu;
    }
  }
  return defaultMenu;
}

// Move testimonials to top level and align properly
const testimonials = [
  { id: 1, author: 'Sarah M.', text: 'The best dining experience I\'ve had this year! The service was impeccable.' },
  { id: 2, author: 'James L.', text: 'Every dish was a masterpiece. Will definitely be coming back soon.' },
  { id: 3, author: 'Emma h.', text: 'The ambiance and food quality exceeded all my expectations.' },
];

const menuTypes = ['All', 'Main', 'Dessert', 'Drinks'];

const DEFAULT_LOCATION = { lat: -1.286389, lng: 36.817223 }; // Nairobi, Kenya

const accommodationTypes = [
  {
    id: 1,
    name: 'Deluxe Room',
    description: 'A comfortable room with modern amenities and a beautiful view.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Ocean Villa',
    description: 'A luxurious villa with direct ocean access and private pool.',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Family Suite',
    description: 'Spacious suite perfect for families, with two bedrooms and a living area.',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  },
];

const eventTypes = [
  'Wedding',
  'Conference',
  'Birthday',
  'Anniversary',
  'Corporate Retreat',
  'Other',
];
const timeSlots = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM',
];

const RestaurantHome = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [menuType, setMenuType] = useState('All');
  const [showScroll, setShowScroll] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formMsg, setFormMsg] = useState('');
  const [navOpen, setNavOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const [delivery, setDelivery] = useState({ name: '', address: '', phone: '' });
  const [orderMsg, setOrderMsg] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Mpesa');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  // Notification and Loyalty
  const [notifications, setNotifications] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(() => {
    const pts = localStorage.getItem('loyaltyPoints');
    return pts ? parseInt(pts) : 0;
  });
  const [redeem, setRedeem] = useState(false);
  const [deal, setDeal] = useState({
    title: 'Deal of the Day!',
    desc: 'Get a free dessert with every main course today only!'
  });
  const [orderStatus, setOrderStatus] = useState('');
  // Happy hour: 16:00-18:00
  const isHappyHour = (() => {
    const now = new Date();
    const h = now.getHours();
    return h >= 16 && h < 18;
  })();
  const [tip, setTip] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuData, setMenuData] = useState(getMenuData());
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  // Add state for contact form errors and submission status
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(''); // '', 'success', 'error'
  const [activeTag, setActiveTag] = useState('');
  // Get all unique tags from menuData
  const allTags = Array.from(new Set(menuData.flatMap(item => item.tags || [])));
  const [menuSearch, setMenuSearch] = useState('');
  const [theme, setTheme] = useState('light');
  // Add loading state for order placement
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    type: accommodationTypes[0].name,
    guests: 1,
    checkin: '',
    checkout: '',
  });
  const [bookingMsg, setBookingMsg] = useState('');
  const [activityForm, setActivityForm] = useState({
    name: '',
    email: '',
    activity: 'Water Sports',
    date: '',
  });
  const [activityMsg, setActivityMsg] = useState('');
  const [spaForm, setSpaForm] = useState({
    name: '',
    email: '',
    treatment: 'Massage',
    date: '',
  });
  const [spaMsg, setSpaMsg] = useState('');
  const [eventForm, setEventForm] = useState({
    name: '',
    email: '',
    eventType: 'Wedding',
    date: '',
    guests: 1,
    notes: '',
  });
  const [eventMsg, setEventMsg] = useState('');
  const [diningForm, setDiningForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
    requests: '',
  });
  const [diningMsg, setDiningMsg] = useState('');
  const [showServices, setShowServices] = useState(false);
  const [activeServiceSection, setActiveServiceSection] = useState('');

  const handleBookingChange = e => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };
  const handleBookingSubmit = e => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.checkin || !bookingForm.checkout) {
      setBookingMsg('Please fill in all fields.');
      return;
    }
    const bookings = JSON.parse(localStorage.getItem('accommodationBookings') || '[]');
    bookings.push({ ...bookingForm, time: new Date().toISOString() });
    localStorage.setItem('accommodationBookings', JSON.stringify(bookings));
    setBookingMsg(`Booking successful! Confirmation email sent to ${bookingForm.email}`);
    setBookingForm({
      name: '',
      email: '',
      type: accommodationTypes[0].name,
      guests: 1,
      checkin: '',
      checkout: '',
    });
    setTimeout(() => setBookingMsg(''), 4000);
  };

  const handleActivityChange = e => {
    setActivityForm({ ...activityForm, [e.target.name]: e.target.value });
  };
  const handleActivitySubmit = e => {
    e.preventDefault();
    if (!activityForm.name || !activityForm.email || !activityForm.date) {
      setActivityMsg('Please fill in all fields.');
      return;
    }
    const bookings = JSON.parse(localStorage.getItem('activityBookings') || '[]');
    bookings.push({ ...activityForm, time: new Date().toISOString() });
    localStorage.setItem('activityBookings', JSON.stringify(bookings));
    setActivityMsg(`Booking successful! Confirmation email sent to ${activityForm.email}`);
    setActivityForm({ name: '', email: '', activity: 'Water Sports', date: '' });
    setTimeout(() => setActivityMsg(''), 4000);
  };
  const handleSpaChange = e => {
    setSpaForm({ ...spaForm, [e.target.name]: e.target.value });
  };
  const handleSpaSubmit = e => {
    e.preventDefault();
    if (!spaForm.name || !spaForm.email || !spaForm.date) {
      setSpaMsg('Please fill in all fields.');
      return;
    }
    const bookings = JSON.parse(localStorage.getItem('spaBookings') || '[]');
    bookings.push({ ...spaForm, time: new Date().toISOString() });
    localStorage.setItem('spaBookings', JSON.stringify(bookings));
    setSpaMsg(`Booking successful! Confirmation email sent to ${spaForm.email}`);
    setSpaForm({ name: '', email: '', treatment: 'Massage', date: '' });
    setTimeout(() => setSpaMsg(''), 4000);
  };

  const handleEventChange = e => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  };
  const handleEventSubmit = e => {
    e.preventDefault();
    if (!eventForm.name || !eventForm.email || !eventForm.date || !eventForm.guests) {
      setEventMsg('Please fill in all fields.');
      return;
    }
    const bookings = JSON.parse(localStorage.getItem('eventBookings') || '[]');
    bookings.push({ ...eventForm, time: new Date().toISOString() });
    localStorage.setItem('eventBookings', JSON.stringify(bookings));
    setEventMsg(`Booking successful! Confirmation email sent to ${eventForm.email}`);
    setEventForm({
      name: '',
      email: '',
      eventType: 'Wedding',
      date: '',
      guests: 1,
      notes: '',
    });
    setTimeout(() => setEventMsg(''), 4000);
  };

  const handleDiningChange = e => {
    setDiningForm({ ...diningForm, [e.target.name]: e.target.value });
  };
  const handleDiningSubmit = e => {
    e.preventDefault();
    if (!diningForm.name || !diningForm.email || !diningForm.date || !diningForm.time || !diningForm.guests) {
      setDiningMsg('Please fill in all fields.');
      return;
    }
    const bookings = JSON.parse(localStorage.getItem('diningBookings') || '[]');
    bookings.push({ ...diningForm, time: new Date().toISOString() });
    localStorage.setItem('diningBookings', JSON.stringify(bookings));
    setDiningMsg(`Booking successful! Confirmation email sent to ${diningForm.email}`);
    setDiningForm({
      name: '',
      email: '',
      date: '',
      time: '',
      guests: 1,
      requests: '',
    });
    setTimeout(() => setDiningMsg(''), 4000);
  };

  useEffect(() => {
    const onStorage = () => setMenuData(getMenuData());
    window.addEventListener('storage', onStorage);
    const interval = setInterval(() => setMenuData(getMenuData()), 2000);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
      if (sidebarOpen) setSidebarOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sidebarOpen]);

  React.useEffect(() => {
    if (isHappyHour) {
      pushNotification('Happy Hour! Enjoy 20% off all drinks from 4pm to 6pm!');
    }
  }, [isHappyHour]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => setUserLocation(DEFAULT_LOCATION),
        { timeout: 5000 }
      );
    }
  }, []);

  // Notification helpers
  const pushNotification = (msg) => {
    setNotifications(n => [...n, { id: Date.now(), msg }]);
    setTimeout(() => {
      setNotifications(n => n.slice(1));
    }, 4000);
  };

  // Loyalty helpers
  const addLoyaltyPoints = (amount) => {
    const pts = Math.floor(amount / 100) * 10;
    setLoyaltyPoints(prev => {
      const newPts = prev + pts;
      localStorage.setItem('loyaltyPoints', newPts);
      return newPts;
    });
    pushNotification(`You earned ${pts} loyalty points!`);
  };
  const redeemPoints = () => {
    if (loyaltyPoints >= 100) {
      setLoyaltyPoints(prev => {
        const newPts = prev - 100;
        localStorage.setItem('loyaltyPoints', newPts);
        return newPts;
      });
      setRedeem(true);
      pushNotification('Redeemed 100 points for a free dessert!');
      setTimeout(() => setRedeem(false), 3000);
    } else {
      pushNotification('Not enough points to redeem.');
    }
  };

  const filteredMenu = menuData.filter(item =>
    (menuType === 'All' || item.type === menuType) &&
    (!activeTag || (item.tags && item.tags.includes(activeTag))) &&
    (
      item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(menuSearch.toLowerCase())
    )
  );

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation helpers
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateForm = (fields) => {
    const errors = {};
    if (!fields.name || fields.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }
    if (!fields.email || !validateEmail(fields.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!fields.message || fields.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }
    return errors;
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const errors = validateForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setFormStatus('error');
      setFormMsg('Please fix the errors below.');
      return;
    }
    setFormMsg('Thank you for contacting us!');
    setFormStatus('success');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => {
      setFormMsg('');
      setFormStatus('');
      setFormErrors({});
    }, 3000);
  };

  // Order functions
  const addToOrder = (item) => {
    setOrder(prev => {
      const found = prev.find(i => i.id === item.id);
      if (found) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
    pushNotification(`${item.name} added to your order.`);
  };

  const removeFromOrder = (id) => {
    setOrder(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id, qty) => {
    setOrder(prev => prev.map(i => i.id === id ? { ...i, qty: qty < 1 ? 1 : qty } : i));
  };

  const handleDeliveryChange = e => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async e => {
    e.preventDefault();
    if (paymentMethod === 'Mpesa' && !mpesaNumber.match(/^07\d{8}$/)) {
      setPaymentStatus('Please enter a valid Mpesa number (e.g., 07XXXXXXXX)');
      return;
    }
    setIsPlacingOrder(true);
    let total = order.reduce((sum, item) => sum + parseInt(String(item.price).replace(/\D/g, '')) * item.qty, 0) - (redeem ? 500 : 0);
    const tipAmount = Math.round((total * tip) / 100);
    total += tipAmount;
    setOrderMsg('Order placed! Your food will be delivered soon.');
    addLoyaltyPoints(total);
    const orderPayload = {
      items: order.map(item => ({
        name: item.name,
        qty: item.qty,
        price: parseInt(String(item.price).replace(/\D/g, '')),
        type: item.type
      })),
      delivery,
      total,
      paymentMethod,
      status: 'Placed',
    };
    try {
      localStorage.setItem('order', JSON.stringify(orderPayload));
    } catch (err) {
      setOrderMsg('Order failed. Please try again.');
      setIsPlacingOrder(false);
      return;
    }
    setLastOrder({
      ...orderPayload,
      tip: tipAmount,
      time: new Date().toLocaleString(),
    });
    setOrder([]);
    setDelivery({ name: '', address: '', phone: '' });
    setMpesaNumber('');
    setPaymentStatus('');
    setOrderStatus('Order Placed');
    pushNotification('Order placed!');
    setShowReceipt(true);
    setTimeout(() => {
      setOrderMsg('');
      setShowOrder(false);
      setOrderStatus('Out for Delivery');
      pushNotification('Order is out for delivery!');
      setTimeout(() => {
        setOrderStatus('Delivered');
        pushNotification('Order delivered! Enjoy your meal.');
        setIsPlacingOrder(false);
      }, 4000);
    }, 3000);
  };

  const handleMpesaPayment = e => {
    e.preventDefault();
    if (!mpesaNumber.match(/^07\d{8}$/)) {
      setPaymentStatus('Please enter a valid Mpesa number (e.g., 07XXXXXXXX)');
      return;
    }
    setPaymentStatus('Payment successful!');
    setTimeout(() => setPaymentStatus(''), 2000);
  };

  const orderTotal = order.reduce((sum, item) => sum + parseInt(String(item.price).replace(/\D/g, '')) * item.qty, 0) - (redeem ? 500 : 0);

  const handleFeedbackChange = (id, value) => {
    setFeedback(fb => ({ ...fb, [id]: value }));
  };

  const handleFeedbackSubmit = (id) => {
    setFeedbackMsg('Thank you for your feedback!');
    setTimeout(() => setFeedbackMsg(''), 2000);
    setFeedback(fb => ({ ...fb, [id]: '' }));
  };

  // Add placeholder components for new resort sections
  const Activities = () => (
    <section className="activities-section container">
      <h2>Activities</h2>
      <p>Enjoy water sports, guided tours, kids' club, and more!</p>
      <form className="booking-form" onSubmit={handleActivitySubmit} style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24 }}>
        <h3 style={{ color: '#27ae60', marginBottom: 16 }}>Book an Activity</h3>
        <input type="text" name="name" placeholder="Your Name" value={activityForm.name} onChange={handleActivityChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <input type="email" name="email" placeholder="Your Email" value={activityForm.email} onChange={handleActivityChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <select name="activity" value={activityForm.activity} onChange={handleActivityChange} style={{ width: '100%', marginBottom: 12, padding: 8 }}>
          <option>Water Sports</option>
          <option>Guided Tour</option>
          <option>Kids' Club</option>
        </select>
        <input type="date" name="date" value={activityForm.date} onChange={handleActivityChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <button type="submit" style={{ width: '100%', background: '#27ae60', color: '#fff', border: 'none', borderRadius: 4, padding: 12, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Book Activity</button>
        {activityMsg && <div style={{ color: activityMsg.includes('success') ? '#27ae60' : 'red', marginTop: 12 }}>{activityMsg}</div>}
      </form>
    </section>
  );
  const SpaWellness = () => (
    <section className="spa-section container">
      <h2>Spa & Wellness</h2>
      <p>Relax and rejuvenate with our spa treatments and wellness programs.</p>
      <form className="booking-form" onSubmit={handleSpaSubmit} style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24 }}>
        <h3 style={{ color: '#27ae60', marginBottom: 16 }}>Book a Spa Treatment</h3>
        <input type="text" name="name" placeholder="Your Name" value={spaForm.name} onChange={handleSpaChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <input type="email" name="email" placeholder="Your Email" value={spaForm.email} onChange={handleSpaChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <select name="treatment" value={spaForm.treatment} onChange={handleSpaChange} style={{ width: '100%', marginBottom: 12, padding: 8 }}>
          <option>Massage</option>
          <option>Facial</option>
          <option>Body Scrub</option>
        </select>
        <input type="date" name="date" value={spaForm.date} onChange={handleSpaChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <button type="submit" style={{ width: '100%', background: '#27ae60', color: '#fff', border: 'none', borderRadius: 4, padding: 12, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Book Spa</button>
        {spaMsg && <div style={{ color: spaMsg.includes('success') ? '#27ae60' : 'red', marginTop: 12 }}>{spaMsg}</div>}
      </form>
    </section>
  );
  const Accommodation = () => (
    <section className="accommodation-section container">
      <h2>Accommodation</h2>
      <div className="accommodation-list" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
        {accommodationTypes.map(type => (
          <div key={type.id} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', width: 320, padding: 20, textAlign: 'left' }}>
            <img src={type.image} alt={type.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
            <h3 style={{ color: '#27ae60', marginBottom: 8 }}>{type.name}</h3>
            <div style={{ marginBottom: 8 }}>{type.description}</div>
            <div style={{ fontWeight: 600, color: '#e67e22', marginBottom: 8 }}>Ksh {type.price} / night</div>
          </div>
        ))}
      </div>
      <form className="booking-form" onSubmit={handleBookingSubmit} style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24 }}>
        <h3 style={{ color: '#27ae60', marginBottom: 16 }}>Book Your Stay</h3>
        <input type="text" name="name" placeholder="Your Name" value={bookingForm.name} onChange={handleBookingChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <input type="email" name="email" placeholder="Your Email" value={bookingForm.email} onChange={handleBookingChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <select name="type" value={bookingForm.type} onChange={handleBookingChange} style={{ width: '100%', marginBottom: 12, padding: 8 }}>
          {accommodationTypes.map(type => (
            <option key={type.id} value={type.name}>{type.name}</option>
          ))}
        </select>
        <input type="number" name="guests" min="1" max="10" placeholder="Guests" value={bookingForm.guests} onChange={handleBookingChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <input type="date" name="checkin" value={bookingForm.checkin} onChange={handleBookingChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <input type="date" name="checkout" value={bookingForm.checkout} onChange={handleBookingChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <button type="submit" style={{ width: '100%', background: '#27ae60', color: '#fff', border: 'none', borderRadius: 4, padding: 12, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Book Now</button>
        {bookingMsg && <div style={{ color: bookingMsg.includes('success') ? '#27ae60' : 'red', marginTop: 12 }}>{bookingMsg}</div>}
      </form>
    </section>
  );
  const Events = () => (
    <section className="events-section container">
      <h2>Events & Hosting</h2>
      <form className="booking-form" onSubmit={handleEventSubmit} style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24 }}>
        <h3 style={{ color: '#27ae60', marginBottom: 16 }}>Book an Event</h3>
        <label style={{ display: 'block', marginBottom: 6 }}>Your Name</label>
        <input type="text" name="name" placeholder="Your Name" value={eventForm.name} onChange={handleEventChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <label style={{ display: 'block', marginBottom: 6 }}>Your Email</label>
        <input type="email" name="email" placeholder="Your Email" value={eventForm.email} onChange={handleEventChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <label style={{ display: 'block', marginBottom: 6 }}>Event Type</label>
        <select name="eventType" value={eventForm.eventType} onChange={handleEventChange} style={{ width: '100%', marginBottom: 12, padding: 8 }}>
          {eventTypes.map(type => <option key={type}>{type}</option>)}
        </select>
        <label style={{ display: 'block', marginBottom: 6 }}>Event Date</label>
        <input type="date" name="date" value={eventForm.date} onChange={handleEventChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <label style={{ display: 'block', marginBottom: 6 }}>Number of Guests</label>
        <input type="number" name="guests" min="1" max="500" placeholder="Guests" value={eventForm.guests} onChange={handleEventChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <label style={{ display: 'block', marginBottom: 6 }}>Notes / Special Requests</label>
        <textarea name="notes" placeholder="Notes / Special Requests" value={eventForm.notes} onChange={handleEventChange} style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <button type="submit" style={{ width: '100%', background: '#27ae60', color: '#fff', border: 'none', borderRadius: 4, padding: 12, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Book Event</button>
        {eventMsg && <div style={{ color: eventMsg.includes('success') ? '#27ae60' : 'red', marginTop: 12 }}>{eventMsg}</div>}
      </form>
    </section>
  );
  const Booking = () => (
    <section className="booking-section container">
      <h2>Dining Reservation</h2>
      <form className="booking-form" onSubmit={handleDiningSubmit} style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24 }}>
        <h3 style={{ color: '#27ae60', marginBottom: 16 }}>Reserve a Table</h3>
        <label style={{ display: 'block', marginBottom: 6 }}>Your Name</label>
        <input type="text" name="name" placeholder="Your Name" value={diningForm.name} onChange={handleDiningChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <label style={{ display: 'block', marginBottom: 6 }}>Your Email</label>
        <input type="email" name="email" placeholder="Your Email" value={diningForm.email} onChange={handleDiningChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <label style={{ display: 'block', marginBottom: 6 }}>Reservation Date</label>
        <input type="date" name="date" value={diningForm.date} onChange={handleDiningChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <label style={{ display: 'block', marginBottom: 6 }}>Time Slot</label>
        <select name="time" value={diningForm.time} onChange={handleDiningChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }}>
          <option value="">Select a time</option>
          {timeSlots.map(slot => <option key={slot}>{slot}</option>)}
        </select>
        <label style={{ display: 'block', marginBottom: 6 }}>Number of Guests</label>
        <input type="number" name="guests" min="1" max="20" placeholder="Guests" value={diningForm.guests} onChange={handleDiningChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <label style={{ display: 'block', marginBottom: 6 }}>Special Requests</label>
        <textarea name="requests" placeholder="Special Requests" value={diningForm.requests} onChange={handleDiningChange} style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <button type="submit" style={{ width: '100%', background: '#27ae60', color: '#fff', border: 'none', borderRadius: 4, padding: 12, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Reserve</button>
        {diningMsg && <div style={{ color: diningMsg.includes('success') ? '#27ae60' : 'red', marginTop: 12 }}>{diningMsg}</div>}
      </form>
    </section>
  );

  return (
    <div className={`restaurant-home${sidebarOpen ? ' sidebar-open' : ''} ${theme}`}>
      {/* Notification Banners */}
      <div className="notification-container">
        {notifications.map(n => (
          <div key={n.id} className="notification-banner">{n.msg}</div>
        ))}
      </div>

      {/* Deal and Happy Hour Banners */}
      {deal && (
        <div className="deal-banner">{deal.title} - {deal.desc}</div>
      )}
      {isHappyHour && (
        <div className="happy-hour-banner">Happy Hour! Enjoy 20% off all drinks from 4pm to 6pm!</div>
      )}
      {orderStatus && (
        <div className="order-status-banner">{orderStatus}</div>
      )}

      {/* Sidebar Navigation */}
      <nav
        className={`sidebar${sidebarOpen ? ' open' : ''}`}
        aria-label="Main Navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : '-100vw',
          height: '100vh',
          zIndex: 1000,
          transition: 'left 0.3s',
          width: '60vw',
          maxWidth: 210,
          background: '#848382',
          color: 'white',
          boxShadow: sidebarOpen ? '2px 0 8px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="nav-logo">Capella</div>
        <button
          className="sidebar-toggle"
          aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            display: 'block',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            marginLeft: 8,
            marginBottom: 16,
            cursor: 'pointer',
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 1100,
          }}
        >
          <span className="hamburger" style={{
            width: 30,
            height: 3,
            background: 'white',
            display: 'block',
            position: 'relative',
          }}></span>
        </button>
        <button
          className="services-button"
          onClick={() => setShowServices(s => !s)}
          style={{
            margin: '16px 0',
            background: '#27ae60',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 600,
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          aria-expanded={showServices}
          aria-controls="services-dropdown"
        >
          Our Services
        </button>
        {showServices && (
          <ul id="services-dropdown" style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 16px 0',
            background: '#f8f8f8',
            borderRadius: 6,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            transition: 'all 0.2s',
          }}>
            <li><button style={{ display: 'block', padding: '10px 18px', color: '#27ae60', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setActiveServiceSection('accommodation'); setShowServices(false); }}>Accommodation</button></li>
            <li><button style={{ display: 'block', padding: '10px 18px', color: '#27ae60', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setActiveServiceSection('booking'); setShowServices(false); }}>Dining Reservation</button></li>
            <li><button style={{ display: 'block', padding: '10px 18px', color: '#27ae60', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setActiveServiceSection('activities'); setShowServices(false); }}>Activities</button></li>
            <li><button style={{ display: 'block', padding: '10px 18px', color: '#27ae60', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setActiveServiceSection('spa'); setShowServices(false); }}>Spa & Wellness</button></li>
            <li><button style={{ display: 'block', padding: '10px 18px', color: '#27ae60', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setActiveServiceSection('events'); setShowServices(false); }}>Events & Hosting</button></li>
          </ul>
        )}
        <button
          className="theme-switcher"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={{
            margin: '16px 0',
            background: 'none',
            border: '2px solid #e67e22',
            color: '#e67e22',
            borderRadius: 4,
            padding: '6px 16px',
            cursor: 'pointer',
            fontWeight: 500,
            display: 'block',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          aria-label="Toggle light/dark mode"
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        <ul className="nav-links" style={{ marginTop: 60 }}>
          <li><button onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'}); setSidebarOpen(false);}}>Home</button></li>
          <li><button onClick={() => {document.getElementById('menu-section')?.scrollIntoView({behavior: 'smooth'}); setSidebarOpen(false);}}>Menu</button></li>
          <li><button onClick={() => {document.getElementById('testimonials-section')?.scrollIntoView({behavior: 'smooth'}); setSidebarOpen(false);}}>Testimonials</button></li>
          <li><button onClick={() => {document.getElementById('contact-section')?.scrollIntoView({behavior: 'smooth'}); setSidebarOpen(false);}}>Contact</button></li>
          <li><button className="admin-button" onClick={() => {navigate('/admin'); setSidebarOpen(false);}}>Admin</button></li>
          <li><button className="login-button" onClick={() => {navigate('/login'); setSidebarOpen(false);}}>Login</button></li>
        </ul>
        <div className="loyalty-points">Loyalty: {loyaltyPoints} pts</div>
      </nav>
      {/* Hamburger for mobile (when sidebar is closed) */}
      {!sidebarOpen && (
        <button
          className="sidebar-toggle"
          aria-label="Open navigation menu"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(true)}
          style={{
            display: 'block',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 1100,
          }}
        >
          <span className="hamburger" style={{
            width: 30,
            height: 3,
            background: 'white',
            display: 'block',
            position: 'relative',
          }}></span>
        </button>
      )}
      <main className="main-content">
        {activeServiceSection === '' && <Hero setShowModal={setShowModal} setShowOrder={setShowOrder} />}
        {activeServiceSection === 'accommodation' && <Accommodation />}
        {activeServiceSection === 'booking' && <Booking />}
        {activeServiceSection === 'activities' && <Activities />}
        {activeServiceSection === 'spa' && <SpaWellness />}
        {activeServiceSection === 'events' && <Events />}
        {/* Optionally, add a button to go back to the main view */}
        {activeServiceSection !== '' && (
          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <button style={{ background: '#888', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveServiceSection('')}>Back to Home</button>
          </div>
        )}
        {/* Menu Section */}
        <Menu
          menuTypes={menuTypes}
          menuType={menuType}
          setMenuType={setMenuType}
          allTags={allTags}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
          filteredMenu={filteredMenu}
          addToOrder={addToOrder}
          feedback={feedback}
          handleFeedbackChange={handleFeedbackChange}
          handleFeedbackSubmit={handleFeedbackSubmit}
          feedbackMsg={feedbackMsg}
          menuSearch={menuSearch}
          setMenuSearch={setMenuSearch}
        />
        {/* About Section */}
        <About />
        {/* Testimonials Section */}
        <Testimonials testimonials={testimonials} />
        {/* Contact Section */}
        <Contact
          form={form}
          formErrors={formErrors}
          formStatus={formStatus}
          formMsg={formMsg}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          userLocation={userLocation}
        />
        {/* Order Modal */}
        {showOrder && (
          <div className="modal-overlay" onClick={() => setShowOrder(false)}>
            <div className="modal order-modal" onClick={e => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setShowOrder(false)}>&times;</button>
              <h2>Your Order</h2>
              <ul className="order-list">
                {order.map(item => (
                  <li key={item.id} className="order-item">
                    <span>{item.name} x{item.qty}</span>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={e => updateQty(item.id, parseInt(e.target.value) || 1)}
                    />
                    <button className="remove-order" onClick={() => removeFromOrder(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <div className="order-total">Total: Ksh {orderTotal}</div>
              <div className="tip-section">
                <span>Tip:</span>
                {[0, 5, 10, 15].map(val => (
                  <button
                    key={val}
                    className={`tip-btn${tip === val ? ' selected' : ''}`}
                    onClick={() => setTip(val)}
                  >{val}%</button>
                ))}
              </div>
              <form className="delivery-form" onSubmit={handleOrderSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={delivery.name}
                  onChange={handleDeliveryChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Delivery Address"
                  value={delivery.address}
                  onChange={handleDeliveryChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={delivery.phone}
                  onChange={handleDeliveryChange}
                  required
                />
                <div className="payment-methods">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Mpesa"
                      checked={paymentMethod === 'Mpesa'}
                      onChange={e => setPaymentMethod(e.target.value)}
                    /> Mpesa
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash"
                      checked={paymentMethod === 'Cash'}
                      onChange={e => setPaymentMethod(e.target.value)}
                    /> Cash
                  </label>
                </div>
                {paymentMethod === 'Mpesa' && (
                  <div className="mpesa-section">
                    <input
                      type="tel"
                      placeholder="Mpesa Number (07XXXXXXXX)"
                      value={mpesaNumber}
                      onChange={e => setMpesaNumber(e.target.value)}
                      required
                    />
                    <button className="mpesa-pay" onClick={handleMpesaPayment} type="button">Pay with Mpesa</button>
                    {paymentStatus && <span className="form-msg">{paymentStatus}</span>}
                  </div>
                )}
                <button type="submit" disabled={isPlacingOrder}>
                  {isPlacingOrder ? <FaSpinner className="spin" style={{ marginRight: 8 }} /> : null}
                  Place Order
                </button>
                {orderMsg && <span className="form-msg">{orderMsg}</span>}
              </form>
              <div className="loyalty-redeem">
                <button className="redeem-btn" onClick={redeemPoints} disabled={loyaltyPoints < 100}>Redeem 100pts for Dessert</button>
                {redeem && <span className="redeem-msg">Free dessert added!</span>}
              </div>
              <div className="loyalty-info">Earn 10 points for every Ksh 100 spent.</div>
              {showReceipt && lastOrder && (
                <div className="receipt-section">
                  <h3>Order Receipt</h3>
                  <ul>
                    {lastOrder.items.map((item, idx) => (
                      <li key={idx}>{item.name} x{item.qty} - Ksh {item.price * item.qty}</li>
                    ))}
                  </ul>
                  <div>Tip: Ksh {lastOrder.tip}</div>
                  <div>Total: Ksh {lastOrder.total}</div>
                  <div>Payment: {lastOrder.paymentMethod}</div>
                  <div>Time: {lastOrder.time}</div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Reservation Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal reservation-modal" onClick={e => e.stopPropagation()}>
              <button className="reservation-close" onClick={() => setShowModal(false)}>&times;</button>
              <h2>Reserve a Table</h2>
              <form className="reservation-form" onSubmit={e => {e.preventDefault(); setShowModal(false); pushNotification('Reservation submitted!');}}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Email" required />
                <input type="number" placeholder="Guests" min="1" max="20" required />
                <input type="datetime-local" required />
                <button type="submit">Reserve</button>
              </form>
            </div>
          </div>
        )}
        {/* Scroll to Top Button */}
        {showScroll && (
          <button className="scroll-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            ↑
          </button>
        )}
        {/* Footer */}
        <footer className="restaurant-footer">
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={22} style={{ verticalAlign: 'middle', marginRight: 6 }} />Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook size={22} style={{ verticalAlign: 'middle', marginRight: 6 }} />Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter size={22} style={{ verticalAlign: 'middle', marginRight: 6 }} />Twitter</a>
          </div>
          <div>&copy; {new Date().getFullYear()} Capella Restaurant. All rights reserved.</div>
        </footer>
      </main>
    </div>
  );
};

export default RestaurantHome;