# Savory Bistro Restaurant App

A modern, feature-rich restaurant web application built with React. This app simulates a real restaurant experience, including menu browsing, ordering, reservations, loyalty rewards, admin management, and more—all with a beautiful, responsive UI.

---

## Features

### User Features
- **Responsive Sidebar Navigation**: Left sidebar with pill-shaped navigation buttons for easy access to all sections.
- **Menu Browsing & Filtering**: View and filter menu items by type (Mains, Desserts, Drinks). Menu is dynamic and can be updated by the admin.
- **Order System**: Add items to your order, adjust quantities, and place orders with delivery details.
- **Payment Methods**: Choose between Mpesa (with phone validation) and Cash on Delivery.
- **Loyalty Program**: Earn points with every order. Redeem 100 points for Ksh 500 off your next order.
- **Deals & Happy Hour**: See in-app banners for daily deals and happy hour discounts (e.g., 20% off drinks from 4–6pm).
- **Order Status Updates**: Receive real-time banners for order status (Placed, Out for Delivery, Delivered).
- **Order Receipt**: Get a detailed receipt after placing an order, including tip and loyalty discounts.
- **Dish Feedback**: Leave feedback for each dish in your order.
- **Tip Options**: Add a tip (0%, 5%, 10%, 15%) to your order.
- **Reservation Modal**: Reserve a table with a simple modal form.
- **Contact Form**: Send messages to the restaurant via a contact form.
- **Scroll-to-Top Button**: Quickly return to the top of the page.
- **Social Links**: Footer with links to Facebook, Instagram, and Twitter.
- **Testimonials**: Read guest testimonials.

### Admin Features
- **Password-Protected Admin Dashboard**: Access with a password (default: `admin123`).
- **Order Management**: View all orders, update their status (Preparing, Out for Delivery, Delivered).
- **Menu Management**: Add, edit, or remove menu items. Changes are reflected instantly for all users on the same device.
- **Analytics**: View total orders, revenue, and most popular dish.

### Authentication
- **Login/Signup Form**: Simple, user-friendly authentication form with validation and toggling between login and signup.

---

## Data Persistence
- **LocalStorage Only**: All menu, order, and loyalty data is stored in the browser's localStorage. Data is NOT shared across devices or users. (No backend/database by default.)

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the app:**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000).

---

## Project Structure
- `src/RestaurantHome.jsx` — Main user-facing app (menu, ordering, loyalty, etc.)
- `src/AdminDashboard.jsx` — Admin dashboard for managing menu and orders
- `src/AuthForm.jsx` — Login/Signup form
- `src/Routes.js` — App routing
- `src/RestaurantHome.css` — Main styles (including sidebar, modals, responsive UI)

---

## Customization
- **Menu**: The initial menu is hardcoded, but can be edited via the Admin Dashboard. All changes are saved to localStorage.
- **Admin Password**: Default is `admin123`. Change in `AdminDashboard.jsx` for production use.
- **Branding**: Update the logo, colors, and images in `RestaurantHome.css` and the `public/` folder.

---

## Notes
- If you want to enable backend/database support, see the `backend/` folder for a Node.js/Express/MongoDB implementation (currently disabled by default).
- For any issues with localStorage, clear your browser storage to reset the app.

---

## License
MIT
