import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Menu
export const getMenu = async () => (await axios.get(`${API_URL}/menu`)).data;
export const addMenuItem = async (item) => (await axios.post(`${API_URL}/menu`, item)).data;
export const updateMenuItem = async (id, item) => (await axios.put(`${API_URL}/menu/${id}`, item)).data;
export const deleteMenuItem = async (id) => (await axios.delete(`${API_URL}/menu/${id}`)).data;

// Orders
export const getOrders = async () => (await axios.get(`${API_URL}/orders`)).data;
export const placeOrder = async (order) => (await axios.post(`${API_URL}/orders`, order)).data;
export const updateOrder = async (id, order) => (await axios.put(`${API_URL}/orders/${id}`, order)).data; 