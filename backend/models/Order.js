import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      qty: Number,
      price: Number,
      type: String
    }
  ],
  delivery: {
    name: String,
    address: String,
    phone: String
  },
  total: Number,
  paymentMethod: String,
  status: { type: String, default: 'Placed' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema); 