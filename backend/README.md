# Restaurant Backend

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Configure MongoDB:
   - By default, connects to `mongodb://localhost:27017/restaurant`.
   - To use MongoDB Atlas, set the `MONGO_URI` environment variable.

3. Start the server:
   ```sh
   npm run dev
   ```
   or
   ```sh
   npm start
   ```

## API Endpoints

### Menu
- `GET    /api/menu`         — List all menu items
- `POST   /api/menu`         — Add a new menu item
- `PUT    /api/menu/:id`     — Update a menu item
- `DELETE /api/menu/:id`     — Delete a menu item

### Orders
- `GET    /api/orders`       — List all orders
- `POST   /api/orders`       — Place a new order
- `PUT    /api/orders/:id`   — Update order status

---

You can now connect your React frontend to these endpoints! 