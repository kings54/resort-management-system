import React, { useState, useEffect } from 'react';
import './RestaurantHome.css';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'admin123';

const defaultMenu = [
  { id: 1, name: 'Truffle Pasta', price: 2200, type: 'Main', image: 'https://www.pexels.com/photo/gourmet-seafood-pasta-in-black-bowl-32640462/' },
  { id: 2, name: 'Grilled Salmon', price: 900, type: 'Main', image: 'https://www.pexels.com/photo/delicious-grilled-salmon-with-vegetables-29748127/' },
  { id: 3, name: 'Chocolate Lava Cake', price: 600, type: 'Dessert', image: 'https://www.pexels.com/photo/dessert-with-fruits-25524075/' },
];

function getOrders() {
  return JSON.parse(localStorage.getItem('orders') || '[]');
}
function setOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}
function getMenu() {
  return JSON.parse(localStorage.getItem('menu') || '[]') || defaultMenu;
}
function setMenu(menu) {
  localStorage.setItem('menu', JSON.stringify(menu));
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('orders');
  const [orders, setOrdersState] = useState(getOrders());
  const [menu, setMenuState] = useState(getMenu());
  const [newDish, setNewDish] = useState({ name: '', price: '', type: 'Main' });
  const [analytics, setAnalytics] = useState({});
  const [msg, setMsg] = useState('');
  const [bookings, setBookings] = useState([]);
  const [activityBookings, setActivityBookings] = useState([]);
  const [spaBookings, setSpaBookings] = useState([]);
  const [eventBookings, setEventBookings] = useState([]);
  const [diningBookings, setDiningBookings] = useState([]);
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', role: 'Housekeeping' });
  const [staffMsg, setStaffMsg] = useState('');
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  // Login
  const handleLogin = e => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setMsg('');
    } else {
      setMsg('Incorrect password');
    }
  };
  const handleLogout = () => setLoggedIn(false);

  // Orders
  useEffect(() => {
    setOrdersState(getOrders());
    const interval = setInterval(() => {
      setOrdersState(getOrders());
      setBookings(JSON.parse(localStorage.getItem('accommodationBookings') || '[]'));
      setActivityBookings(JSON.parse(localStorage.getItem('activityBookings') || '[]'));
      setSpaBookings(JSON.parse(localStorage.getItem('spaBookings') || '[]'));
      setEventBookings(JSON.parse(localStorage.getItem('eventBookings') || '[]'));
      setDiningBookings(JSON.parse(localStorage.getItem('diningBookings') || '[]'));
      setStaff(JSON.parse(localStorage.getItem('staff') || '[]'));
    }, 2000);
    setBookings(JSON.parse(localStorage.getItem('accommodationBookings') || '[]'));
    setActivityBookings(JSON.parse(localStorage.getItem('activityBookings') || '[]'));
    setSpaBookings(JSON.parse(localStorage.getItem('spaBookings') || '[]'));
    setEventBookings(JSON.parse(localStorage.getItem('eventBookings') || '[]'));
    setDiningBookings(JSON.parse(localStorage.getItem('diningBookings') || '[]'));
    setStaff(JSON.parse(localStorage.getItem('staff') || '[]'));
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = (idx, status) => {
    const updated = [...orders];
    updated[idx].status = status;
    setOrdersState(updated);
    setOrders(updated);
  };

  // Menu
  const handleMenuChange = (idx, field, value) => {
    const updated = [...menu];
    updated[idx][field] = value;
    setMenuState(updated);
    setMenu(updated);
  };
  const handleRemoveDish = idx => {
    const updated = menu.filter((_, i) => i !== idx);
    setMenuState(updated);
    setMenu(updated);
  };
  const handleAddDish = e => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;
    const updated = [...menu, { ...newDish, id: Date.now(), price: parseInt(newDish.price) }];
    setMenuState(updated);
    setMenu(updated);
    setNewDish({ name: '', price: '', type: 'Main' });
  };

  // Analytics (simple)
  useEffect(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const popular = {};
    orders.forEach(o => o.items && o.items.forEach(i => {
      popular[i.name] = (popular[i.name] || 0) + i.qty;
    }));
    const popularDish = Object.entries(popular).sort((a,b) => b[1]-a[1])[0]?.[0] || '-';
    setAnalytics({ totalOrders, totalRevenue, popularDish });
  }, [orders]);

  const handleDeleteBooking = idx => {
    const updated = bookings.filter((_, i) => i !== idx);
    setBookings(updated);
    localStorage.setItem('accommodationBookings', JSON.stringify(updated));
  };

  const handleDeleteActivityBooking = idx => {
    const updated = activityBookings.filter((_, i) => i !== idx);
    setActivityBookings(updated);
    localStorage.setItem('activityBookings', JSON.stringify(updated));
  };
  const handleDeleteSpaBooking = idx => {
    const updated = spaBookings.filter((_, i) => i !== idx);
    setSpaBookings(updated);
    localStorage.setItem('spaBookings', JSON.stringify(updated));
  };

  const handleDeleteEventBooking = idx => {
    const updated = eventBookings.filter((_, i) => i !== idx);
    setEventBookings(updated);
    localStorage.setItem('eventBookings', JSON.stringify(updated));
  };
  const handleDeleteDiningBooking = idx => {
    const updated = diningBookings.filter((_, i) => i !== idx);
    setDiningBookings(updated);
    localStorage.setItem('diningBookings', JSON.stringify(updated));
  };

  const handleUpdateEventStatus = (idx, status) => {
    const updated = [...eventBookings];
    updated[idx].status = status;
    setEventBookings(updated);
    localStorage.setItem('eventBookings', JSON.stringify(updated));
  };
  const handleUpdateDiningStatus = (idx, status) => {
    const updated = [...diningBookings];
    updated[idx].status = status;
    setDiningBookings(updated);
    localStorage.setItem('diningBookings', JSON.stringify(updated));
  };

  const handleAddStaff = e => {
    e.preventDefault();
    if (!newStaff.name) {
      setStaffMsg('Name required');
      return;
    }
    const updated = [...staff, { ...newStaff, id: Date.now() }];
    setStaff(updated);
    localStorage.setItem('staff', JSON.stringify(updated));
    setNewStaff({ name: '', role: 'Housekeeping' });
    setStaffMsg('Staff added!');
    setTimeout(() => setStaffMsg(''), 2000);
  };
  const handleDeleteStaff = id => {
    const updated = staff.filter(s => s.id !== id);
    setStaff(updated);
    localStorage.setItem('staff', JSON.stringify(updated));
  };

  // Export bookings as CSV
  const exportBookingsCSV = () => {
    const allBookings = [
      ...bookings.map(b => ({ ...b, type: 'Accommodation' })),
      ...activityBookings.map(b => ({ ...b, type: 'Activity' })),
      ...spaBookings.map(b => ({ ...b, type: 'Spa' })),
      ...eventBookings.map(b => ({ ...b, type: 'Event' })),
      ...diningBookings.map(b => ({ ...b, type: 'Dining' })),
    ];
    if (allBookings.length === 0) return;
    const keys = Object.keys(allBookings[0]);
    const csv = [keys.join(','), ...allBookings.map(b => keys.map(k => JSON.stringify(b[k] || '')).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!loggedIn) {
    return (
      <div className="admin-dashboard-container">
        <form className="admin-card" onSubmit={handleLogin}>
          <h2 className="admin-section-title">Admin Login</h2>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{marginBottom:12}} />
          <button className="admin-btn" type="submit">Login</button>
          {msg && <div style={{color:'red',marginTop:8}}>{msg}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-card">
        <button className="admin-btn" style={{ marginBottom: 16 }} onClick={() => navigate('/')}>Back to User Dashboard</button>
        <div style={{ position: 'relative', marginBottom: 18, textAlign: 'center' }}>
          <button
            className="admin-btn"
            style={{ fontWeight: 700, fontSize: 18, padding: '10px 28px', background: '#27ae60', color: '#fff', borderRadius: 6, border: 'none', cursor: 'pointer' }}
            onClick={() => setShowServicesDropdown(s => !s)}
            aria-expanded={showServicesDropdown}
            aria-controls="admin-services-dropdown"
          >
            Our Services
          </button>
          {showServicesDropdown && (
            <ul id="admin-services-dropdown" style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '110%',
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
              listStyle: 'none',
              padding: 0,
              margin: 0,
              minWidth: 180,
              zIndex: 10,
            }}>
              <li><button style={{ width: '100%', padding: '12px 18px', background: 'none', border: 'none', color: '#27ae60', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setTab('bookings'); setShowServicesDropdown(false); }}>Bookings</button></li>
              <li><button style={{ width: '100%', padding: '12px 18px', background: 'none', border: 'none', color: '#27ae60', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setTab('activities'); setShowServicesDropdown(false); }}>Activities</button></li>
              <li><button style={{ width: '100%', padding: '12px 18px', background: 'none', border: 'none', color: '#27ae60', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setTab('spa'); setShowServicesDropdown(false); }}>Spa</button></li>
              <li><button style={{ width: '100%', padding: '12px 18px', background: 'none', border: 'none', color: '#27ae60', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setTab('events'); setShowServicesDropdown(false); }}>Events</button></li>
              <li><button style={{ width: '100%', padding: '12px 18px', background: 'none', border: 'none', color: '#27ae60', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setTab('dining'); setShowServicesDropdown(false); }}>Dining</button></li>
            </ul>
          )}
        </div>
        <div className="admin-tabs">
          <button className={`admin-tab${tab==='orders'?' active':''}`} onClick={()=>setTab('orders')}>Orders</button>
          <button className={`admin-tab${tab==='menu'?' active':''}`} onClick={()=>setTab('menu')}>Menu</button>
          <button className={`admin-tab${tab==='analytics'?' active':''}`} onClick={()=>setTab('analytics')}>Analytics</button>
          <button className={`admin-tab${tab==='staff'?' active':''}`} onClick={()=>setTab('staff')}>Staff</button>
        </div>
        {tab==='orders' && (
          <div>
            <div className="admin-section-title">Orders</div>
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {orders.length === 0 && <tr><td colSpan="6">No orders yet.</td></tr>}
                {orders.map((o, idx) => (
                  <tr key={o.id || idx}>
                    <td>{idx+1}</td>
                    <td>{o.delivery?.name || '-'}</td>
                    <td>{o.items?.map(i => `${i.name} x${i.qty}`).join(', ')}</td>
                    <td>Ksh {o.total}</td>
                    <td>{o.status || 'Placed'}</td>
                    <td>
                      <button className="admin-btn" onClick={()=>updateOrderStatus(idx,'Preparing')}>Preparing</button>
                      <button className="admin-btn" onClick={()=>updateOrderStatus(idx,'Out for Delivery')}>Out</button>
                      <button className="admin-btn" onClick={()=>updateOrderStatus(idx,'Delivered')}>Delivered</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab==='menu' && (
          <div>
            <div className="admin-section-title">Menu</div>
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Price</th><th>Type</th><th>Image</th><th>Action</th></tr>
              </thead>
              <tbody>
                {menu.map((dish, idx) => (
                  <tr key={dish.id}>
                    <td><input value={dish.name} onChange={e=>handleMenuChange(idx,'name',e.target.value)} /></td>
                    <td><input type="number" value={dish.price} onChange={e=>handleMenuChange(idx,'price',e.target.value)} /></td>
                    <td>
                      <select value={dish.type} onChange={e=>handleMenuChange(idx,'type',e.target.value)}>
                        <option>Main</option><option>Dessert</option><option>Drinks</option>
                      </select>
                    </td>
                    <td>
                      <input value={dish.image || ''} onChange={e=>handleMenuChange(idx,'image',e.target.value)} placeholder="Image URL" style={{width:'120px'}} />
                      {dish.image && <img src={dish.image} alt="dish" style={{width:'40px',height:'40px',objectFit:'cover',borderRadius:'4px',marginLeft:'8px'}} />}
                    </td>
                    <td><button className="admin-btn" onClick={()=>handleRemoveDish(idx)}>Remove</button></td>
                  </tr>
                ))}
                <tr>
                  <td><input value={newDish.name} onChange={e=>setNewDish(d=>({...d,name:e.target.value}))} placeholder="New dish name" /></td>
                  <td><input type="number" value={newDish.price} onChange={e=>setNewDish(d=>({...d,price:e.target.value}))} placeholder="Price" /></td>
                  <td>
                    <select value={newDish.type} onChange={e=>setNewDish(d=>({...d,type:e.target.value}))}>
                      <option>Main</option><option>Dessert</option><option>Drinks</option>
                    </select>
                  </td>
                  <td><input value={newDish.image || ''} onChange={e=>setNewDish(d=>({...d,image:e.target.value}))} placeholder="Image URL" style={{width:'120px'}} /></td>
                  <td><button className="admin-btn" onClick={handleAddDish}>Add</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {tab==='analytics' && (
          <div>
            <div className="admin-section-title">Analytics</div>
            <div>Total Accommodation Bookings: <strong>{bookings.length}</strong></div>
            <div>Total Activity Bookings: <strong>{activityBookings.length}</strong></div>
            <div>Total Spa Bookings: <strong>{spaBookings.length}</strong></div>
            <div>Total Event Bookings: <strong>{eventBookings.length}</strong></div>
            <div>Total Dining Reservations: <strong>{diningBookings.length}</strong></div>
            <div>Total Revenue: <strong>Ksh {orders.reduce((sum, o) => sum + (o.total || 0), 0)}</strong></div>
            <div>Most Popular Service: <strong>{[bookings, activityBookings, spaBookings, eventBookings, diningBookings].reduce((max, arr) => arr.length > max.length ? arr : max, []).length === bookings.length ? 'Accommodation' : [activityBookings, spaBookings, eventBookings, diningBookings].reduce((max, arr, i) => arr.length > max.length ? arr : max, bookings).length === activityBookings.length ? 'Activity' : spaBookings.length >= eventBookings.length && spaBookings.length >= diningBookings.length ? 'Spa' : eventBookings.length >= diningBookings.length ? 'Event' : 'Dining'}</strong></div>
            <button className="admin-btn" style={{ marginTop: 18 }} onClick={exportBookingsCSV}>Export All Bookings as CSV</button>
          </div>
        )}
        {tab==='bookings' && (
          <div>
            <div className="admin-section-title">Accommodation Bookings</div>
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Name</th><th>Email</th><th>Type</th><th>Guests</th><th>Check-in</th><th>Check-out</th><th>Time</th><th>Action</th></tr>
              </thead>
              <tbody>
                {bookings.length === 0 && <tr><td colSpan="9">No bookings yet.</td></tr>}
                {bookings.map((b, idx) => (
                  <tr key={idx}>
                    <td>{idx+1}</td>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>{b.type}</td>
                    <td>{b.guests}</td>
                    <td>{b.checkin}</td>
                    <td>{b.checkout}</td>
                    <td>{b.time ? new Date(b.time).toLocaleString() : '-'}</td>
                    <td><button className="admin-btn" onClick={()=>handleDeleteBooking(idx)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab==='activities' && (
          <div>
            <div className="admin-section-title">Activity Bookings</div>
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Name</th><th>Email</th><th>Activity</th><th>Date</th><th>Time</th><th>Action</th></tr>
              </thead>
              <tbody>
                {activityBookings.length === 0 && <tr><td colSpan="7">No activity bookings yet.</td></tr>}
                {activityBookings.map((b, idx) => (
                  <tr key={idx}>
                    <td>{idx+1}</td>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>{b.activity}</td>
                    <td>{b.date}</td>
                    <td>{b.time ? new Date(b.time).toLocaleString() : '-'}</td>
                    <td><button className="admin-btn" onClick={()=>handleDeleteActivityBooking(idx)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab==='spa' && (
          <div>
            <div className="admin-section-title">Spa Bookings</div>
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Name</th><th>Email</th><th>Treatment</th><th>Date</th><th>Time</th><th>Action</th></tr>
              </thead>
              <tbody>
                {spaBookings.length === 0 && <tr><td colSpan="7">No spa bookings yet.</td></tr>}
                {spaBookings.map((b, idx) => (
                  <tr key={idx}>
                    <td>{idx+1}</td>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>{b.treatment}</td>
                    <td>{b.date}</td>
                    <td>{b.time ? new Date(b.time).toLocaleString() : '-'}</td>
                    <td><button className="admin-btn" onClick={()=>handleDeleteSpaBooking(idx)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab==='events' && (
          <div>
            <div className="admin-section-title">Event Bookings</div>
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Name</th><th>Email</th><th>Type</th><th>Date</th><th>Guests</th><th>Notes</th><th>Status</th><th>Time</th><th>Action</th></tr>
              </thead>
              <tbody>
                {eventBookings.length === 0 && <tr><td colSpan="10">No event bookings yet.</td></tr>}
                {eventBookings.map((b, idx) => (
                  <tr key={idx}>
                    <td>{idx+1}</td>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>{b.eventType}</td>
                    <td>{b.date}</td>
                    <td>{b.guests}</td>
                    <td>{b.notes}</td>
                    <td>
                      <select value={b.status} onChange={e=>handleUpdateEventStatus(idx, e.target.value)}>
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td>{b.time ? new Date(b.time).toLocaleString() : '-'}</td>
                    <td><button className="admin-btn" onClick={()=>handleDeleteEventBooking(idx)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab==='dining' && (
          <div>
            <div className="admin-section-title">Dining Reservations</div>
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Name</th><th>Email</th><th>Date</th><th>Time</th><th>Guests</th><th>Requests</th><th>Status</th><th>Time</th><th>Action</th></tr>
              </thead>
              <tbody>
                {diningBookings.length === 0 && <tr><td colSpan="10">No dining reservations yet.</td></tr>}
                {diningBookings.map((b, idx) => (
                  <tr key={idx}>
                    <td>{idx+1}</td>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td>{b.guests}</td>
                    <td>{b.requests}</td>
                    <td>
                      <select value={b.status} onChange={e=>handleUpdateDiningStatus(idx, e.target.value)}>
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td>{b.time ? new Date(b.time).toLocaleString() : '-'}</td>
                    <td><button className="admin-btn" onClick={()=>handleDeleteDiningBooking(idx)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab==='staff' && (
          <div>
            <div className="admin-section-title">Staff Management</div>
            <form onSubmit={handleAddStaff} style={{ marginBottom: 18 }}>
              <input value={newStaff.name} onChange={e => setNewStaff(s => ({ ...s, name: e.target.value }))} placeholder="Staff Name" style={{ marginRight: 8, padding: 6 }} />
              <select value={newStaff.role} onChange={e => setNewStaff(s => ({ ...s, role: e.target.value }))} style={{ marginRight: 8, padding: 6 }}>
                <option>Housekeeping</option>
                <option>Reception</option>
                <option>Chef</option>
                <option>Waiter</option>
                <option>Spa Therapist</option>
                <option>Activity Guide</option>
                <option>Manager</option>
              </select>
              <button className="admin-btn" type="submit">Add Staff</button>
              {staffMsg && <span style={{ color: '#27ae60', marginLeft: 12 }}>{staffMsg}</span>}
            </form>
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Name</th><th>Role</th><th>Action</th></tr>
              </thead>
              <tbody>
                {staff.length === 0 && <tr><td colSpan="4">No staff yet.</td></tr>}
                {staff.map((s, idx) => (
                  <tr key={s.id}>
                    <td>{idx+1}</td>
                    <td>{s.name}</td>
                    <td>{s.role}</td>
                    <td><button className="admin-btn" onClick={() => handleDeleteStaff(s.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button className="admin-logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
} 