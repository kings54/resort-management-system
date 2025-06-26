import express from 'express';
import Menu from '../models/Menu.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  const menu = await Menu.find();
  res.json(menu);
});

// Add a new menu item
router.post('/', async (req, res) => {
  const item = new Menu(req.body);
  await item.save();
  res.status(201).json(item);
});

// Update a menu item
router.put('/:id', async (req, res) => {
  const item = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router; 