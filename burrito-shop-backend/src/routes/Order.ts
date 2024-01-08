// src/routes/order.routes.ts
import { Router } from 'express';
import {
  getAllOrders,
  getOrderById,
  createOrder,
} from '../controllers/OrdersController';

const router = Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);

export default router;
