import mongoose, { Document, Schema } from 'mongoose';
import { IOrderItem, OrderItemSchema } from './OrderItem';

export interface IOrder extends Document {
  items: IOrderItem[];
  totalCost: number;
}

const OrderSchema: Schema = new Schema({
  items: [OrderItemSchema],
  totalCost: { type: Number, required: true }
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
