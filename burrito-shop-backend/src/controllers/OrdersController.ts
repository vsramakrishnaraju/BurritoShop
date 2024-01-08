// src/controllers/order.controller.ts
import { Request, Response } from 'express';
import Order from '../models/Order';

// GET all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error getting orders', error });
  }
};

// GET a single order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error finding order', error });
  }
};

// POST a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error });
  }
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  // ... any other functions ...
};

