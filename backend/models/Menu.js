import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['Main', 'Dessert', 'Drinks'], required: true },
  description: { type: String, default: 'Delicious and freshly prepared.' }
});

export default mongoose.model('Menu', MenuSchema); 